require('dotenv').config();
const app = require('../app.js');
// const loadModel = require('./services/loadModel');

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
