class Utils {
  createUUID = function () {
    // http://www.ietf.org/rfc/rfc4122.txt
    function _p8(s = false) {
      var p = (Math.random().toString(16) + '000000000').substr(2, 8);
      return s ? '-' + p.substr(0, 4) + '-' + p.substr(4, 4) : p;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
  };
  toFixed = (val, n = 2) => (val ? val.toFixed(n) : 0);

  epochToDate = (epoch) => {
    return new Date(epoch * 1000);
  };

  millisecondsPassedToday = () => {
    const now = new Date();
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    debugger;
    const elapsedMilliseconds = now.getTime() - startOfToday.getTime();
    return elapsedMilliseconds / 1000;
  };
  dateToEpoch = (date: Date = new Date()) => {
    // if (!date) {
    //   return null;
    // }
    debugger;
    return Math.floor(date.getTime() / 1000);
  };

  // dateToEpochPlusTodayTime = (date: Date = new Date()) => {
  //   return Math.floor(date.getTime() / 1000) + this.millisecondsPassedToday();
  // };

  getStartOfToday(daysBehind = 0) {
    const today = new Date();

    // Set the time to midnight
    today.setHours(0, 0, 0, 0);
    if (daysBehind === 0) {
      return today;
    }

    today.setDate(today.getDate() - daysBehind);

    return today;
  }
  getStartOfWeek(weeksAhead = 0, date = new Date()) {
    // Clone the date to avoid mutating the original date
    const startOfWeek = new Date(date);

    // Calculate the difference in days from Monday (getDay() returns 0 for Sunday, 1 for Monday, etc.)
    const dayOfWeek = startOfWeek.getDay(); // Get the current day of the week
    const diff = startOfWeek.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust when it's Sunday (0) to be considered the end of the week

    startOfWeek.setDate(diff);
    startOfWeek.setHours(0, 0, 0, 0); // Reset the time part

    debugger;
    if (weeksAhead === 0) {
      return startOfWeek;
    }

    startOfWeek.setDate(startOfWeek.getDate() + 7 * weeksAhead);
    return startOfWeek;
  }

  getStartOfMonth(monthsAhead = 0, date = new Date()) {
    // Clone the date to avoid mutating the original date
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);

    // Set the time to midnight
    startOfMonth.setHours(0, 0, 0, 0);

    debugger;
    if (monthsAhead === 0) {
      return startOfMonth;
    }

    startOfMonth.setMonth(startOfMonth.getMonth() + monthsAhead);

    return startOfMonth;
  }

  getStartOfQuarter(quartersBehind = 0, date = new Date()) {
    const year = date.getFullYear();
    const month = date.getMonth();

    // Determine the start month of the current quarter
    let startMonth;
    if (month <= 2) {
      // January to March
      startMonth = 0; // January
    } else if (month <= 5) {
      // April to June
      startMonth = 3; // April
    } else if (month <= 8) {
      // July to September
      startMonth = 6; // July
    } else {
      // October to December
      startMonth = 9; // October
    }

    // Create the start date of the quarter
    const startOfQuarter = new Date(year, startMonth, 1);

    // Set time to midnight
    startOfQuarter.setHours(0, 0, 0, 0);

    if (quartersBehind === 0) {
      return startOfQuarter;
    }

    startOfQuarter.setMonth(startOfQuarter.getMonth() - 3 * quartersBehind);

    return startOfQuarter;
  }

  getStartOfYear(yearsBehind = 0, date = new Date()) {
    const year = date.getFullYear();
    // Create a new date for January 1st of the current year
    const startOfYear = new Date(year, 0, 1);

    // Set time to midnight
    startOfYear.setHours(0, 0, 0, 0);

    if (yearsBehind === 0) {
      return startOfYear;
    }

    startOfYear.setFullYear(startOfYear.getFullYear() - yearsBehind);

    return startOfYear;
  }

  getStartOfTodayAsEpoch() {
    return this.dateToEpoch(this.getStartOfToday());
  }

  getStartOfWeekAsEpoch(weeksAhead = 0) {
    // Clone the date to avoid mutating the original date
    const startOfWeek = this.getStartOfWeek(weeksAhead);

    return this.dateToEpoch(startOfWeek);
  }

  getStartOfMonthAsEpoch(monthsAhead = 0) {
    // Clone the date to avoid mutating the original date
    const startOfWeek = this.getStartOfMonth(monthsAhead);

    return this.dateToEpoch(startOfWeek);
  }

  getStartOfQuarterAsEpoch(quartersBehind = 0) {
    // Clone the date to avoid mutating the original date
    const startOfWeek = this.getStartOfQuarter(quartersBehind);

    return this.dateToEpoch(startOfWeek);
  }

  getStartOfYearAsEpoch(yearsBehind = 0) {
    // Clone the date to avoid mutating the original date
    const start = this.getStartOfYear(yearsBehind);

    return this.dateToEpoch(start);
  }

  dateNumberToYYYYMMDD = (value: number) => {
    const date = this.epochToDate(value);
    return `${
      date.getMonth() + 1
    }-${date.getDate()}-${date.getFullYear()}-${date.getHours()}:${date.getMinutes()}`;
  };

  getQueryVariable = (variable) => {
    var query = window.location.search.substring(1);
    console.log(query); //"app=article&act=news_content&aid=160990"
    var vars = query.split('&');
    console.log(vars); //[ 'app=article', 'act=news_content', 'aid=160990' ]
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      console.log(pair); //[ 'app', 'article' ][ 'act', 'news_content' ][ 'aid', '160990' ]
      if (pair[0] === variable) {
        return pair[1];
      }
    }
    return false;
  };
  getQueryAsJson = (): any => {
    const response = {};
    var query = window.location.search.substring(1);
    console.log(query); //"app=article&act=news_content&aid=160990"
    var vars = query.split('&');
    console.log(vars); //[ 'app=article', 'act=news_content', 'aid=160990' ]
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      // console.log(pair); //[ 'app', 'article' ][ 'act', 'news_content' ][ 'aid', '160990' ]
      response[pair[0]] = pair[1];
    }
    return response;
  };

  debounce = (func, delay) => {
    let timeoutId;

    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  compareObjects = (obj1, obj2) => {
    const differences = {};

    Object.keys(obj1).forEach((key) => {
      if (obj1[key] !== obj2[key]) {
        differences[key] = { prev: obj1[key], current: obj2[key] };
      }
    });

    return differences;
  };

  injectScript = (src: string, id: string, onLoad: () => void) => {
    if (document.getElementById(id)) {
      onLoad();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.id = id;
    script.async = true;
    script.defer = true;
    script.onload = onLoad;
    document.head.appendChild(script);
  };
}

const utils = new Utils();

export { utils };
