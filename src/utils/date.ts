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

export function formatRentalDateTimeStart(start: string): string {
  const startDate = DateTime.fromSQL(start).setLocale('pt-BR');

  return `Pista reservada para o dia ${startDate.toFormat('dd/LL/yyyy')} às ${startDate.toFormat('HH:mm')}.`;
}

export function formatRentalDateTimeEnd(end: string): string {
  const endDate = DateTime.fromSQL(end).setLocale('pt-BR');
  return `\nAluguel válido até ${endDate.toFormat('dd/LL/yyyy')} às ${endDate.toFormat('HH:mm')}.`;
}

