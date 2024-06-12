const { Firestore } = require('@google-cloud/firestore');
const moment = require('moment-timezone');

const firestore = new Firestore();
const TIMEZONE = 'Asia/Jakarta';
const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

/**
 * Get history of predictions for a user.
 *
 * @async
 * @function getHistory
 * @param {string} email - The email of the user.
 * @param {string} filter - The filter for the history (e.g., 'today', 'last3days', 'last7days', 'yesterday').
 * @returns {Promise<Array>} The filtered history of predictions.
 */
async function getHistory(email, filter) {
    const snapshot = await firestore.collection('predictions').where('email', '==', email).get();
    const histories = snapshot.docs.map(doc => ({ id: doc.id, history: doc.data() }));

    return applyFilter(histories, filter);
}

/**
 * Apply filter to the history of predictions.
 *
 * @function applyFilter
 * @param {Array} histories - The list of histories.
 * @param {string} filter - The filter to apply.
 * @returns {Array} The filtered list of histories.
 */
function applyFilter(histories, filter) {
    const now = moment().tz(TIMEZONE);
    let filteredHistories = histories;

    switch (filter) {
        case 'today':
            const startOfDay = now.clone().startOf('day');
            filteredHistories = histories.filter(history => moment(history.history.created_at).tz(TIMEZONE).isSameOrAfter(startOfDay));
            break;
        case 'last3days':
            const last3Days = now.clone().subtract(3, 'days');
            filteredHistories = histories.filter(history => moment(history.history.created_at).tz(TIMEZONE).isSameOrAfter(last3Days));
            break;
        case 'last7days':
            const last7Days = now.clone().subtract(7, 'days');
            filteredHistories = histories.filter(history => moment(history.history.created_at).tz(TIMEZONE).isSameOrAfter(last7Days));
            break;
        case 'yesterday':
            const startOfYesterday = now.clone().subtract(1, 'day').startOf('day');
            const endOfYesterday = now.clone().startOf('day');
            filteredHistories = histories.filter(history => moment(history.history.created_at).tz(TIMEZONE).isBetween(startOfYesterday, endOfYesterday));
            break;
        default:
            // Show last 7 records if no filter is provided
            filteredHistories = histories.slice(-7);
            break;
    }

    return filteredHistories;
}

module.exports = { getHistory };
