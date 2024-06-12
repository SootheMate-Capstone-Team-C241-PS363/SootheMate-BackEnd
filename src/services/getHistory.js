const { Firestore } = require('@google-cloud/firestore');
const firestore = new Firestore();

async function getHistory(email, filter) {
  const snapshot = await firestore.collection('predictions').where('email', '==', email).get();
  const histories = [];
  
  snapshot.forEach(doc => {
    histories.push({ id: doc.id, history: doc.data() });
  });

  const filteredHistories = applyFilter(histories, filter);
  return filteredHistories;
}

function applyFilter(histories, filter) {
  const now = new Date();
  let filteredHistories = histories;

  if (filter === 'today') {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    filteredHistories = histories.filter(history => new Date(history.history.created_at) >= startOfDay);
  } else if (filter === 'last3days') {
    const last3Days = new Date(now.setDate(now.getDate() - 3));
    filteredHistories = histories.filter(history => new Date(history.history.created_at) >= last3Days);
  } else if (filter === 'last7days') {
    const last7Days = new Date(now.setDate(now.getDate() - 7));
    filteredHistories = histories.filter(history => new Date(history.history.created_at) >= last7Days);
  } else if (filter === 'yesterday') {
    const yesterday = new Date(now.setDate(now.getDate() - 1));
    yesterday.setHours(0, 0, 0, 0);
    const today = new Date(now.setDate(now.getDate() + 1));
    today.setHours(0, 0, 0, 0);
    filteredHistories = histories.filter(history => new Date(history.history.created_at) >= yesterday && new Date(history.history.created_at) < today);
  }

  return filteredHistories;
}

module.exports = { getHistory };
