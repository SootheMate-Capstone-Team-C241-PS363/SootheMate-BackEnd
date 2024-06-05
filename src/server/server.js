/**
 * Server initialization script.
 *
 * @module server/server
 */
require('dotenv').config();
const app = require('../app.js');
// const loadModel = require('./services/loadModel');

/**
 * Immediately-invoked function expression (IIFE) to start the server.
 *
 * @async
 * @function
 * @memberof module:server/server
 */
(async () => {
  try {
    // const model = await loadModel();
    // app.locals.model = model;

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
})();
