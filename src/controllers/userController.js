const { Firestore } = require('@google-cloud/firestore');
const bucket = require('../config/storageConfig');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const firestore = new Firestore();
const ResponseFormatter = require('../utils/responseFormatter');

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
      return ResponseFormatter.fail(res,'User not found', 404 )
    }

    const userData = doc.data();
    return ResponseFormatter.success(res, 'User detail fetched successfully', {
      id: userData.id,
      name: userData.name,
      gender: userData.gender,
      birth_date: userData.birth_date,
      email: userData.email,
      email_verified_at: userData.email_verified_at || null,
      avatar: userData.avatar || null,
      created_at: userData.created_at,
      updated_at: userData.updated_at
    });
    
  } catch (error) {
    return ResponseFormatter.error(res, error.message);
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
      return ResponseFormatter.fail(res, 'No file uploaded', 400);
    }

    const blob = bucket.file(`avatars/${uuidv4()}_${path.basename(file.originalname)}`);
    const blobStream = blob.createWriteStream({ resumable: false });

    blobStream.on('error', (err) => res.status(500).json({ status: 'fail', message: err.message, data: {} }));

    blobStream.on('finish', async () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      const userRef = firestore.collection('users').doc(user.email);
      const doc = await userRef.get();

      if (!doc.exists) {
        return ResponseFormatter.fail(res, 'User not found', 404);
      }

      await userRef.update({ avatar: publicUrl, updated_at: new Date().toISOString() });

      const updatedUser = (await userRef.get()).data();

      return ResponseFormatter.success(res, 'Avatar updated successfully', updatedUser);
    });

    blobStream.end(file.buffer);
  } catch (error) {
    return ResponseFormatter.error(res, error.message);
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
      return ResponseFormatter.fail(res, 'User not found', 404);
    }

    await userRef.update({
      name,
      gender,
      birth_date,
      updated_at: new Date().toISOString()
    });

    const updatedUser = (await userRef.get()).data();

    return ResponseFormatter.success(res, 'Profile updated successfully', updatedUser);
  } catch (error) {
    return ResponseFormatter.error(res, error.message);
  }
}

module.exports = { getUserDetailHandler, updateAvatarHandler, updateProfileHandler };
