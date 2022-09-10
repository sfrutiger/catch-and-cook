const admin = require("firebase-admin");
const projectID = process.env.FB_PROJECT_ID;
const privateKeyID = process.env.FB_PRIVATE_KEY_ID;
const privateKey = process.env.FB_PRIVATE_KEY;
const clientEmail = process.env.FB_CLIENT_EMAIL;
const clientID = process.env.FB_CLIENT_ID;
const authURI = process.env.FB_AUTH_URI;
const tokenURI = process.env.FB_TOKEN_URI;
const authProvider = process.env.FB_AUTH_PROVIDER_X509_CERT_URL;
const clientCertURL = process.env.FB_CLIENT_X509_CERT_URL;

admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: projectID,
    private_key_id: privateKeyID,
    private_key: privateKey,
    client_email: clientEmail,
    client_id: clientID,
    auth_uri: authURI,
    token_uri: tokenURI,
    auth_provider_x509_cert_url: authProvider,
    client_x509_cert_url: clientCertURL,
  }),
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
