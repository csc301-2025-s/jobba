import sys
import os

# Add the backend directory to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from sqlmodel import SQLModel, create_engine, Session
from db.job_titles import JobTitles
from db.companies import Companies  
from db.company_jobs import CompanyJobs
from db.job_status import JobStatus
from db.user_jobs import UserJobs
from backend.db.user_job_status import UserJobStatuses
from db.user import Users
from utils.initializer_utils import export_to_db
from sqlalchemy import text
import pandas as pd


# Create an in-memory SQLite database 
DATABASE_URL = "sqlite:///:memory:"
engine = create_engine(DATABASE_URL, echo=True)  

# Create tables in memory
SQLModel.metadata.create_all(engine)

# Create a test user
test_user = Users(user_id=1, user_email="test@example.com", google_openid="test-google-id")

# Sample email data
test_message_data = {
    "company_name": ["Test Company"],
    "application_status": ["Under Review"],
    "received_at": ["2024-03-02 12:30:00"],
    "subject": ["Your Job Application"],
    "from": ["hr@testcompany.com"]
}

def display_table(session, table_name):
    result = session.exec(text(f"SELECT * FROM {table_name}")).all()
    df = pd.DataFrame(result, columns=[col["name"] for col in session.execute(text(f"PRAGMA table_info({table_name})")).mappings()])
    print(f"\n🔹 Table: {table_name}")
    print(df.to_string(index=False))  # Pretty prints without row indices
    
# Open a database session and run export_to_db
with Session(engine) as session:
    export_to_db(test_user, test_message_data, session)

    # Display the tables in a clean format
    for table in ["users", "companies", "job_titles", "company_jobs", "user_jobs", "job_statuses", "user_job_status"]:
        display_table(session, table)

    # # Verify database contents
    # jobs = session.exec(text("SELECT * FROM company_jobs")).all()
    # print("Company Jobs:", jobs)

    # user_jobs = session.exec(text("SELECT * FROM user_jobs")).all()
    # print("User Jobs:", user_jobs)

    # job_statuses = session.exec(text("SELECT * FROM job_statuses")).all()
    # print("Job Statuses:", job_statuses)

    # user_job_statuses = session.exec(text("SELECT * FROM user_job_status")).all()
    # print("User Job Statuses:", user_job_statuses)