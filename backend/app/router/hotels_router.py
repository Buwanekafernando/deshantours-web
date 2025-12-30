from fastapi import APIRouter, HTTPException
from app.database import hotel_collection
from app.models.hotels import Hotel
from bson import ObjectId

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

@router.get("/{id}")
async def get_hotel(id: str):
    hotel = await hotel_collection.find_one({"_id": ObjectId(id)})
    if hotel:
        hotel["_id"] = str(hotel["_id"])
        return hotel
    raise HTTPException(status_code=404, detail="Hotel not found")

@router.put("/{id}")
async def update_hotel(id: str, hotel: Hotel):
    updated_hotel = await hotel_collection.find_one_and_update(
        {"_id": ObjectId(id)},
        {"$set": hotel.dict()},
        return_document=True
    )
    if updated_hotel:
        updated_hotel["_id"] = str(updated_hotel["_id"])
        return updated_hotel
    raise HTTPException(status_code=404, detail="Hotel not found")

@router.delete("/{id}")
async def delete_hotel(id: str):
    result = await hotel_collection.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 1:
        return {"message": "Hotel deleted successfully"}
    raise HTTPException(status_code=404, detail="Hotel not found")