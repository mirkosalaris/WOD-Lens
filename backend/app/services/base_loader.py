import pandas as pd
from typing import List, Tuple
from app.models.workout import Workout
import logging

logger = logging.getLogger(__name__)

class BaseLoader:
    @staticmethod
    def parse_dataframe(df: pd.DataFrame) -> Tuple[List[Workout], int]:
        """
        Parses the dataframe and returns a tuple of (parsed_workouts, failed_rows_count).
        """
        workouts = []
        failed_count = 0
        
        # Normalize column names to lowercase and strip whitespace for robust matching
        df.columns = [str(col).lower().strip() for col in df.columns]
        
        logger.info(f"Parsing dataframe with {len(df)} rows. Normalized columns: {df.columns.tolist()}")
        
        for index, row in df.iterrows():
            try:
                # Use lowercase keys for lookup
                date_val = row.get('date')
                wod_val = row.get('wod')
                
                # Skip rows with missing date OR missing wod (empty placeholder rows)
                if pd.isna(date_val) or pd.isna(wod_val) or str(wod_val).strip() == "":
                    # logger.debug(f"Row {index}: Skipping placeholder or incomplete row.")
                    continue
                
                workout = Workout(
                    date=pd.to_datetime(date_val),
                    wod=str(wod_val),
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
                )
                
                # Check if any skill has non-zero value
                skills = [
                    workout.CaReEndurance, workout.Stamina, workout.Strength, 
                    workout.Flexibility, workout.Power, workout.Speed, 
                    workout.Coordination, workout.Agility, workout.Balance, 
                    workout.Accuracy
                ]
                if all(s == 0 for s in skills):
                    logger.debug(f"Row {index} parsed, but all skill scores are 0. Verify dataset columns.")

                workouts.append(workout)

            except Exception as e:
                logger.error(f"Row {index}: Error parsing row: {str(e)}")
                failed_count += 1
                continue # Skip malformed rows
        
        logger.info(f"Successfully parsed {len(workouts)} workouts. {failed_count} rows failed.")
        return workouts, failed_count
