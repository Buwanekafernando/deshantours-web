from fastapi import APIRouter
from app.database import transport_collection
from app.models.transport import Transport

router = APIRouter(prefix="/transport", tags=["transport"])

@router.post("/")
async def add_transport(transport: Transport):
    result = await transport_collection.insert_one(transport.dict())
    return {"message": "Transport added successfully", "id": str(result.inserted_id)}

@router.get("/")
async def get_transports():
    transports = []
    async for transport in transport_collection.find():
        transport["_id"] = str(transport["_id"])
        transports.append(transport)
    return transports