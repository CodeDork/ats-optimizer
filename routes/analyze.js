import express from "express";
import multer from "multer";
import { extractText } from "../services/extractText.js";
import { extractKeywords } from "../services/keywordExtractor.js";
import { calculateMatch } from "../services/scorer.js";

const router = express.Router();
const upload = multer();

router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const resumeText = await extractText(req.file);
    const jobDescription = req.body.jobDescription;

    const keywords = extractKeywords(jobDescription);
    const score = calculateMatch(resumeText, keywords);

    const missing = keywords.filter(
      word => !resumeText.toLowerCase().includes(word)
    );

    res.json({
      score,
      missingKeywords: missing.slice(0, 15)
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
