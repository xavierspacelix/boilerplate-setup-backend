import { env } from '@config/env';
import { BadRequestError } from '@errors/index';
import { keys } from '@i18n/errorKeys';

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

const timeUnitMap: Record<string, number> = {
  ms: 1,
  s: 1000,
  m: 60_000,
  h: 3_600_000,
  d: 86_400_000,
};

/**
 * Parses a human-readable time string (e.g. "10s", "5m", "1h") into milliseconds.
 *
 * @param {string} input - A string representing time with a unit (ms, s, m, h, d).
 * @returns {number} The equivalent time in milliseconds.
 * @throws {BadRequestError} If the input format or unit is invalid.
 */
export const parseTimeToMs = (input: string): number => {
  const match = /^(\d+)(ms|s|m|h|d)$/.exec(input);
  if (!match || !match[1] || !match[2]) {
    throw new BadRequestError(keys.INVALID_EXPIRE_FORMAT, { input: input });
  }

  const numStr = match[1];
  const unit = match[2] as keyof typeof timeUnitMap;
  const multiplier = timeUnitMap[unit];
  if (multiplier === undefined) {
    throw new BadRequestError(keys.INVALID_TIME_UNIT, { unit: unit });
  }

  return parseInt(numStr, 10) * multiplier;
};
