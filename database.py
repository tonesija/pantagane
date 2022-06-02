from contextlib import contextmanager
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from settings import Settings

SQLALCHEMY_DATABASE_URL = Settings().database_url

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    """FastAPI db session dependency."""

    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@contextmanager
def get_session():
    return get_db()