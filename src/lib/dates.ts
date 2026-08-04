import { fromZonedTime, toZonedTime, format } from 'date-fns-tz'

const TZ = 'Europe/Lisbon'

// Converts a datetime-local or date input string (Lisbon local time) to a UTC Date for storage
export function inputToUTC(localStr: string): Date {
  const normalized = localStr.length === 10 ? `${localStr}T00:00` : localStr
  return fromZonedTime(normalized, TZ)
}

// Converts a UTC date from the DB to a datetime-local input string (Lisbon local time)
export function utcToInput(utcDate: string | Date): string {
  return format(toZonedTime(new Date(utcDate), TZ), "yyyy-MM-dd'T'HH:mm", { timeZone: TZ })
}

// Converts a UTC date from the DB to a date-only input string (Lisbon local time)
export function utcToDateInput(utcDate: string | Date): string {
  return format(toZonedTime(new Date(utcDate), TZ), 'yyyy-MM-dd', { timeZone: TZ })
}

// Formats a UTC date for display in pt-PT (Lisbon timezone)
// Pass diaTodo=true to omit the time component
export function formatDisplay(utcDate: string | Date, diaTodo = false): string {
  const opts: Intl.DateTimeFormatOptions = diaTodo
    ? { timeZone: TZ, weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }
    : { timeZone: TZ, weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }
  return new Date(utcDate).toLocaleString('pt-PT', opts)
}
