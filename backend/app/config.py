from pydantic_settings import BaseSettings
from functools import lru_cache
import os

class Settings(BaseSettings):
    openai_api_key: str = os.getenv("OPENAI_API_KEY", "")
    data_dir: str = "data"
    temp_dir: str = "temp"

    class Config:
        env_file = ".env"

@lru_cache()
def get_settings():
    return Settings()
