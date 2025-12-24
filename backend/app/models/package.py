from pydantic import BaseModel
from typing import List

class DayPlan(BaseModel):
    day:int
    location:List[str]
    image_url:str

class Package(BaseModel):
    name: str
    total_price: float
    total_days: int
    tripplan: List[DayPlan]

    