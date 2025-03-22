import json

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict, NoDecode
from typing import List
from typing_extensions import Annotated
import logging

logger = logging.getLogger(__name__)


class Settings(BaseSettings):
    GOOGLE_SCOPES: Annotated[List[str], NoDecode]
    REDIRECT_URI: str
    GOOGLE_CLIENT_ID: str
    GOOGLE_API_KEY: str
    COOKIE_SECRET: str
    CLIENT_SECRETS_FILE: str = "credentials.json"
    ENV: str = "dev"
    APP_URL: str
    DATABASE_URL_LOCAL_VIRTUAL_ENV: str = (
        "postgresql://postgres:postgres@localhost:5433/jobseeker_analytics"
    )
    DATABASE_URL_DOCKER: str = (
        "postgresql://postgres:postgres@db:5432/jobseeker_analytics"
    )

    @field_validator("GOOGLE_SCOPES", mode="before")
    @classmethod
    def decode_scopes(cls, v: str) -> List[str]:
        logger.info("Decoding scopes from string: %s", v)
        return json.loads(v.strip("'\""))

    @property
    def is_publicly_deployed(self) -> bool:
        return self.ENV in ["prod", "staging"]

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


settings = Settings(_env_file=".env", _env_file_encoding="utf-8")
