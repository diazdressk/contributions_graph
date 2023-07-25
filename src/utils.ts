import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import weekday from 'dayjs/plugin/weekday';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {
  dateFormat,
  monthLabelHeight,
  colorsContributions,
  panelMargin,
  panelSize,
  weekLabelWidth,
} from './constants';
import { ICalendarData } from './types';

dayjs.extend(localizedFormat);
dayjs.extend(weekday);
dayjs.extend(customParseFormat);

export const setPanelColor = (value: number): string => {
  const panelColors = colorsContributions.map((item) => item.color);
  if (value > 0 && value < 10) return panelColors[1];
  if (value >= 10 && value < 20) return panelColors[2];
  if (value >= 20 && value < 30) return panelColors[3];
  if (value >= 30) return panelColors[4];
  else return panelColors[0];
};

export const makeCalendarData = (
  history: { [k: string]: number },
  lastDay: string,
  columns: number,
): ICalendarData[][] => {
  const d = dayjs(lastDay, { format: dateFormat });

  const lastWeekend = d.endOf('week').add(1, 'day');
  const endDate = d.endOf('day');

  const result: ICalendarData[][] = [];
  for (let i = 0; i < columns; i++) {
    result[i] = [];
    for (let j = 0; j < 7; j++) {
      const date = lastWeekend.subtract((columns - i - 1) * 7 + (6 - j), 'day');
      if (date <= endDate) {
        result[i][j] = {
          value: history[date.format('YYYY-MM-DD')] || 0,
          date: date.format(dateFormat),
          month: date.month(),
        };
      } else {
        result[i][j] = null as any;
      }
    }
  }

  return result;
};

export const getPanelPosition = (row: number, col: number) => {
  const bounds = panelSize + panelMargin;
  return {
    x: weekLabelWidth + bounds * row,
    y: monthLabelHeight + bounds * col,
  };
};

export const getToday = () => {
  return dayjs().format('YYYY-MM-DD');
};

export const formatRussianDate = (inputDate: string): string => {
  const daysOfWeek: string[] = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
  ];
  const months: string[] = [
    '',
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];
  const [day, month, year] = inputDate.split('-').map(Number);
  const dateObj = new Date(year, month - 1, day);
  const dayOfWeekName = daysOfWeek[dateObj.getDay()];
  const monthName = months[dateObj.getMonth() + 1];
  return `${dayOfWeekName}, ${monthName} ${day}, ${year}`;
};

export const showContributionsTooltip = (contributions: number): string => {
  if (contributions === 0) return 'No contributions';
  if (contributions === 10) return '1-9 contributions';
  if (contributions === 20) return '10-19 contributions';
  if (contributions === 30) return '20-29 contributions';
  else return '30+ contributions';
};
