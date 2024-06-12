const { getHistory } = require('../services/getHistory');

async function getHistoryHandler(req, res) {
  try {
    const email = req.user.email;
    const { filter } = req.query;
    const histories = await getHistory(email, filter);
    res.status(200).json({
      status: 'success',
      data: histories
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message,
      data: {}
    });
  }
}

module.exports = { getHistoryHandler };
