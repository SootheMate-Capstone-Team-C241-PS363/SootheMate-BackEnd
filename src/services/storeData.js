const { Firestore } = require('@google-cloud/firestore');
const moment = require('moment-timezone')

const db = new Firestore();
const predictCollection = db.collection('predictions');
const TIME_ZONE = 'Asia/Jakarta';

async function storeData(id, data) {

  return predictCollection.doc(id).set(data, {merge: true});
}

async function getPredictionByDate(email, date){
  date = moment().tz(TIME_ZONE);
  const startOfDay = moment().tz(TIME_ZONE).format('YYYY-MM-DD 00:00:00');
  const endOfDay =  moment().tz(TIME_ZONE).format('YYYY-MM-DD 23:59:60')
  console.log(startOfDay, "Start");
  console.log(endOfDay, "End");
  const snapshot = await predictCollection
    .where('email', '==', email)
    .where('created_at', '>=', startOfDay)
    .where('created_at', '<=', endOfDay)
    .get();

  if (snapshot.empty){
    return null;
  }

  return snapshot.docs[0];
}

module.exports = {storeData, getPredictionByDate};