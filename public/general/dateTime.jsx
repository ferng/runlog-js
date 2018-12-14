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

const littleDate= date => {
  let parsed = date.getUTCDate();
  if (parsed < 10) {
   parsed = '0' + parsed;
  }
  parsed += '-';  
  parsed += shortMonths[date.getUTCMonth()];
  parsed += '-';  
  parsed += date.getUTCFullYear();  

  return parsed;
}


export {
  weekDays,
  shortMonths,
  weekDayFromDate,
  littleDate,
}
