import styles from "./ResultsSkeleton.module.css";

export const ResultsSkeleton = () => (
  <ul aria-hidden data-testid="results-skeleton">
    {[0, 1, 2].map((row) => (
      <li
        key={row}
        className="flex items-center justify-between gap-4 px-5 py-4"
      >
        <div className="min-w-0 flex-1 space-y-2">
          <div className={`${styles.skeleton} h-4 w-2/5 rounded`} />
          <div className={`${styles.skeleton} h-3 w-4/5 rounded`} />
        </div>
        <div className={`${styles.skeleton} h-9 w-20 rounded`} />
      </li>
    ))}
  </ul>
);
