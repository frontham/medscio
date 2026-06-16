import { useState } from "react";
import { formatActiveDate, formatActiveTime } from "@/lib/format";
import type { Terminology } from "@/lib/types";
import { Highlight } from "./Highlight";
import styles from "./TerminologyRow.module.css";

interface TerminologyRowProps {
  terminology: Terminology;
  index: number;
  query: string;
}

export const TerminologyRow = ({
  terminology,
  index,
  query,
}: TerminologyRowProps) => {
  const [expanded, setExpanded] = useState(false);
  const toggle = () => setExpanded((open) => !open);

  return (
    <li
      data-testid="result-row"
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      onClick={toggle}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggle();
        }
      }}
      className={`${styles.card} flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-line bg-canvas px-5 py-4 hover:border-line-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-accent`}
      style={{ animationDelay: `${index * 45}ms` }}
    >
      <div className="min-w-0 flex-1">
        <p className="font-semibold tracking-tight text-ink">
          <Highlight text={terminology.component} query={query} />
        </p>
        <p
          className={`mt-0.5 text-sm text-body ${expanded ? "break-words" : "line-clamp-1"}`}
          title={terminology.longCommonName}
        >
          <Highlight text={terminology.longCommonName} query={query} />
        </p>
        <p data-testid="result-id" className="mt-2 font-mono text-xs text-faint">
          {terminology.id} - {terminology.class}
        </p>
      </div>

      <div className="shrink-0 text-right">
        <p className="text-[0.7rem] font-medium uppercase tracking-wider text-faint">
          Active from
        </p>
        <time
          dateTime={terminology.activeSince}
          className="mt-0.5 block whitespace-nowrap font-mono text-sm font-medium text-ink"
        >
          {formatActiveDate(terminology.activeSince)}
          <span className="block text-xs font-normal text-faint">
            {formatActiveTime(terminology.activeSince)}
          </span>
        </time>
      </div>
    </li>
  );
};
