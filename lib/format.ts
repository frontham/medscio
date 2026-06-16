const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const timeFormatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "UTC",
});

const format = (formatter: Intl.DateTimeFormat, iso: string): string => {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? "" : formatter.format(date);
};

export const formatActiveDate = (iso: string): string =>
  format(dateFormatter, iso);

export const formatActiveTime = (iso: string): string =>
  format(timeFormatter, iso);
