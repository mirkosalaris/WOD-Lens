from openai import OpenAI
from app.models.capacity_profile import CapacityProfile
from app.config import get_settings

class AIInsightsService:
    def __init__(self):
        settings = get_settings()
        self.client = OpenAI(api_key=settings.openai_api_key)

    async def generate_insight(self, profile: CapacityProfile) -> str:
        if not get_settings().openai_api_key:
            return "AI Analysis: [OpenAI API Key not configured. Please add it to .env to see athlete insights.]"
        
        prompt = f"""
        You are a CrossFit coach analyzing an athlete profile.

        Given these capacity scores across the 10 General Physical Skills:
        {profile.model_dump_json()}

        Explain the athlete's strengths and weaknesses and suggest training improvements.

        Keep the response under 120 words.
        """

        try:
            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
                max_tokens=200
            )
            return response.choices[0].message.content
        except Exception as e:
            return f"Error generating insight: {str(e)}"
