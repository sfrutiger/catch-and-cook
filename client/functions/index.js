const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();

exports.createUserRecord = functions.auth.user().onCreate((user) => {
  const writeUser = admin
    .firestore()
    .collection("users")
    .add({ uid: user.uid, displayName: user.displayName });
});
