from sqlmodel import SQLModel, create_engine, Session

# Create a local SQLite database file
DATABASE_URL = "sqlite:///local_database.db"  # This creates a file-based database

engine = create_engine(DATABASE_URL, echo=True)  # echo=True prints SQL queries

# Function to create tables
def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

# Function to get a session
def get_session():
    with Session(engine) as session:
        yield session
