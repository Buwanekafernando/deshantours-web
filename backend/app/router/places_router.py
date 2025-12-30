from fastapi import APIRouter
from app.database import places_collection
from app.models.places import Place

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