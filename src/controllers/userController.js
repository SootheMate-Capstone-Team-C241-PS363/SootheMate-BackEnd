const { Firestore } = require('@google-cloud/firestore');
const bucket = require('../config/storageConfig');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const firestore = new Firestore();

/**
 * Get User Detail Handler
 *
 * Fetches the details of the authenticated user.
 *
 * @async
 * @function getUserDetailHandler
 * @param {Object} req - Express request object
 * @param {Object} req.user - The authenticated user
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
async function getUserDetailHandler(req, res) {
  try {
    const user = req.user;
    const userRef = firestore.collection('users').doc(user.email);
    const doc = await userRef.get();

    if (!doc.exists) {
      return res.status(404).json({ status: 'fail', message: 'User not found', data: {} });
    }

    const userData = doc.data();

    res.status(200).json({
      status: 'success',
      message: 'User detail fetched successfully',
      data: {
        id: userData.id,
        name: userData.name,
        gender: userData.gender,
        birth_date: userData.birth_date,
        email: userData.email,
        email_verified_at: userData.email_verified_at || null,
        avatar: userData.avatar || null,
        created_at: userData.created_at,
        updated_at: userData.updated_at
      }
    });
  } catch (error) {
    res.status(500).json({ status: 'fail', message: error.message, data: {} });
  }
}

/**
 * Update Avatar Handler
 *
 * Updates the avatar of the authenticated user.
 *
 * @async
 * @function updateAvatarHandler
 * @param {Object} req - Express request object
 * @param {Object} req.user - The authenticated user
 * @param {Object} req.file - The uploaded avatar file
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
async function updateAvatarHandler(req, res) {
  try {
    const user = req.user;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ status: 'fail', message: 'No file uploaded', data: {} });
    }

    const blob = bucket.file(`avatars/${uuidv4()}_${path.basename(file.originalname)}`);
    const blobStream = blob.createWriteStream({ resumable: false });

    blobStream.on('error', (err) => res.status(500).json({ status: 'fail', message: err.message, data: {} }));

    blobStream.on('finish', async () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      const userRef = firestore.collection('users').doc(user.email);
      const doc = await userRef.get();

      if (!doc.exists) {
        return res.status(404).json({ status: 'fail', message: 'User not found', data: {} });
      }

      await userRef.update({ avatar: publicUrl, updated_at: new Date().toISOString() });

      const updatedUser = (await userRef.get()).data();

      res.status(200).json({ status: 'success', message: 'Avatar updated successfully', data: updatedUser });
    });

    blobStream.end(file.buffer);
  } catch (error) {
    res.status(500).json({ status: 'fail', message: error.message, data: {} });
  }
}

/**
 * Update Profile Handler
 *
 * Updates the profile of the authenticated user.
 *
 * @async
 * @function updateProfileHandler
 * @param {Object} req - Express request object
 * @param {Object} req.user - The authenticated user
 * @param {Object} req.body - The profile data to update
 * @param {string} req.body.name - The new name of the user
 * @param {string} req.body.gender - The new gender of the user
 * @param {string} req.body.birth_date - The new birth date of the user
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
async function updateProfileHandler(req, res) {
  try {
    const user = req.user;
    const { name, gender, birth_date } = req.body;

    const userRef = firestore.collection('users').doc(user.email);
    const doc = await userRef.get();

    if (!doc.exists) {
      return res.status(404).json({ status: 'fail', message: 'User not found', data: {} });
    }

    await userRef.update({
      name,
      gender,
      birth_date,
      updated_at: new Date().toISOString()
    });

    const updatedUser = (await userRef.get()).data();

    res.status(200).json({ status: 'success', message: 'Profile updated successfully', data: updatedUser });
  } catch (error) {
    res.status(500).json({ status: 'fail', message: error.message, data: {} });
  }
}

module.exports = { getUserDetailHandler, updateAvatarHandler, updateProfileHandler };
