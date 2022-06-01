from pydantic import BaseSettings


class Settings(BaseSettings):
    """Contains env variables."""

    database_url: str
    http_url: str

    # IOT CORE CONFIG
    root_ca_path: str
    certificate_path: str
    private_key_path: str

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
