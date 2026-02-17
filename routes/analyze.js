import express from "express";
import multer from "multer";
import { extractText } from "../services/extractText.js";
import { extractKeywords } from "../services/keywordExtractor.js";
import { calculateMatch } from "../services/scorer.js";
import natural from "natural";

const router = express.Router();
const upload = multer();
const stemmer = natural.PorterStemmer;

router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const resumeText = await extractText(req.file);
    const jobDescription = req.body.jobDescription;

    const keywords = extractKeywords(jobDescription);

    console.log("Extracted Job Keywords:", keywords);

    const score = calculateMatch(resumeText, keywords);

const resumeWords = resumeText
  .toLowerCase()
  .split(/\W+/)
  .map(word => stemmer.stem(word));

const resumeSet = new Set(resumeWords);

const missing = keywords.filter(keyword => {
  const stemmed = stemmer.stem(keyword);
  return !resumeSet.has(stemmed);
});
    res.json({
      score,
      missingKeywords: missing.slice(0, 15)
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
