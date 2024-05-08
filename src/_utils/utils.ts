class Utils {
  createUUID = function () {
    // http://www.ietf.org/rfc/rfc4122.txt
    function _p8(s = false) {
      var p = (Math.random().toString(16) + "000000000").substr(2, 8);
      return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
  };
  toFixed = (val, n = 2) => (val ? val.toFixed(n) : 0);
  epochToDate = (epoch) => {
    return new Date(epoch * 1000);
  };

  // Function to convert date to epoch timestamp
  dateToEpoch = (date: Date = new Date()) => {
    return Math.floor(date.getTime() / 1000);
  };
  dateNumberToYYYYMMDD = (value: number) => {
    const date = this.epochToDate(value);
    return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
  };
}

const utils = new Utils();

export { utils };
