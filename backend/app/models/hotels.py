from pydantic import BaseModel
from typing import List

class Hotel(BaseModel):
    name: str
    description: str
    image_url: str
    location: str
    price: float
    category: str