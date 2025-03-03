from sqlmodel import Session, select
from db.user import Users
from db.companies import Companies
from db.job_titles import JobTitles
from db.company_jobs import CompanyJobs
from db.job_status import JobStatus
from db.user_jobs import UserJobs
from db.user_job_status import UserJobStatuses
from datetime import datetime
from utils.email_utils import get_email_ids, get_email
from utils.llm_utils import process_email
from utils.auth_utils import AuthenticatedUser
from constants import QUERY_APPLIED_EMAIL_FILTER
from googleapiclient.discovery import build
from db.database import get_session
import logging

logger = logging.getLogger(__name__)

def user_exists(user: Users, session: Session) -> Users:
    """Check if user exists, create if not."""
    user_entry = session.exec(select(Users).where(Users.user_id == user.user_id)).first()

    if not user_entry:
        user_entry = Users(user_id=user.user_id, user_email=user.user_email, google_openid=user.google_openid)
        session.add(user_entry)
        session.commit()
        session.refresh(user_entry)
        logger.info(f"Created new user: {user.user_id}")

    return user_entry


def company_exists(company_name: str, email_sender: str, session: Session) -> Companies:
    """Check if company exists, create if not."""
    company_entry = session.exec(select(Companies).where(Companies.company_name == company_name)).first()

    if not company_entry:
        company_entry = Companies(company_name=company_name, company_email_domain=email_sender.split("@")[-1])
        session.add(company_entry)
        session.commit()
        session.refresh(company_entry)
        logger.info(f"Created new company: {company_name}")

    return company_entry


def job_title_exists(job_title: str, session: Session) -> JobTitles:
    """Check if job title exists, create if not."""
    job_title_entry = session.exec(select(JobTitles).where(JobTitles.job_title == job_title)).first()

    if not job_title_entry:
        job_title_entry = JobTitles(job_title=job_title)
        session.add(job_title_entry)
        session.commit()
        session.refresh(job_title_entry)
        logger.info(f"Created new job title: {job_title}")

    return job_title_entry


def job_exists(company: Companies, job_title: JobTitles, email_subject: str, received_at: datetime, session: Session) -> CompanyJobs:
    """Check if job exists, create if not."""
    job_query = select(CompanyJobs).where(
        (CompanyJobs.company_id == company.company_id) & 
        (CompanyJobs.job_title_id == job_title.job_title_id)
    )
    job_entry = session.exec(job_query).first()

    if not job_entry:
        job_entry = CompanyJobs(
            company_id=company.company_id,
            job_title_id=job_title.job_title_id,
            job_description=email_subject,
            job_posted_at=received_at,
            job_location="UNKNOWN"  # we currently are not extracting location information
        )
        session.add(job_entry)
        session.commit()
        session.refresh(job_entry)
        logger.info(f"Created new job entry for {company.company_name}")

    return job_entry


def status_exists(application_status: str, session: Session) -> JobStatus:
    """Check if job application status exists, create if not."""
    status_entry = session.exec(select(JobStatus).where(JobStatus.status_name == application_status)).first()

    if not status_entry:
        status_entry = JobStatus(status_name=application_status, status_description="Auto-extracted status")
        session.add(status_entry)
        session.commit()
        session.refresh(status_entry)
        logger.info(f"Created new job status: {application_status}")

    return status_entry


def link_user_job(user: Users, job: CompanyJobs, received_at: datetime, session: Session) -> UserJobs:
    """Link user to job if not already linked."""
    user_job_entry = session.exec(select(UserJobs).where(
        (UserJobs.user_id == user.user_id) & (UserJobs.job_id == job.job_id)
    )).first()

    if not user_job_entry:
        user_job_entry = UserJobs(user_id=user.user_id, job_id=job.job_id, applied_at=received_at)
        session.add(user_job_entry)
        session.commit()
        session.refresh(user_job_entry)
        logger.info(f"Linked user {user.user_id} to job {job.job_id}")

    return user_job_entry


