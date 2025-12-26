from fastapi import APIRouter
from app.database import package_collection
from app.models.packages import Package

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


