import { ClearIcon, SearchIcon, SpinnerIcon } from "./icons";

interface SearchFieldProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  isLoading?: boolean;
}

export const SearchField = ({
  id,
  value,
  onChange,
  isLoading = false,
}: SearchFieldProps) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-semibold tracking-tight text-ink"
    >
      Search
    </label>

    <div className="group relative mt-2">
      <SearchIcon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-faint transition-colors group-focus-within:text-accent" />

      <input
        id={id}
        type="search"
        data-testid="search-input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete="off"
        spellCheck={false}
        placeholder="Search by test name"
        className="h-13 w-full rounded-xl border border-line-strong bg-canvas py-3 pl-12 pr-12 text-base text-ink shadow-sm outline-none transition placeholder:text-faint focus:border-accent focus:ring-4 focus:ring-accent/15 [&::-webkit-search-cancel-button]:hidden"
      />

      <span className="absolute right-3 top-1/2 -translate-y-1/2">
        {isLoading ? (
          <SpinnerIcon className="text-accent" aria-hidden />
        ) : value ? (
          <button
            type="button"
            data-testid="search-clear"
            onClick={() => onChange("")}
            aria-label="Clear search"
            className="flex size-8 items-center justify-center rounded-lg text-faint transition-colors hover:bg-muted hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <ClearIcon width={18} height={18} />
          </button>
        ) : null}
      </span>
    </div>
  </div>
);
