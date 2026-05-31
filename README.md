# AI Resume Analyzer 🚀

A full-stack AI-powered Resume Analyzer built to help candidates optimize their resumes for Applicant Tracking Systems (ATS). This system parses uploaded resumes, extracts technical skills using Natural Language Processing (NLP), and compares them against a target job description to generate a comprehensive match score and feedback report.

## 🌟 Key Features

* **Smart Document Parsing**: Supports uploading resumes in `.pdf`, `.docx`, and `.txt` formats.
* **AI Skill Extraction**: Leverages `spaCy` (en_core_web_sm) to intelligently identify and extract technical skills and industry keywords from unstructured text.
* **ATS Match Scoring**: Calculates an ATS compatibility score (0-100%) by comparing the extracted resume skills with the requirements found in a job description.
* **Detailed Feedback Dashboard**: Clearly highlights "Matched Skills" and pinpoints "Missing Keywords" so candidates know exactly what to add to their resume.
* **Premium User Interface**: Features a responsive, glassmorphic React frontend with drag-and-drop file uploading and dynamic animations.
* **Data Persistence**: Stores parsed resumes and analysis reports securely in MongoDB for historical tracking.

## 🛠️ Tech Stack

### Frontend
* **React.js** (via Vite)
* **Vanilla CSS** (Custom Design System with CSS variables and Glassmorphism)
* **Lucide React** (Icons)

### Backend
* **Python 3.11**
* **FastAPI** (High-performance asynchronous API framework)
* **spaCy** (Industrial-strength NLP)
* **PyPDF2 & python-docx** (Document processing)
* **MongoDB & Motor** (NoSQL Database and async Python driver)

### DevOps
* **Docker & Docker Compose** (Containerization and orchestration)

## 🚀 Getting Started

### Prerequisites
* [Docker](https://www.docker.com/products/docker-desktop) & Docker Compose
* [Node.js](https://nodejs.org/en/) (for running the frontend locally)

### Running the System

**1. Start the Backend & Database (Docker)**
The backend and MongoDB are fully containerized. To spin them up, navigate to the root directory and run:
```bash
docker-compose up -d --build
```
> The FastAPI backend will be available at `http://localhost:8001`
> Swagger API Documentation will be available at `http://localhost:8001/docs`

**2. Start the Frontend (Local)**
Open a new terminal, navigate to the frontend directory, install dependencies, and start the development server:
```bash
cd frontend
npm install
npm run dev
```
> The React application will be available at `http://localhost:5173`

## 📁 Project Structure

```text
├── backend/
│   ├── app/
│   │   ├── api/            # API Controllers / Routes
│   │   ├── core/           # Configuration & Environment
│   │   ├── models/         # Pydantic Schemas & MongoDB Setup
│   │   └── services/       # Business Logic (NLP, Parsing, DB Operations)
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/     # React Components (Hero, Uploader, Analyzer, Results)
│   │   ├── App.jsx         # Main App Logic
│   │   └── index.css       # Global Styling System
│   └── package.json
└── docker-compose.yml      # Orchestrates FastAPI & MongoDB
```
