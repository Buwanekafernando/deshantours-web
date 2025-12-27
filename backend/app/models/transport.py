from pydantic import BaseModel
from typing import List

class Transport(BaseModel):
    mode_type: str
    image_url: str
    number_of_seats: int
    guide_name: str


