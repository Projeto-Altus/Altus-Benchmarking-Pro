from pydantic import BaseModel, HttpUrl
from typing import List

class ScrapeRequest(BaseModel):
    urls: List[HttpUrl]
    attributes: List[str]