# ATS Resume Optimizer (MVP)

A backend API that:

- Accepts resume PDF/DOCX
- Parses resume text
- Extracts job description keywords
- Calculates match score
- Returns missing skills

## Tech Stack
- Node.js
- Express
- Multer
- pdf-parse
- Mammoth

## Endpoint

POST /analyze

Form Data:
- resume (file)
- jobDescription (text)
