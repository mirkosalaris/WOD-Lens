from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.excel_loader import ExcelLoader
from app.services.google_sheets_loader import GoogleSheetsLoader
from typing import List
from app.models.workout import Workout
from pydantic import BaseModel

router = APIRouter()

# Global state for prototype
uploaded_workouts: List[Workout] = []

class UrlUpload(BaseModel):
    url: str

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    if not file.filename.endswith(('.xlsx', '.xls', ".csv")):
        raise HTTPException(status_code=400, detail="Only Excel and csv files are allowed.")
    
    try:
        content = await file.read()
        global uploaded_workouts
        uploaded_workouts, failed_count = ExcelLoader.load_from_bytes(content, file.filename)
        return {
            "message": f"Parsed {len(uploaded_workouts)} workouts. {failed_count} rows skipped due to errors.",
            "count": len(uploaded_workouts),
            "failed_count": failed_count
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error parsing file: {str(e)}")

@router.post("/upload-url")
async def upload_url(data: UrlUpload):
    try:
        global uploaded_workouts
        uploaded_workouts, failed_count = GoogleSheetsLoader.load_from_url(data.url)
        return {
            "message": f"Parsed {len(uploaded_workouts)} workouts from URL. {failed_count} rows skipped due to errors.",
            "count": len(uploaded_workouts),
            "failed_count": failed_count
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error parsing Google Sheet: {str(e)}")

def get_workouts():
    return uploaded_workouts
