import { AlertIcon } from "./icons";

interface ResultsErrorProps {
  message: string;
  onRetry: () => void;
}

export const ResultsError = ({ message, onRetry }: ResultsErrorProps) => (
  <div
    data-testid="results-error"
    className="m-4 rounded-xl border border-danger/25 bg-danger-soft px-5 py-7 text-center"
  >
    <span className="mx-auto flex size-11 items-center justify-center rounded-full bg-canvas text-danger">
      <AlertIcon />
    </span>
    <p className="mt-3 font-semibold text-ink">Could not search tests</p>
    <p className="mt-1 text-sm text-body">{message}</p>
    <button
      type="button"
      data-testid="retry"
      onClick={onRetry}
      className="mt-4 inline-flex items-center rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-strong focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/25"
    >
      Try again
    </button>
  </div>
);
