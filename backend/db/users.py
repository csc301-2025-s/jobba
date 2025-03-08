from sqlmodel import SQLModel, Field
from pydantic import BaseModel
from datetime import datetime

class UserData(BaseModel):
    user_id: str
    user_email: str
    start_date: datetime

class Users(SQLModel, table=True):
    __tablename__ = "users"
    user_id: str = Field(default = None, primary_key = True)
    user_email: str = Field(nullable=False)                      
    start_date: datetime = Field(nullable=False) # Start date for job applications
