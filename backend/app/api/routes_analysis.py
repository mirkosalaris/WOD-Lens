from fastapi import APIRouter
from app.api.routes_upload import get_workouts
from app.services.capacity_analyzer import CapacityAnalyzer
from app.models.capacity_profile import CapacityProfile

router = APIRouter()

@router.get("/analysis", response_model=CapacityProfile)
async def get_analysis():
    workouts = get_workouts()
    return CapacityAnalyzer.analyze(workouts)
