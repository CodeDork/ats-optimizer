export function calculateMatch(resumeText, jobKeywords) {
  const lowerResume = resumeText.toLowerCase();
  let matchCount = 0;

  jobKeywords.forEach(keyword => {
    if (lowerResume.includes(keyword)) {
      matchCount++;
    }
  });

  return Math.round((matchCount / jobKeywords.length) * 100);
}
