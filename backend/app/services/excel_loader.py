import pandas as pd
from typing import List
import io
from app.models.workout import Workout
from app.services.base_loader import BaseLoader

class ExcelLoader(BaseLoader):
    @staticmethod
    def load_from_bytes(content: bytes, filename: str) -> List[Workout]:
        # Determine the file type and read accordingly
        if filename.endswith('.csv'):
            df = pd.read_csv(io.BytesIO(content))
        else:
            df = pd.read_excel(io.BytesIO(content))
        
        return BaseLoader.parse_dataframe(df)
