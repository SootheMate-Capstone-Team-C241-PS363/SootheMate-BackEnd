/**
 * Google Cloud Storage configuration module.
 *
 * Sets up the connection to the Google Cloud Storage bucket.
 *
 * @module config/storageConfig
 */
const { Storage } = require('@google-cloud/storage');

const storage = new Storage();
const bucketName = 'user-soothemate';
const bucket = storage.bucket(bucketName);

module.exports = bucket;
