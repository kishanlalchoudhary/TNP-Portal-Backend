const moment = require("moment-timezone");

const convertFromIstToUtc = (istTime) => {
  return moment.tz(istTime, "Asia/Kolkata").toDate();
};

module.exports = { convertFromIstToUtc };
