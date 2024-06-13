const { getHistory, getHistoryById } = require('../services/getHistory');
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

/**
 * Handle HTTP request to retrieve detailed history prediction by ID.
 *
 * @async
 * @function getHistoryDetailHandler
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>}
 */
async function getHistoryDetailHandler(req, res) {
  try {
      const { id } = req.params;

      console.log('loading !!')
      const historyData = await getHistoryById(id);
      console.log('loading ... : ', historyData)
      const formattedHistory = formatHistoryDetail(historyData);

      return ResponseFormatter.success(res, 'History Detail Successfully Loaded !!', formattedHistory);
  } catch (error) {
      console.error('Error retrieving history detail:', error);
      return ResponseFormatter.error(res, 'Failed to retrieve history detail');
  }
}

/**
 * Format history detail to include only necessary fields.
 *
 * @param {Object} history - The history object.
 * @returns {Object} The formatted history object.
 */
function formatHistoryDetail(history) {
  const formatted = {
      gender: history.gender,
      age: history.age,
      sleep_duration: history.sleep_duration,
      quality_of_sleep: history.quality_of_sleep,
      physical_activity_level: history.physical_activity_level,
      min_working_hours: history.min_working_hours,
      max_working_hours: history.max_working_hours
  };

  if (history.heart_rate) formatted.heart_rate = history.heart_rate;
  if (history.daily_steps) formatted.daily_steps = history.daily_steps;
  if (history.blood_pressure) formatted.blood_pressure = history.blood_pressure;
  if (history.bmi_category) formatted.bmi_category = history.bmi_category;

  return formatted;
}

module.exports = { getHistoryHandler , getHistoryDetailHandler};
