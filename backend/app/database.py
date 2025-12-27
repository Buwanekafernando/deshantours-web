from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
load_dotenv()

MONGODB_URI = " mongodb://127.0.0.1:27017"

client = AsyncIOMotorClient(os.getenv(MONGODB_URI))
db = client["deshantours_db"]

package_collection = db["packages"]
transport_collection = db["transport"]
places_collection = db["places"]
hotel_collection = db["hotel"]






