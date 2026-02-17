import natural from "natural";
import { removeStopwords } from "stopword";

const tokenizer = new natural.WordTokenizer();
const TfIdf = natural.TfIdf;

const genericWords = new Set([
  "required",
  "employees",
  "company",
  "benefits",
  "citizenship",
  "clearance",
  "innovation",
  "opportunities",
  "rewards",
  "environment",
  "together",
  "professional",
  "related"
]);


function looksTechnical(term) {
  const techPatterns = [
    /server/,
    /windows/,
    /linux/,
    /network/,
    /active directory/,
    /database/,
    /sql/,
    /aws/,
    /azure/,
    /cloud/,
    /security/,
    /support/,
    /troubleshoot/,
    /hardware/,
    /software/,
    /ticket/,
    /system/,
    /infrastructure/
  ];

  return techPatterns.some(pattern => pattern.test(term));
}


export function extractKeywords(text) {
  if (!text) return [];

  const cleaned = text
    .toLowerCase()
    .replace(/[^\w\s\-\/+.]/g, "");

  const tokens = tokenizer.tokenize(cleaned);

  const filtered = removeStopwords(tokens)
    .filter(word =>
      word.length > 3 &&
      !genericWords.has(word)
    );

  const bigrams = natural.NGrams.bigrams(filtered)
    .map(pair => pair.join(" "));

  const combined = [...filtered, ...bigrams];

  const tfidf = new TfIdf();
  tfidf.addDocument(combined.join(" "));

  const scored = tfidf.listTerms(0);

  const selected = scored
    .filter(item =>
      item.tfidf > 0.5 &&        // lower threshold
      looksTechnical(item.term)
    )
    .map(item => item.term);

  return selected.slice(0, 25);
}
