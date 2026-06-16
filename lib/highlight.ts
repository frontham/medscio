export interface TextSegment {
  value: string;
  match: boolean;
}

export const splitOnMatch = (text: string, query: string): TextSegment[] => {
  const lowerQuery = query.trim().toLowerCase();
  if (!lowerQuery) return [{ value: text, match: false }];

  const lowerText = text.toLowerCase();
  const segments: TextSegment[] = [];
  let start = 0;

  while (start < text.length) {
    const index = lowerText.indexOf(lowerQuery, start);

    if (index === -1) {
      segments.push({ value: text.slice(start), match: false });
      break;
    }

    if (index > start) {
      segments.push({ value: text.slice(start, index), match: false });
    }

    segments.push({
      value: text.slice(index, index + lowerQuery.length),
      match: true,
    });
    start = index + lowerQuery.length;
  }

  return segments;
};
