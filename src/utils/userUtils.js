const { Firestore } = require('@google-cloud/firestore');
const firestore = new Firestore();

/**
 * Get user's name based on email.
 *
 * @param {string} email - The email of the user.
 * @returns {Promise<string>} The name of the user.
 */
async function getUserName(email) {
    const userRef = firestore.collection('users').doc(email);
    const doc = await userRef.get();
    if (!doc.exists) {
        throw new Error(`User document not found for email: ${email}`);
    }
    const userData = doc.data();
    return userData.name;
}

module.exports = { getUserName };
