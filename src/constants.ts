import { IColorsContributions } from './types';

export const weekNames: string[] = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
export const monthNames: string[] = [
  'Янв.',
  'Февр.',
  'Март',
  'Апр.',
  'Май',
  'Июнь',
  'Июль',
  'Авг.',
  'Сент.',
  'Окт.',
  'Нояб.',
  'Дек.',
];

export const colorsContributions: IColorsContributions[] = [
  { color: '#EDEDED', contributions: 0 },
  { color: '#ACD5F2', contributions: 10 },
  { color: '#7FA8C9', contributions: 20 },
  { color: '#527BA0', contributions: 30 },
  { color: '#254E77', contributions: 31 },
];
export const columns: number = 53;
export const monthLabelHeight: number = 20;
export const weekLabelWidth: number = 20;
export const panelSize: number = 15;
export const panelMargin: number = 2;
export const dateFormat: string = 'DD-MM-YYYY';
export const URL = 'https://dpg.gg/test/calendar.json';
export const tooltipStyles = { backgroundColor: '#161515da', fontSize: '20px' };
export const textStyles = {
  color: '#959494',
  fontSize: '12px',
};
