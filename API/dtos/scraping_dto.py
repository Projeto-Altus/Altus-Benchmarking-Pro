from typing import List, Optional
from pydantic import BaseModel

class AttributeItem(BaseModel):
    name: str
    importance: int

class ScrapeRequest(BaseModel):
    urls: List[str]
    attributes: List[AttributeItem]
    api_key: Optional[str] = None
    provider: Optional[str] = "google"