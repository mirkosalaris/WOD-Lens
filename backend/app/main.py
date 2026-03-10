from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import routes_upload, routes_analysis, routes_ai
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)

app = FastAPI(title="WOD Lens API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify actual origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(routes_upload.router, prefix="/api", tags=["Upload"])
app.include_router(routes_analysis.router, prefix="/api", tags=["Analysis"])
app.include_router(routes_ai.router, prefix="/api", tags=["AI"])

@app.get("/")
async def root():
    return {"message": "Welcome to WOD Lens API"}
