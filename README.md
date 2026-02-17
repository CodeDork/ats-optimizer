# ATS Resume Optimizer (Local Backend Engine)

An intelligent resume-to-job matching engine designed to simulate core behaviors of Applicant Tracking Systems (ATS).

## Overview

This project analyzes a resume against a job description and returns:

- Match Score (0–100)
- Missing Keywords (stem-aware)
- Extracted Technical Signals

The engine is built to avoid naive keyword counting and instead focuses on technical signal detection and consistent scoring logic.

---

## How It Works

### 1. Resume Parsing
- PDF parsing via `pdf-parse`
- DOCX parsing via `mammoth`

### 2. Keyword Extraction
- Tokenization using `natural`
- Stopword removal
- Bigram phrase detection
- TF-IDF weighting
- Technical pattern filtering
- Corporate/HR noise suppression

### 3. Scoring Engine
- Porter stemming for word normalization
- Phrase-aware matching
- Unified logic for scoring and missing detection
- Safeguards against empty keyword sets

---

## Example Output

```json
{
  "score": 67,
  "missingKeywords": ["troubleshooting", "ticketing"]
}
