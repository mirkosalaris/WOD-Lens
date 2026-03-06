from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.excel_loader import ExcelLoader
from typing import List
from app.models.workout import Workout

router = APIRouter()

# Global state for prototype
uploaded_workouts: List[Workout] = []

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    if not file.filename.endswith(('.xlsx', '.xls', ".csv")):
        raise HTTPException(status_code=400, detail="Only Excel and csv files are allowed.")
    
    try:
        content = await file.read()
        global uploaded_workouts
        uploaded_workouts = ExcelLoader.load_from_bytes(content)
        return {"message": f"Successfully parsed {len(uploaded_workouts)} workouts.", "count": len(uploaded_workouts)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error parsing file: {str(e)}")

def get_workouts():
    return uploaded_workouts
