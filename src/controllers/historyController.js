const { getHistory } = require('../services/getHistory');
const ResponseFormatter = require('../utils/responseFormatter');
const { getUserName } = require('../utils/userUtils');

/**
 * Handle HTTP request to retrieve history predictions.
 *
 * @async
 * @function getHistoryHandler
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>}
 */
async function getHistoryHandler(req, res) {
    try {
        const { email } = req.user;
        const { filter } = req.query;

        console.log('Loading history for:', email);
        // Start fetching user name and history predictions concurrently
        const [name, histories] = await Promise.all([
            getUserName(email),
            getHistory(email, filter)
        ]);
        // Test Passed user loaded
        console.log('User Loaded :', name);

        const formattedHistories = histories.map(history => ({
            id: history.id,
            name: name, 
            stress_level: history.history.result.stress_level,
            title: history.history.result.title,
            description: history.history.result.description,
            created_at: history.history.created_at,
            update_at: history.history.update_at
        }));
        console.log("Pass History Loaded !!")
        return ResponseFormatter.success(res, 'History Predictions Successfully Loaded !!', formattedHistories);
    } catch (error) {
        return ResponseFormatter.error(res, error.message);
    }
}

module.exports = { getHistoryHandler };
