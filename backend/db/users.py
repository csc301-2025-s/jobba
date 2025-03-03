from sqlmodel import SQLModel, Field

class Users(SQLModel, table=True):
    __tablename__ = "users"
    user_id: int = Field(default = None, primary_key = True)
    user_email: str = Field(nullable=False)                      
    google_openid: str = Field(nullable=False, unique=True) # OpenID identifier
