

from pydantic import BaseSettings


class Settings(BaseSettings):
    """Contains env variables."""
    
    database_url: str
    http_url: str

    class Config:
        env_file = '.env'
        env_file_encoding = 'utf-8'