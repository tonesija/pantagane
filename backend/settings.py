from pydantic import BaseSettings


class Settings(BaseSettings):
    """Contains env variables."""

    database_url: str = "sqlite:///./sql_app.db"
    http_url: str = "http://127.0.0.1:8000"
    port: int = 8000
    debug_mode: bool = True

    # IOT CORE CONFIG
    root_ca_path: str = "root-CA.crt"
    certificate_path: str = "web_server.cert.pem"
    private_key_path: str = "web_server.private.key"

    # JWT CONFIG
    secret_key: str

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

    def get_database_url(self):
        return self.database_url.replace("postgres://", "postgresql://")
