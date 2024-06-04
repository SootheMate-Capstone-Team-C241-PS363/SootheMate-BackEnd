// const jwt = require('jsonwebtoken');
// const { jwtSecret } = require('../config/jwtConfig');
// const { isTokenBlacklisted } = require('./blacklistToken');

// async function authenticate(req, res, next) {
//   // const token = req.headers['authorization'];
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ status: 'fail', message: 'Unauthorized', data: {} });
//   }

//   const jwtToken = token.split(' ')[1];

//   const isBlacklisted = await isTokenBlacklisted(jwtToken);
//   if (isBlacklisted) {
//     return res.status(401).json({ status: 'fail', message: 'Token has been revoked', data: {} });
//   }

//   jwt.verify(jwtToken, jwtSecret, (err, decoded) => {
//     if (err) {
//       return res.status(403).json({ status: 'fail', message: 'Forbidden', data: {} });
//     }
//     req.user = decoded;
//     next();
//   });
// }

const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwtConfig');
const { isTokenBlacklisted } = require('./blacklistToken');

function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      status: 'fail',
      message: 'Unauthorized',
      data: {}
    });
  }


  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.status(403).json({
        status: 'fail',
        message: 'Forbidden',
        data: {}
      });
    }
    req.user = user;
    next();
  });

  if (isTokenBlacklisted(token)) {
    return res.status(401).json({
      status: 'fail',
      message: 'Token has been revoked',
      data: {}
    });
  }
}
module.exports = authenticate;
