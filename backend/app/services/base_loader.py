import pandas as pd
from typing import List
from app.models.workout import Workout

class BaseLoader:
    @staticmethod
    def parse_dataframe(df: pd.DataFrame) -> List[Workout]:
        workouts = []
        
        # Normalize column names to lowercase for case-insensitive matching
        df.columns = [str(col).lower() for col in df.columns]
        
        for _, row in df.iterrows():
            try:
                date_val = row.get('date')
                if pd.isna(date_val):
                    continue
                
                workouts.append(Workout(
                    date=pd.to_datetime(date_val),
                    wod=str(row.get('wod', 'Unknown')),
                    score=str(row.get('score', 'N/A')),
                    CaReEndurance=float(row.get('careendurance', 0)),
                    Stamina=float(row.get('stamina', 0)),
                    Strength=float(row.get('strength', 0)),
                    Flexibility=float(row.get('flexibility', 0)),
                    Power=float(row.get('power', 0)),
                    Speed=float(row.get('speed', 0)),
                    Coordination=float(row.get('coordination', 0)),
                    Agility=float(row.get('agility', 0)),
                    Balance=float(row.get('balance', 0)),
                    Accuracy=float(row.get('accuracy', 0))
                ))
            except Exception:
                continue # Skip malformed rows
        return workouts
