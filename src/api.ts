import { URL } from './constants';

export const getContribuionsData = async () => {
  const data = await fetch(URL).then((res) => res.json());
  return data;
};
