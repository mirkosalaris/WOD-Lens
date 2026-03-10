import pandas as pd
from typing import List, Tuple
from app.models.workout import Workout

class BaseLoader:
    @staticmethod
    def parse_dataframe(df: pd.DataFrame) -> Tuple[List[Workout], int]:
        """
        Parses the dataframe and returns a tuple of (parsed_workouts, failed_rows_count).
        """
        workouts = []
        failed_count = 0
        
        # Normalize column names to lowercase and strip whitespace
        df.columns = [str(col).lower().strip() for col in df.columns]
        
        for _, row in df.iterrows():
            try:
                date_val = row.get('date')
                wod_val = row.get('wod')
                
                # Skip rows with missing date OR missing wod (empty placeholder rows)
                if pd.isna(date_val) or pd.isna(wod_val) or str(wod_val).strip() == "":
                    # If date exists but wod doesn't, we still count as "skipped/empty" but not "failed"
                    continue
                
                workouts.append(Workout(
                    date=pd.to_datetime(date_val),
                    wod=str(wod_val), # we already checked it has a value
                    score=str(row.get('score', 'N/A')),
                    CaReEndurance=float(row.get('ca. re. endurance', 0)),
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
                failed_count += 1
                continue # Skip malformed rows
                
        return workouts, failed_count
