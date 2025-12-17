import { env } from '@config/env';

interface DateParts {
  year: number;
  month: number;
  day: number;
}
const extractDateParts = (date: Date, timeZone: string): DateParts => {
  // Use numeric formatting (only need the date components)
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).formatToParts(date);

  // Safely extract values, casting to Number.
  const year = Number(parts.find((p) => p.type === 'year')?.value);
  const month = Number(parts.find((p) => p.type === 'month')?.value);
  const day = Number(parts.find((p) => p.type === 'day')?.value);

  return { year, month, day };
};

/**
 * Formats a `Date` into a date string.
 *
 * @param {Date} date - The date to format.
 * @param {'NORMAL' | 'REVERSED'} [mode='NORMAL'] - Output style:
 *   - 'NORMAL' → "YYYY-MM-DD"
 *   - 'REVERSED' → "DD-MM-YYYY"
 * @param {string} [timeZone=env.DATE_TIMEZONE] - The IANA timezone (e.g., "Asia/Jakarta").
 * @returns {string} The formatted date string.
 */
export const toDateString = (
  date: Date,
  mode: 'NORMAL' | 'REVERSED' = 'NORMAL',
  timeZone: string = env.DATE_TIMEZONE
): string => {
  if (!date || isNaN(date.getTime())) {
    return '';
  }

  const { year, month, day } = extractDateParts(date, timeZone);

  const dayStr = String(day).padStart(2, '0');
  const monthStr = String(month).padStart(2, '0');
  const yearStr = String(year);

  // Output: 'YYYY-MM-DD'
  return mode === 'REVERSED'
    ? `${dayStr}-${monthStr}-${yearStr}`
    : `${yearStr}-${monthStr}-${dayStr}`;
};
