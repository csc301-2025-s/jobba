import logging
from sqlmodel import Session, select
from db.users import Users 
from datetime import datetime, timedelta, timezone 

logger = logging.getLogger(__name__)

def user_exists(user) -> bool:
    from main import engine
    """
    Checks if user is already in the database

    """
    with Session(engine) as session:
        existing_user = session.exec(select(Users).where(Users.user_id == user.user_id)).first()
        if not existing_user:
            return False
        else:
            return True

def add_user(user) -> Users:
    """
    Writes user data to the users model

    """
    from main import engine
    with Session(engine) as session:
        # Check if the user already exists in the database
        existing_user = session.exec(select(Users).where(Users.user_id == user.user_id)).first()

        if not existing_user:

            start_date = getattr(user, "start_date", None) or (datetime.now(timezone.utc) - timedelta(days=90))

            # add a new user record
            new_user = Users(
                user_id=user.user_id,
                user_email=user.user_email,
                start_date=start_date
            )

            session.add(new_user)
            session.commit()
            session.refresh(new_user)
            logger.info(f"Created new user record for user_id: {user.user_id}")
            return new_user
        else:
            logger.info(f"User {user.user_id} already exists in the database.")
            return existing_user