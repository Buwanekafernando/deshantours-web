from fastapi import APIRouter
from app.database import hotel_collection
from app.models.hotels import Hotel

router = APIRouter(prefix="/hotels", tags=["hotels"])

@router.post("/")
async def add_hotel(hotel: Hotel):
    result = await hotel_collection.insert_one(hotel.dict())
    return {"message": "Hotel added successfully", "id": str(result.inserted_id)}

@router.get("/")
async def get_hotels():
    hotels = []
    async for hotel in hotel_collection.find():
        hotel["_id"] = str(hotel["_id"])
        hotels.append(hotel)
    return hotels