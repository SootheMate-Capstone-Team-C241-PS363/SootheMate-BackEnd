const moment = require('moment-timezone');

const TIMEZONE = 'Asia/Jakarta';

/**
 * Filter histories to include only records from today.
 *
 * @param {Array} histories - The list of histories.
 * @returns {Array} The filtered list of histories.
 */
function filterByToday(histories) {
  const now = moment().tz(TIMEZONE);
  const startOfDay = now.clone().startOf('day');
  return histories.filter(history => moment(history.history.created_at).tz(TIMEZONE).isSameOrAfter(startOfDay));
}

/**
 * Filter histories to include only records from the last N days.
 *
 * @param {Array} histories - The list of histories.
 * @param {number} days - The number of days to go back.
 * @returns {Array} The filtered list of histories.
 */
function filterByLastNDays(histories, days) {
  const now = moment().tz(TIMEZONE);
  const lastDays = now.clone().subtract(days, 'days');
  return histories.filter(history => moment(history.history.created_at).tz(TIMEZONE).isSameOrAfter(lastDays));
}

/**
 * Filter histories to include only records from yesterday.
 *
 * @param {Array} histories - The list of histories.
 * @returns {Array} The filtered list of histories.
 */
function filterByYesterday(histories) {
  const now = moment().tz(TIMEZONE);
  const startOfYesterday = now.clone().subtract(1, 'day').startOf('day');
  const endOfYesterday = now.clone().startOf('day');
  return histories.filter(history => moment(history.history.created_at).tz(TIMEZONE).isBetween(startOfYesterday, endOfYesterday));
}

/**
 * Filter histories to include the last N records.
 *
 * @param {Array} histories - The list of histories.
 * @param {number} count - The number of records to include.
 * @returns {Array} The filtered list of histories.
 */
function filterLastRecords(histories, count) {
  return histories.slice(-count);
}

module.exports = {
  filterByToday,
  filterByLastNDays,
  filterByYesterday,
  filterLastRecords
};
