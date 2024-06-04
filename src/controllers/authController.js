const { registerUser, loginUser } = require('../services/authService');
const bcrypt = require('bcrypt');
const { Firestore } = require('@google-cloud/firestore');
const { addTokenToBlacklist } = require('../middleware/blacklistToken');
const firestore = new Firestore();

async function registerHandler(req, res) {
  try {
    const { name, email, password, password_confirmation } = req.body;
    if (password !== password_confirmation) {
      return res.status(400).json({ status: 'fail', message: 'Password confirmation does not match password', data: {} });
    }

    const result = await registerUser({ name, email, password });
    res.status(200).json({ status: 'success', message: 'User registered successfully', data: result });
  } catch (error) {
    res.status(409).json({ status: 'fail', message: error.message, data: {} });
  }
}

async function loginHandler(req, res) {
  try {
    const { email, password } = req.body;
    const result = await loginUser({ email, password });
    res.status(200).json({ status: 'success', message: 'Login successful', data: result });
  } catch (error) {
    res.status(401).json({ status: 'fail', message: error.message, data: {} });
  }
}

async function updatePasswordHandler(req, res) {
  try {
    const { old_password, password, password_confirmation } = req.body;
    const user = req.user;

    if (password !== password_confirmation) {
      return res.status(400).json({ status: 'fail', message: 'Password confirmation does not match', data: {} });
    }

    const userRef = firestore.collection('users').doc(user.email);
    const doc = await userRef.get();

    if (!doc.exists) {
      return res.status(404).json({ status: 'fail', message: 'User not found', data: {} });
    }

    const userData = doc.data();
    const match = await bcrypt.compare(old_password, userData.password);

    if (!match) {
      return res.status(401).json({ status: 'fail', message: 'Old password is incorrect', data: {} });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await userRef.update({ password: hashedPassword });

    res.status(202).json({ status: 'success', message: 'Password changed', data: [] });
  } catch (error) {
    res.status(500).json({ status: 'fail', message: error.message, data: {} });
  }
}

async function logoutHandler(req, res) {
  try {
    const token = req.headers['authorization'].split(' ')[1];
    addTokenToBlacklist(token);

    res.status(200).json({ status: 'success', message: 'Logout successful', data: {} });
  } catch (error) {
    res.status(500).json({ status: 'fail', message: error.message, data: {} });
  }
}

module.exports = { registerHandler, loginHandler, updatePasswordHandler, logoutHandler };
