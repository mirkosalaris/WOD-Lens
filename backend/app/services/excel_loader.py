import pandas as pd
from typing import List
import io
from app.models.workout import Workout

class ExcelLoader:
    @staticmethod
    def load_from_bytes(content: bytes) -> List[Workout]:
        # Read the Excel file using pandas
        df = pd.read_excel(io.BytesIO(content))
        
        # Mapping column names if necessary
        # Assuming the headers match the model names exactly (or we'll handle normalization)
        
        workouts = []
        for _, row in df.iterrows():
            workouts.append(Workout(
                date=pd.to_datetime(row['date']),
                wod=str(row['wod']),
                score=str(row['score']),
                CaReEndurance=float(row.get('CaReEndurance', 0)),
                Stamina=float(row.get('Stamina', 0)),
                Strength=float(row.get('Strength', 0)),
                Flexibility=float(row.get('Flexibility', 0)),
                Power=float(row.get('Power', 0)),
                Speed=float(row.get('Speed', 0)),
                Coordination=float(row.get('Coordination', 0)),
                Agility=float(row.get('Agility', 0)),
                Balance=float(row.get('Balance', 0)),
                Accuracy=float(row.get('Accuracy', 0))
            ))
        return workouts
