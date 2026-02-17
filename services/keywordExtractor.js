export function extractKeywords(text) {
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/);

  const filtered = words.filter(word => word.length > 4);

  const frequency = {};
  filtered.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });

  return Object.keys(frequency)
    .sort((a,b) => frequency[b] - frequency[a])
    .slice(0, 40);
}
