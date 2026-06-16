import { splitOnMatch } from "@/lib/highlight";

interface HighlightProps {
  text: string;
  query: string;
}

export const Highlight = ({ text, query }: HighlightProps) => (
  <>
    {splitOnMatch(text, query).map((segment, index) =>
      segment.match ? (
        <mark key={index} className="rounded-sm bg-accent/20 text-ink">
          {segment.value}
        </mark>
      ) : (
        segment.value
      ),
    )}
  </>
);
