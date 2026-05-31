from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class AnalyzeRequest(BaseModel):
    resume_id: str
    job_description: str

class UploadResponse(BaseModel):
    resume_id: str
    filename: str
    message: str

class ReportResponse(BaseModel):
    id: str
    resume_id: str
    job_description: str
    ats_score: int
    matched_skills: List[str]
    missing_skills: List[str]
    created_at: datetime
