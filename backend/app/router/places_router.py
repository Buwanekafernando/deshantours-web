from fastapi import APIRouter, HTTPException
from app.database import places_collection
from app.models.places import Place
from bson import ObjectId

router = APIRouter(prefix="/places", tags=["places"])

@router.post("/")
async def add_place(place: Place):
    result = await places_collection.insert_one(place.dict())
    return {"message": "Place added successfully", "id": str(result.inserted_id)}

@router.get("/")
async def get_places():
    places = []
    async for place in places_collection.find():
        place["_id"] = str(place["_id"])
        places.append(place)
    return places

@router.get("/{id}")
async def get_place(id: str):
    place = await places_collection.find_one({"_id": ObjectId(id)})
    if place:
        place["_id"] = str(place["_id"])
        return place
    raise HTTPException(status_code=404, detail="Place not found")

@router.put("/{id}")
async def update_place(id: str, place: Place):
    updated_place = await places_collection.find_one_and_update(
        {"_id": ObjectId(id)},
        {"$set": place.dict()},
        return_document=True
    )
    if updated_place:
        updated_place["_id"] = str(updated_place["_id"])
        return updated_place
    raise HTTPException(status_code=404, detail="Place not found")

@router.delete("/{id}")
async def delete_place(id: str):
    result = await places_collection.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 1:
        return {"message": "Place deleted successfully"}
    raise HTTPException(status_code=404, detail="Place not found")