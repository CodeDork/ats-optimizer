import natural from "natural";

const stemmer = natural.PorterStemmer;

export function calculateMatch(resumeText, jobKeywords) {
  if (!jobKeywords || jobKeywords.length === 0) {
    return 0;
  }

  const resumeWords = resumeText
    .toLowerCase()
    .split(/\W+/)
    .map(word => stemmer.stem(word));

  const resumeSet = new Set(resumeWords);

  let matchCount = 0;

  jobKeywords.forEach(keyword => {
    const stemmedKeyword = stemmer.stem(keyword);
    if (resumeSet.has(stemmedKeyword)) {
      matchCount++;
    }
  });

  return Math.round((matchCount / jobKeywords.length) * 100);
}
