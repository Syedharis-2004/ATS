from app.models.database import get_database
from datetime import datetime
from bson import ObjectId

async def save_resume(filename: str, raw_text: str, extracted_skills: list[str]) -> str:
    db = get_database()
    resume_doc = {
        "filename": filename,
        "upload_date": datetime.utcnow(),
        "raw_text": raw_text,
        "extracted_skills": extracted_skills
    }
    result = await db.resumes.insert_one(resume_doc)
    return str(result.inserted_id)

async def get_resume(resume_id: str) -> dict:
    db = get_database()
    resume = await db.resumes.find_one({"_id": ObjectId(resume_id)})
    if resume:
        resume["_id"] = str(resume["_id"])
    return resume

async def save_report(resume_id: str, job_description: str, report_data: dict) -> str:
    db = get_database()
    report_doc = {
        "resume_id": str(resume_id),
        "job_description": job_description,
        "ats_score": report_data["ats_score"],
        "matched_skills": report_data["matched_skills"],
        "missing_skills": report_data["missing_skills"],
        "created_at": datetime.utcnow()
    }
    result = await db.reports.insert_one(report_doc)
    return str(result.inserted_id)

async def get_report(report_id: str) -> dict:
    db = get_database()
    report = await db.reports.find_one({"_id": ObjectId(report_id)})
    if report:
        report["_id"] = str(report["_id"])
    return report
