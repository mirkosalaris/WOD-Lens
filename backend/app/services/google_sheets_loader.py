import pandas as pd
from typing import List, Tuple
import re
from app.models.workout import Workout
from app.services.base_loader import BaseLoader

class GoogleSheetsLoader(BaseLoader):
    @staticmethod
    def load_from_url(url: str) -> Tuple[List[Workout], int]:
        # Convert a standard Google Sheets URL to an XLSX export URL
        spreadsheet_id_match = re.search(r"/d/([a-zA-Z0-9-_]+)", url)
        if not spreadsheet_id_match:
            raise ValueError("Invalid Google Sheets URL")
        
        spreadsheet_id = spreadsheet_id_match.group(1)
        xlsx_url = f"https://docs.google.com/spreadsheets/d/{spreadsheet_id}/export?format=xlsx"
        
        gid_match = re.search(r"gid=([0-9]+)", url)
        if gid_match:
            xlsx_url += f"&gid={gid_match.group(1)}"

        # Load data using pandas
        try:
            df = pd.read_excel(xlsx_url)
        except Exception as e:
             raise ValueError(f"Failed to load Google Sheet as Excel: {str(e)}")
        
        return BaseLoader.parse_dataframe(df)
