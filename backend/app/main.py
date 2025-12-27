from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.router import package_router

app = FastAPI(title="Deshantours API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(package_router.router)


