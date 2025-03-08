# app/session/session_layer.py
import logging
import secrets
from datetime import datetime
from fastapi import Request


def create_random_session_string() -> str:
    return secrets.token_urlsafe(32)  # Generates a random URL-safe string


def validate_session(request: Request) -> str:
    """Retrieves Authorization, session_id, access_token and token_expiry
    from request cookies and validates them.
    Session ID should match the stored session.
    Access token should not be expired.
    """
    session_authorization = request.cookies.get("__Secure-Authorization")
    session_id = request.session.get("session_id")
    session_access_token = request.session.get("access_token")
    token_exp = request.session.get("token_expiry")
    user_id = request.session.get("user_id")

    if not session_authorization and not session_access_token:
        logging.info(
            "No Authorization and access_token in session, redirecting to login"
        )
        return ""

    if session_authorization != session_id:
        logging.info("Authorization does not match Session Id, redirecting to login")
        return ""

    if is_token_expired(token_exp):
        logging.info("Access_token is expired, redirecting to login")
        return ""

    logging.info("Valid Session, Access granted.")
    return user_id


def is_token_expired(iso_expiry: str) -> bool:
    """
    Converts ISO format timestamp (which serves as the expiry time of the token) to datetime.
    If the current time is greater than the expiry time,
    the token is expired.
    """
    if iso_expiry:
        datetime_expiry = datetime.fromisoformat(iso_expiry)  # UTC time
        difference_in_minutes = (
            datetime_expiry - datetime.utcnow()
        ).total_seconds() / 60
        return difference_in_minutes <= 0

    return True
