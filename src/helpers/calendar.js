import moment from "moment";

export const THIS_YEAR = +new Date().getFullYear();

export const THIS_MONTH = +new Date().getMonth() + 1;

export const CALENDAR_CONTEXT_STATES = [
  "DAY",
  "MONTH",
  "YEAR"
]

export const WEEK_DAYS = {
  SUNDAY: {
    name: "Sunday",
    abbr: "Sun",
  },
  MONDAY: {
    name: "Monday",
    abbr: "Mon",
  },
  TUESDAY: {
    name: "Tuesday",
    abbr: "Tue",
  },
  WEDNESDAY: {
    name: "Wednesday",
    abbr: "Wed",
  },
  THURSDAY: {
    name: "Thursday",
    abbr: "Thu",
  },
  FRIDAY: {
    name: "Friday",
    abbr: "Fri",
  },
  SATURDAY: {
    name: "Saturday",
    abbr: "Sat",
  },
};

export const CALENDAR_MONTHS = {
  JANUARY: {
    name: "January",
    abbr: "Jan",
    index: 1
  },
  FEBRUARY: {
    name: "February",
    abbr: "Feb",
    index: 2
  },
  MARCH: {
    name: "March",
    abbr: "Mar",
    index: 3
  },
  APRIL: {
    name: "April",
    abbr: "Apr",
    index: 4
  },
  MAY: {
    name: "May",
    abbr: "May",
    index: 5
  },
  JUNE: {
    name: "June",
    abbr: "Jun",
    index: 6
  },
  JULY: {
    name: "July",
    abbr: "Jul",
    index: 7
  },
  AUGUST: {
    name: "August",
    abbr: "Aug",
    index: 8
  },
  SEPTEMBER: {
    name: "September",
    abbr: "Sep",
    index: 9
  },
  OCTOBER: {
    name: "October",
    abbr: "Oct",
    index: 10
  },
  NOVEMBER: {
    name: "November",
    abbr: "Nov",
    index: 11
  },
  DECEMBER: {
    name: "December",
    abbr: "Dec",
    index: 12
  },
}

export const CONTROLS = {
  NEXT: "next",
  BACK: "back"
}

export const getMomentMonth = (month, format = "MMMM") => {
  return moment(month, "M").format(format);
}

export const calculateYearRange = (year, gridCount, index = null) => {
  let rangeCount = index != null ? index : Math.floor(year/gridCount);
  let rangeStart = rangeCount*gridCount;
  let rangeEnd = rangeStart + (gridCount - 1);
  let yearRangeArray = [];

  for (let i = rangeStart; i <= rangeEnd; i++) {
    yearRangeArray.push(i);
  }
  
  return [rangeStart, rangeEnd, rangeCount, yearRangeArray];
}

export const splitArray = (arr, split, elementsPerSplit) => {
  let splitArray = [];

  let count = 0;

  for (let r = 0; r < split; r++) {
    let tempArr = [];
    for (let c = 0; c < elementsPerSplit; c++) {
      tempArr.push(arr[count]);
      count++;
    }
    splitArray.push(tempArr);
  }
  return splitArray;
}


export const CALENDAR_WEEKS = 6;

export const zeroPad = (value, length) => {
  return `${value}`.padStart(length, '0');
}

export const getMonthDays = (month = THIS_MONTH, year = THIS_YEAR) => {
  const months30 = [4, 6, 9, 11];

  const leapYear = year % 4 === 0;

  return month === 2 ? leapYear ? 29 : 28 : months30.includes(month) ? 30 : 31;
}

export const getMonthFirstDay = (date = new Date) => {
	return new Date(new Date(+date).setDate(1)).getDay() + 1;
}

export const isDate = date => {
  const isDate = Object.prototype.toString.call(date) == '[object Date]';
  const isValidDate = date && !Number.isNaN(date.valueOf());

  return isDate && isValidDate;
}

export const isSameMonth = (date, basedate = new Date()) => {
  
  if (!(isDate(date) && isDate(basedate))) return false;

  const basedateMonth = +(basedate.getMonth()) + 1;
  const basedateYear = basedate.getFullYear();

  const dateMonth = +(date.getMonth()) + 1;
  const dateYear = date.getFullYear();

  return (+basedateMonth === +dateMonth) && (+basedateYear === +dateYear);
  
}

export const isSameDay = (date, basedate = new Date()) => {
  
  if (!(isDate(date) && isDate(basedate))) return false;

  const basedateDate = basedate.getDate();
  const basedateMonth = +(basedate.getMonth()) + 1;
  const basedateYear = basedate.getFullYear();

  const dateDate = date.getDate();
  const dateMonth = +(date.getMonth()) + 1;
  const dateYear = date.getFullYear();

  return (+basedateDate === +dateDate) && (+basedateMonth === +dateMonth) && (+basedateYear === +dateYear);
  
}

export const getDateISO = (date = new Date) => {
  
  if (!isDate(date)) return null;

  return [
    date.getFullYear(),
    zeroPad(+date.getMonth() + 1, 2),
    zeroPad(+date.getDate(), 2)
  ].join('-');
  
}

export const getPreviousMonth = (month, year) => {
  const prevMonth = (month > 1) ? month - 1 : 12;
  const prevMonthYear = (month > 1) ? year : year - 1;

  return { month: prevMonth, year: prevMonthYear };
}

export const getNextMonth = (month, year) => {
  const nextMonth = (month < 12) ? month + 1 : 1;
  const nextMonthYear = (month < 12) ? year : year + 1;

  return { month: nextMonth, year: nextMonthYear };
}

export default (month = THIS_MONTH, year = THIS_YEAR) => {
  const monthDays = getMonthDays(month, year);
  const monthFirstDay = getMonthFirstDay(month, year);

  const daysFromPrevMonth = monthFirstDay - 1;
  const daysFromNextMonth = (CALENDAR_WEEKS * 7) - (daysFromPrevMonth + monthDays);

  const { month: prevMonth, year: prevMonthYear } = getPreviousMonth(month, year);
  const { month: nextMonth, year: nextMonthYear } = getNextMonth(month, year);

  const prevMonthDays = getMonthDays(prevMonth, prevMonthYear);

  const prevMonthDates = [...new Array(daysFromPrevMonth)].map((n, index) => {
    const day = index + 1 + (prevMonthDays - daysFromPrevMonth);
    return [ prevMonthYear, zeroPad(prevMonth, 2), zeroPad(day, 2) ];
  });

  const thisMonthDates = [...new Array(monthDays)].map((n, index) => {
    const day = index + 1;
    return [year, zeroPad(month, 2), zeroPad(day, 2)];
  });

  const nextMonthDates = [...new Array(daysFromNextMonth)].map((n, index) => {
    const day = index + 1;
    return [nextMonthYear, zeroPad(nextMonth, 2), zeroPad(day, 2)];
  });

  return [ ...prevMonthDates, ...thisMonthDates, ...nextMonthDates ];
}