def link_user_job_status(user: Users, job: CompanyJobs, status: JobStatus, session: Session) -> None:
    """Link user's job application to status if not already linked."""
    user_job_status_entry = session.exec(select(UserJobStatuses).where(
        (UserJobStatuses.user_id == user.user_id) &
        (UserJobStatuses.job_id == job.job_id) &
        (UserJobStatuses.status_id == status.status_id)
    )).first()

    if not user_job_status_entry:
        user_job_status_entry = UserJobStatuses(user_id=user.user_id, job_id=job.job_id, status_id=status.status_id)
        session.add(user_job_status_entry)
        session.commit()
        logger.info(f"Linked job {job.job_id} to status {status.status_id} for user {user.user_id}")


def export_to_db(user: Users, message_data: dict, session: Session) -> None:
    """Write extracted email job application data to the database."""

    # read job application data
    company_name = message_data["company_name"][0]
    application_status = message_data["application_status"][0]
    received_at_str = message_data["received_at"][0]
    received_at = datetime.strptime(received_at_str, "%Y-%m-%d %H:%M:%S") if received_at_str else datetime.utcnow()
    email_subject = message_data["subject"][0]
    email_sender = message_data["from"][0]
    job_title = "UNKNOWN"  # we currently aren't extracting job title information

    user_entry = user_exists(user, session)
    company_entry = company_exists(company_name, email_sender, session)
    job_title_entry = job_title_exists(job_title, session)
    job_entry = job_exists(company_entry, job_title_entry, email_subject, received_at, session)
    status_entry = status_exists(application_status, session)

    # link the user to job and status
    link_user_job(user_entry, job_entry, received_at, session)
    link_user_job_status(user_entry, job_entry, status_entry, session)

    logger.info(f"Successfully wrote job application data for user {user.user_id}")


def write_emails_to_db(user: AuthenticatedUser):
    """Fetch job application emails and write them directly to the database."""
    logger.info(f"user_id:{user.user_id} fetching emails and writing to database...")

    session = next(get_session())  # Get the session manually

    # check if user exists in the database
    user_entry = session.exec(select(Users).where(Users.user_id == user.user_id)).first()

    if not user_entry:
        logger.warning(f"user_id:{user.user_id} not found in database. Adding user and continuing fetch.")

        # add the user to the database
        user_entry = Users(user_id=user.user_id, user_email=user.user_email, google_openid=user.user_id)
        session.add(user_entry)
        session.commit()
        session.refresh(user_entry)

    # continue email fetching as normal
    service = build("gmail", "v1", credentials=user.creds)
    messages = get_email_ids(query=QUERY_APPLIED_EMAIL_FILTER, gmail_instance=service)

    if not messages:
        logger.info(f"user_id:{user.user_id} No job application emails found.")
        return

    logger.info(f"user_id:{user.user_id} Found {len(messages)} emails.")

    for idx, message in enumerate(messages):
        msg_id = message["id"]
        logger.info(f"user_id:{user.user_id} Processing email {idx+1} of {len(messages)} (ID: {msg_id})")

        msg = get_email(message_id=msg_id, gmail_instance=service)

        if msg:
            result = process_email(msg["text_content"])
            if not isinstance(result, str) and result:
                logger.info(f"user_id:{user.user_id} Successfully extracted email {idx+1}")
            else:
                logger.warning(f"user_id:{user.user_id} Failed to extract email {idx+1}")
                result = {}

            message_data = {
                "company_name": [result.get("company_name", "")],
                "application_status": [result.get("application_status", "")],
                "received_at": [msg.get("date", "")],
                "subject": [msg.get("subject", "")],
                "from": [msg.get("from", "")]
            }

            # write directly to the database
            export_to_db(user_entry, message_data, session)

    session.close()  # close the session to avoid connection leaks
    logger.info(f"user_id:{user.user_id} Email fetching and database writing complete.")
