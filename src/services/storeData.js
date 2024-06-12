const { Firestore } = require('@google-cloud/firestore');
const moment = require('moment-timezone')

async function storeData(id, data) {
  const db = new Firestore();

  const predictCollection = db.collection('predictions');
  return predictCollection.doc(id).set(data, {merge: true});
}


async function getPredictionByDate(email, date){
  const db = new Firestore();
  const predictCollection = db.collection('predictions');
  // const startOfDay = new Date(date);
  // startOfDay.setHours(0, 0, 0, 0);
  // const endOfDay = new Date(date);
  // endOfDay.setHours(23, 59, 59, 999);
  // const startOfDay = moment(date).tz('Asia/Jakarta', true).startOf('day').toDate();
  // const endOfDay = moment(date).tz('Asia/Jakarta', true).endOf('day').toDate();
  // date = new Date();
  date = moment().tz('Asia/Jakarta');
  const startOfDay = date.clone().startOf('day').tz('Asia/Jakarta', true).toDate();
  const endOfDay = date.clone().endOf('day').tz('Asia/Jakarta', true).toDate();

  const jakartaTime = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
  console.log(jakartaTime)
  // tanggal = date.getDate();
  // console.log(tanggal)
  console.log(startOfDay)
  console.log(endOfDay)
  const snapshot = await predictCollection
    .where('email', '==', email)
    // .where('created_at', '>=', startOfDay.toISOString())
    .where('created_at', '==', jakartaTime)
    .get();

  if (snapshot.empty){
    return null;
  }

  return snapshot.docs[0];
}

module.exports = {storeData, getPredictionByDate};