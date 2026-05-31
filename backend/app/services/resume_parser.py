import io
from PyPDF2 import PdfReader
from docx import Document

def extract_text_from_pdf(file_content: bytes) -> str:
    try:
        reader = PdfReader(io.BytesIO(file_content))
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        return text
    except Exception as e:
        print(f"Error reading PDF: {e}")
        return ""

def extract_text_from_docx(file_content: bytes) -> str:
    try:
        doc = Document(io.BytesIO(file_content))
        text = ""
        for para in doc.paragraphs:
            text += para.text + "\n"
        return text
    except Exception as e:
        print(f"Error reading DOCX: {e}")
        return ""

def extract_text(file_content: bytes, filename: str) -> str:
    if filename.lower().endswith(".pdf"):
        return extract_text_from_pdf(file_content)
    elif filename.lower().endswith(".docx"):
        return extract_text_from_docx(file_content)
    elif filename.lower().endswith(".txt"):
        return file_content.decode("utf-8")
    else:
        raise ValueError("Unsupported file format. Please upload PDF, DOCX, or TXT.")
