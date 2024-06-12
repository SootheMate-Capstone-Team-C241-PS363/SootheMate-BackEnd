const { Firestore } = require('@google-cloud/firestore');
const { filterByToday, filterByLastNDays, filterByYesterday, filterLastRecords } = require('../utils/filterDates');
const moment = require('moment-timezone');

const firestore = new Firestore();

/**
 * Get history of predictions for a user based on filter.
 *
 * @async
 * @function getHistory
 * @param {string} email - The user's email.
 * @param {string} filter - The filter for history ('today', 'last3days', 'last7days', 'yesterday').
 * @returns {Promise<Array>} The filtered history predictions.
 */
async function getHistory(email, filter) {
  const snapshot = await firestore.collection('predictions').where('email', '==', email).get();
  const histories = snapshot.docs.map(doc => ({ id: doc.id, history: doc.data() }));

  return applyFilter(histories, filter);
}

/**
 * Apply filter to history predictions based on filter parameter.
 *
 * @function applyFilter
 * @param {Array} histories - The list of histories.
 * @param {string} filter - The filter to apply ('today', 'last3days', 'last7days', 'yesterday').
 * @returns {Array} The filtered list of histories.
 */
function applyFilter(histories, filter) {
  switch (filter) {
    case 'today':
      return filterByToday(histories);
    case 'last3days':
      return filterByLastNDays(histories, 3);
    case 'last7days':
      return filterByLastNDays(histories, 7);
    case 'yesterday':
      return filterByYesterday(histories);
    default:
      // Show last 7 records if no filter is provided
      return filterLastRecords(histories, 7);
  }
}

module.exports = { getHistory };
