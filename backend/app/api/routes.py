from fastapi import APIRouter, UploadFile, File, HTTPException
from app.models.schemas import AnalyzeRequest, UploadResponse, ReportResponse
from app.services.resume_parser import extract_text
from app.services.nlp_engine import extract_skills, calculate_ats_score
from app.services.db_service import save_resume, get_resume, save_report, get_report

router = APIRouter()

@router.post("/upload_resume", response_model=UploadResponse)
async def upload_resume(file: UploadFile = File(...)):
    try:
        content = await file.read()
        raw_text = extract_text(content, file.filename)
        
        if not raw_text:
            raise HTTPException(status_code=400, detail="Could not extract text from the file.")
            
        skills = extract_skills(raw_text)
        
        resume_id = await save_resume(file.filename, raw_text, skills)
        
        return UploadResponse(
            resume_id=resume_id,
            filename=file.filename,
            message="Resume uploaded and parsed successfully."
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/analyze_resume")
async def analyze_resume(request: AnalyzeRequest):
    try:
        resume = await get_resume(request.resume_id)
        if not resume:
            raise HTTPException(status_code=404, detail="Resume not found.")
            
        resume_skills = resume.get("extracted_skills", [])
        
        report_data = calculate_ats_score(resume_skills, request.job_description)
        
        report_id = await save_report(request.resume_id, request.job_description, report_data)
        
        return {
            "report_id": report_id,
            "ats_score": report_data["ats_score"],
            "matched_skills": report_data["matched_skills"],
            "missing_skills": report_data["missing_skills"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/get_report/{report_id}", response_model=ReportResponse)
async def fetch_report(report_id: str):
    try:
        report = await get_report(report_id)
        if not report:
            raise HTTPException(status_code=404, detail="Report not found.")
            
        return ReportResponse(
            id=report["_id"],
            resume_id=report["resume_id"],
            job_description=report["job_description"],
            ats_score=report["ats_score"],
            matched_skills=report["matched_skills"],
            missing_skills=report["missing_skills"],
            created_at=report["created_at"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
