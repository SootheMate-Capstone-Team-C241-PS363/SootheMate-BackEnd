const { validationResult } = require('express-validator');

function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return res.status(400).json({ errors: errors.array() });
    // res.status(400).json({ status: 'engror', message: errors.message, detail: errors.array() });
    // res.status(400).json({ status: 'engror', message: errors.array() });
    // const errorMessage = errors.array().reduce((acc, error) => acc + `/n ${error.msg}`, '');
    const errorMessage = errors.array().reduce((acc, error) => `${acc ? '\n' : ''}${error.msg}`, '');
    return res.status(400).json({ status : 'fail', message: errorMessage, data : {}})

  }
  next();
}

module.exports = validateRequest;
