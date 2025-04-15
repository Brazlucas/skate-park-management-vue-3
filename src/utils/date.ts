import { DateTime } from 'luxon';

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('pt-BR');
}

export function formatTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

export function formatDateTimeLocal(year: number, month: number, day: number, hour: number) {
  return DateTime.fromObject(
    { year, month, day, hour },
    { zone: 'America/Sao_Paulo' }
  ).toISO();
}
