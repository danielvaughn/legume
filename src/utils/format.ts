
export function formatDateRange(
  start_month: number,
  start_year: number,
  end_month: number | null,
  end_year: number | null,
) {
  let start = new Date(start_year, start_month - 1);
  let end = null;

  if (end_year !== null && end_month !== null) {
    end = new Date(end_year, end_month - 1);
  }

  const f = new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  });

  const formattedStart = f.format(start);
  const formattedEnd = end ? f.format(end) : "present";

  return `${formattedStart} - ${formattedEnd}`;
}
