/**
 * Determine stress level description based on stress level value.
 *
 * @param {number} stressLevel - The calculated stress level.
 * @returns {Object} An object containing the title and description of the stress level.
 */
const determineStressLevelDescription = (stressLevel) => {
    if (stressLevel <= 30) {
        return {
            title: "Excellent",
            description: "You are experiencing minimal stress and are managing any potential stressors effectively."
        };
    } else if (stressLevel <= 50) {
        return {
            title: "Good",
            description: "You are handling stress well and maintaining a balanced and healthy mindset."
        };
    } else {
        return {
            title: "Bad",
            description: "You are experiencing significant stress and may need to take steps to manage it."
        };
    }
};

module.exports = { determineStressLevelDescription };
