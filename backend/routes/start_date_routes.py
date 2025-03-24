import logging
from fastapi import APIRouter, Request, FastAPI, BackgroundTasks, Form
from fastapi.responses import JSONResponse, HTMLResponse
from contextlib import asynccontextmanager
from db.utils.user_utils import add_user
import json
from utils.auth_utils import AuthenticatedUser
from google.oauth2.credentials import Credentials

# Logger setup
logger = logging.getLogger(__name__)

api_call_finished = False

# FastAPI router for email routes
router = APIRouter()

@router.post("/set-start-date")
async def set_start_date(request: Request, start_date: str = Form(...)):
    """Updates the user's job search start date in the database."""
    print(request.session)
    user_id = request.session.get("user_id")

    if not user_id:
        return HTMLResponse(content="Invalid request. Please log in again.", status_code=400)

    # Retrieve stored credentials
    creds_json = request.session.get("creds")
    if not creds_json:
        logger.error(f"Missing credentials for user_id: {user_id}")
        return HTMLResponse(content="User not authenticated. Please log in again.", status_code=401)

    try:
        # Convert JSON string back to Credentials object
        creds_dict = json.loads(creds_json)
        creds = Credentials.from_authorized_user_info(creds_dict)  # Convert dict to Credentials
        user = AuthenticatedUser(creds)  # Corrected: Now passing Credentials object

        # Save start date in DB
        add_user(user, request, start_date)

        # Update session to remove "new user" status
        request.session["is_new_user"] = False

        return JSONResponse(content={"message": "Start date updated successfully"}, status_code=200)
    except Exception as e:
        logger.error(f"Error reconstructing credentials: {e}")
        return HTMLResponse(content="Failed to save start date. Try again.", status_code=500)


@router.get("/api/session-data")
async def get_session_data(request: Request):
    """Fetches session data for the user."""
    
    user_id = request.session.get("user_id")
    token_expiry = request.session.get("token_expiry")
    session_id = request.session.get("session_id")
    is_new_user = request.session.get("is_new_user", False)

    logger.info(f"Fetching session data: user_id={user_id}, session_id={session_id}")

    if not user_id:
        logger.warning("Session data missing user_id. Possible expired or invalid session.")
        return JSONResponse(content={"error": "Session expired or invalid"}, status_code=401)

    session_data = {
        "user_id": user_id,
        "token_expiry": token_expiry,
        "session_id": session_id,
        "is_new_user": is_new_user,
    }

    logger.info(f"Session data being returned: {session_data}")

    return JSONResponse(content=session_data)