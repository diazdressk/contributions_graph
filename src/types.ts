export interface ICalendarData {
  value: number;
  date: string;
  month: number;
}

export interface IContributionsData {
  [date: string]: number;
}

export interface IColorsContributions {
  color: string;
  contributions: number;
}
