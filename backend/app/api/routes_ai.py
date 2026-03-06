from fastapi import APIRouter
from app.api.routes_upload import get_workouts
from app.services.capacity_analyzer import CapacityAnalyzer
from app.services.ai_insights import AIInsightsService
from pydantic import BaseModel

router = APIRouter()
ai_service = AIInsightsService()

class InsightResponse(BaseModel):
    insight: str

@router.post("/ai-insight", response_model=InsightResponse)
async def generate_insight():
    workouts = get_workouts()
    profile = CapacityAnalyzer.analyze(workouts)
    insight = await ai_service.generate_insight(profile)
    return {"insight": insight}
