import moment from 'moment';

export enum DATE_FORMAT {
  FIRST = 'DD/MM/YYYY',
  SECOND = 'hh:mm:ss',
  THIRD = 'HH:mm DD/MM/YYYY',
}

export function formatDate(
  date: Date | string | number,
  format: DATE_FORMAT
): string {
  return moment(date).format(format);
}
