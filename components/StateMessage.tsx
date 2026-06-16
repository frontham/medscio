import type { ReactNode } from "react";

interface StateMessageProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  testId?: string;
}

export const StateMessage = ({
  icon,
  title,
  children,
  testId,
}: StateMessageProps) => (
  <div
    data-testid={testId}
    className="flex flex-col items-center gap-3 px-6 py-14 text-center"
  >
    <span className="flex size-11 items-center justify-center rounded-full bg-muted text-faint">
      {icon}
    </span>
    <p className="font-semibold text-ink">{title}</p>
    <p className="max-w-xs text-sm text-body">{children}</p>
  </div>
);
