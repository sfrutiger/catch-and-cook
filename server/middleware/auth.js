const admin = require("firebase-admin");
const serviceAccount = require("../secrets/serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

function auth(req, res, next) {
  if (req.headers.authtoken) {
    admin
      .auth()
      .verifyIdToken(req.headers.authtoken)
      .then(() => {
        next();
      })
      .catch(() => {
        res.status(403).send("Unauthorized: invalid token");
      });
  } else {
    res.status(403).send("Unauthorized: no token");
  }
}

module.exports = auth;
