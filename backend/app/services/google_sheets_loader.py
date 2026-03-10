import pandas as pd
from typing import List, Tuple
import re
from app.models.workout import Workout
from app.services.base_loader import BaseLoader

class GoogleSheetsLoader(BaseLoader):
    @staticmethod
    def load_from_url(url: str) -> Tuple[List[Workout], int]:
        # Convert a standard Google Sheets URL to a CSV export URL
        spreadsheet_id_match = re.search(r"/d/([a-zA-Z0-9-_]+)", url)
        if not spreadsheet_id_match:
            raise ValueError("Invalid Google Sheets URL")
        
        spreadsheet_id = spreadsheet_id_match.group(1)
        csv_url = f"https://docs.google.com/spreadsheets/d/{spreadsheet_id}/export?format=csv"
        
        gid_match = re.search(r"gid=([0-9]+)", url)
        if gid_match:
            csv_url += f"&gid={gid_match.group(1)}"

        # Load data using pandas
        df = pd.read_csv(csv_url)
        
        return BaseLoader.parse_dataframe(df)
