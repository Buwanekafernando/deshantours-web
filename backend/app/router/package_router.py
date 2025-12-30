from fastapi import APIRouter, HTTPException
from app.database import package_collection
from app.models.packages import Package
from bson import ObjectId

router = APIRouter(prefix="/packages", tags=["packages"])

@router.post("/")
async def add_package(package: Package):
    result = await package_collection.insert_one(package.dict())
    return {"message": "Package added successfully", "id": str(result.inserted_id)}

@router.get("/")
async def get_packages():
    packages = []
    async for pkg in package_collection.find():
        pkg["_id"] = str(pkg["_id"])
        packages.append(pkg)
    return packages

@router.get("/{id}")
async def get_package(id: str):
    package = await package_collection.find_one({"_id": ObjectId(id)})
    if package:
        package["_id"] = str(package["_id"])
        return package
    raise HTTPException(status_code=404, detail="Package not found")

@router.put("/{id}")
async def update_package(id: str, package: Package):
    updated_package = await package_collection.find_one_and_update(
        {"_id": ObjectId(id)},
        {"$set": package.dict()},
        return_document=True
    )
    if updated_package:
        updated_package["_id"] = str(updated_package["_id"])
        return updated_package
    raise HTTPException(status_code=404, detail="Package not found")

@router.delete("/{id}")
async def delete_package(id: str):
    result = await package_collection.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 1:
        return {"message": "Package deleted successfully"}
    raise HTTPException(status_code=404, detail="Package not found")


