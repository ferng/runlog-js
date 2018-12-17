const weekDays = [
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
];

const shortMonths = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const weekDayFromDate = date =>
  weekDays[date.getDay()];

const littleDate = (date) => {
  let parsed = date.getUTCDate();
  if (parsed < 10) {
    parsed = `0${parsed}`;
  }
  parsed += '-';
  parsed += shortMonths[date.getUTCMonth()];
  parsed += '-';
  parsed += date.getUTCFullYear();

  return parsed;
};

const moveDate = (date, offset) => new Date(date.getFullYear(), date.getUTCMonth(), date.getUTCDate() + offset);


const calcWeekStart = (date) => {
  const offset = -((date.getUTCDay() === 0 ? 7 : date.getUTCDay()) - 1);
  return moveDate(date, offset);
};

export {
  weekDays,
  shortMonths,
  weekDayFromDate,
  littleDate,
  moveDate,
  calcWeekStart,
};
