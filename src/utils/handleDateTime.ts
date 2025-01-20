import moment from 'moment';

export enum DATE_FORMAT {
  FIRST = 'DD/MM/YYYY',
  SECOND = 'hh:mm:ss',
  THIRD = 'HH:mm DD/MM/YYYY',
  FOUR = 'YYYY-MM-DD',
  FIVE = 'Do MMM, YYYY',
  SIX = 'HH:mm',
}

export const formatDate = (date: Date | string | number, format: DATE_FORMAT): string => {
  return moment(date).format(format);
};

export const getEstimationDays = (dueDate: Date) => {
  return `${Math.round(Math.abs((dueDate.getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000)))}d`;
};
