from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.router import package_router, places_router, transport_router, hotels_router

app = FastAPI(title="Deshantours API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(package_router.router)
app.include_router(places_router.router)
app.include_router(transport_router.router)
app.include_router(hotels_router.router)



