from fastapi import APIRouter, HTTPException
from app.database import transport_collection
from app.models.transport import Transport
from bson import ObjectId

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

@router.get("/{id}")
async def get_transport(id: str):
    transport = await transport_collection.find_one({"_id": ObjectId(id)})
    if transport:
        transport["_id"] = str(transport["_id"])
        return transport
    raise HTTPException(status_code=404, detail="Transport not found")

@router.put("/{id}")
async def update_transport(id: str, transport: Transport):
    updated_transport = await transport_collection.find_one_and_update(
        {"_id": ObjectId(id)},
        {"$set": transport.dict()},
        return_document=True
    )
    if updated_transport:
        updated_transport["_id"] = str(updated_transport["_id"])
        return updated_transport
    raise HTTPException(status_code=404, detail="Transport not found")

@router.delete("/{id}")
async def delete_transport(id: str):
    result = await transport_collection.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 1:
        return {"message": "Transport deleted successfully"}
    raise HTTPException(status_code=404, detail="Transport not found")