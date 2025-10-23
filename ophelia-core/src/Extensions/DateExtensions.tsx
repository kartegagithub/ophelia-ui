export function addDays(days: number = 1, value: Date = new Date()) {
  if (!value) return value;
  value.setDate(value.getDate() + days);
  return value;
}
export function addMonths(months: number = 1, value: Date = new Date()) {
  if (!value) return value;
  value.setMonth(value.getMonth() + months);
  return value;
}
export function addYears(years: number = 1, value: Date = new Date()) {
  if (!value) return value;
  value.setFullYear(value.getFullYear() + years);
  return value;
}
export function getDaysInMonth(month: number, year?: number) {
  if (month == 1 && year) return isLeapYear(year) ? 29 : 28;
  return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
}
export function isLeapYear(year: number = new Date().getFullYear()) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

//Şimdi ile herhangi bir tarih arasındaki zaman farkını ms cinsinden döner.
export function getTimeDiffInMilliseconds(timestamp: EpochTimeStamp = 0): {
  diff: number;
  isUpcoming: boolean;
} {
  const now = Date.now();
  const diff = now - timestamp;
  return {
    diff,
    isUpcoming: diff < 0,
  };
}
