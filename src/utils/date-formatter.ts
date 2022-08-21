import { format, formatDistance, parse } from "date-fns";
import { ptBR } from "date-fns/locale";

const mapWeekDay: Record<number, string> = {
  [0]: "Domingo",
  [1]: "Segunda",
  [2]: "Terça",
  [3]: "Quarta",
  [4]: "Quinta",
  [5]: "Sexta",
  [6]: "Sábado",
};

const mapMonth: Record<number, string> = {
  [0]: "Janeiro",
  [1]: "Fevereiro",
  [2]: "Março",
  [3]: "Abril",
  [4]: "Maio",
  [5]: "Junho",
  [6]: "Julho",
  [7]: "Agosto",
  [8]: "Setembro",
  [9]: "Outubro",
  [10]: "Novembro",
  [11]: "Dezembro",
};

// ex. from 2021-10-18 to Segunda, 18 de Outubro de 2021
export const getFullDateFormat = (
  stringDate: string,
  fromFormat = "yyyy-MM-dd"
) => {
  const date = parse(stringDate, fromFormat, new Date());
  return `${mapWeekDay[date.getDay()]}, ${date.getDate()} de ${
    mapMonth[date.getMonth()]
  } de ${date.getFullYear()}`;
};

// ex. from 2021-10-18 to 18/10/2021
export const formatDayMontYearDate = (
  date: string,
  fromFormat = "yyyy-MM-dd",
  toFormat = "dd/MM/yyyy"
) => {
  return format(parse(date, fromFormat, new Date()), toFormat);
};

// ex. from 2021-10-18 to 18/10
export const formatDayMonthDate = (
  date: string,
  fromFormat = "yyyy-MM-dd",
  toFormat = "dd/MM"
) => {
  return format(parse(date, fromFormat, new Date()), toFormat);
};

export const getPastTime = (date: Date) => {
  let pastTime = formatDistance(date, new Date(), {
    addSuffix: true,
    locale: ptBR,
  });
  return pastTime.charAt(0).toUpperCase() + pastTime.slice(1);
};

export const getLowerCasePastTime = (date: Date) => {
  let pastTime = formatDistance(date, new Date(), {
    addSuffix: true,
    locale: ptBR,
  });
  return pastTime;
};
