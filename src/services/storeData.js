const { Firestore } = require('@google-cloud/firestore');

async function storeData(id, data) {
  const db = new Firestore();

  const predictCollection = db.collection('predictions');
  return predictCollection.doc(id).set(data, {merge: true});
}


async function getPredictionByDate(email, date){
  const db = new Firestore();
  const predictCollection = db.collection('predictions');
  const snapshot = await predictCollection
    .where('email', '==', email)
    .where('created_at', '>=', date+'T00:00:00.000Z')
    .where('created_at', '<=', date+'T23:59:59.999Z')
    .get()

  if (snapshot.empty){
    return null
  }

  return snapshot.docs[0];

}
module.exports = {storeData, getPredictionByDate};