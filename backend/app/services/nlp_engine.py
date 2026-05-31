import spacy

# Load the spaCy model
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    print("Downloading en_core_web_sm model...")
    from spacy.cli import download
    download("en_core_web_sm")
    nlp = spacy.load("en_core_web_sm")

# A basic predefined list of skills (in a real system this could be an ontology or learned model)
COMMON_SKILLS = {
    "python", "java", "c++", "javascript", "react", "node.js", "sql", 
    "mongodb", "postgresql", "docker", "kubernetes", "aws", "gcp", "azure",
    "machine learning", "nlp", "data analysis", "fastapi", "django", "flask",
    "agile", "scrum", "git", "ci/cd", "html", "css", "vue", "angular", "spacy", "pandas"
}

def extract_skills(text: str) -> list[str]:
    """
    Extracts skills from text using a simple keyword matching and NER fallback.
    """
    doc = nlp(text.lower())
    extracted_skills = set()
    
    # Simple token matching
    for token in doc:
        if token.text in COMMON_SKILLS:
            extracted_skills.add(token.text)
            
    # Also check noun chunks for multi-word skills
    for chunk in doc.noun_chunks:
        chunk_text = chunk.text.strip()
        if chunk_text in COMMON_SKILLS:
            extracted_skills.add(chunk_text)
            
    return list(extracted_skills)

def calculate_ats_score(resume_skills: list[str], job_description: str) -> dict:
    """
    Calculates an ATS score based on matched skills with the job description.
    """
    jd_skills = extract_skills(job_description)
    
    if not jd_skills:
        # If no skills found in JD, we can't properly score based on skills alone.
        return {
            "ats_score": 0,
            "matched_skills": [],
            "missing_skills": []
        }
    
    resume_skills_set = set(resume_skills)
    jd_skills_set = set(jd_skills)
    
    matched = list(resume_skills_set.intersection(jd_skills_set))
    missing = list(jd_skills_set.difference(resume_skills_set))
    
    score = int((len(matched) / len(jd_skills_set)) * 100)
    
    return {
        "ats_score": score,
        "matched_skills": matched,
        "missing_skills": missing
    }
