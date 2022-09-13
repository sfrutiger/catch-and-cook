const admin = require("firebase-admin");

const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

function auth(req, res, next) {
  if (req.headers.authtoken) {
    admin
      .auth()
      .verifyIdToken(req.headers.authtoken)
      .then((decodedToken) => {
        const uid = decodedToken.uid;
        res.locals.uid = uid;
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
