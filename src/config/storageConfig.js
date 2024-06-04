const { Storage } = require('@google-cloud/storage');

const storage = new Storage();
const bucketName = 'user-soothemate';
const bucket = storage.bucket(bucketName);

module.exports = bucket;
