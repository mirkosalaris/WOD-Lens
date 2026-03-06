# WOD Lens

Mobile-first web application for CrossFit performance analysis using the 10 General Physical Skills.

## Features

- **Excel Ingestion**: Upload your workout history from Excel or Google Sheets.
- **Physical Skills Analysis**: Aggregates capacity scores weighted by recency.
- **Radar Visualization**: Beautiful spider charts showing your athlete profile.
- **AI Coach Insights**: Get personalized training advice powered by OpenAI.

## Tech Stack

- **Frontend**: React, TypeScript, Vite, TailwindCSS, Recharts.
- **Backend**: Python, FastAPI, Pandas.
- **AI**: OpenAI API.

## Setup Instructions

### Prerequisites
- Python 3.9+
- Node.js 18+

### Backend Setup
1. Navigate to `backend/`
2. Install dependencies: `pip install -r requirements.txt`
3. Create `.env` from `.env.example` and add your `OPENAI_API_KEY`.
4. Run server: `uvicorn app.main:app --reload`

### Frontend Setup
1. Navigate to `frontend/`
2. Install dependencies: `npm install`
3. Run dev server: `npm run dev`

## Dataset Format
The application expects an Excel file with the following columns:
- `date` (YYYY-MM-DD)
- `wod` (String)
- `score` (String)
- 10 Skill Columns (`CaReEndurance`, `Stamina`, `Strength`, `Flexibility`, `Power`, `Speed`, `Coordination`, `Agility`, `Balance`, `Accuracy`)

Values for skills:
- `0`: Not involved
- `0.5`: Involved but not bottleneck
- `1.0`: Bottleneck skill
