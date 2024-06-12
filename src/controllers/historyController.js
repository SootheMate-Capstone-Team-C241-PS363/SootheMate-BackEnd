const { getHistory } = require('../services/getHistory');
const ResponseFormatter = require('../utils/responseFormatter');

async function getHistoryHandler(req, res) {
  try {
    const email = req.user.email;
    const { filter } = req.query;
    const histories = await getHistory(email, filter);
    return ResponseFormatter.success(res, 'History Predictions Successfully Loaded !!', histories);
  } catch (error) {
    return ResponseFormatter.error(res, error.message)
  }
}

module.exports = { getHistoryHandler };
