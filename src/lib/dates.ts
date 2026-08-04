import { fromZonedTime, toZonedTime, format } from 'date-fns-tz'

const TZ = 'Europe/Lisbon'

// Converts a datetime-local input string (Lisbon local time) to a UTC Date for storage
export function inputToUTC(localStr: string): Date {
  return fromZonedTime(localStr, TZ)
}

// Converts a UTC date from the DB to a datetime-local input string (Lisbon local time)
export function utcToInput(utcDate: string | Date): string {
  return format(toZonedTime(new Date(utcDate), TZ), "yyyy-MM-dd'T'HH:mm", { timeZone: TZ })
}

// Formats a UTC date for display in pt-PT (Lisbon timezone)
export function formatDisplay(utcDate: string | Date): string {
  return new Date(utcDate).toLocaleString('pt-PT', {
    timeZone: TZ,
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
