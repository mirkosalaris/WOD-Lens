import pandas as pd
from typing import List
from app.models.workout import Workout

class BaseLoader:
    @staticmethod
    def parse_dataframe(df: pd.DataFrame) -> List[Workout]:
        workouts = []
        for _, row in df.iterrows():
            try:
                date_val = row.get('date')
                if pd.isna(date_val):
                    continue
                
                workouts.append(Workout(
                    date=pd.to_datetime(date_val),
                    wod=str(row.get('wod', 'Unknown')),
                    score=str(row.get('score', 'N/A')),
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
            except Exception:
                continue # Skip malformed rows
        return workouts
