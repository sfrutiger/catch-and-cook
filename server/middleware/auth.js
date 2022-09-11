const admin = require("firebase-admin");

let projectID;
let privateKeyID;
let privateKey;
let clientEmail;
let clientID;
let authURI;
let tokenURI;
let authProvider;
let clientCertURL;

if (process.env.NODE_ENV === "development") {
  projectID = process.env.FB_DEVELOPMENT_PROJECT_ID;
  privateKeyID = process.env.FB_DEVELOPMENT_PRIVATE_KEY_ID;
  privateKey = process.env.FB_DEVELOPMENT_PRIVATE_KEY;
  clientEmail = process.env.FB_DEVELOPMENT_CLIENT_EMAIL;
  clientID = process.env.FB_DEVELOPMENT_CLIENT_ID;
  authURI = process.env.FB_DEVELOPMENT_AUTH_URI;
  tokenURI = process.env.FB_DEVELOPMENT_TOKEN_URI;
  authProvider = process.env.FB_DEVELOPMENT_AUTH_PROVIDER_X509_CERT_URL;
  clientCertURL = process.env.FB_DEVELOPMENT_CLIENT_X509_CERT_URL;
} else if (process.env.NODE_ENV === "production") {
  projectID = process.env.FB_PRODUCTION_PROJECT_ID;
  privateKeyID = process.env.FB_PRODUCTION_PRIVATE_KEY_ID;
  privateKey = process.env.FB_PRODUCTION_PRIVATE_KEY;
  clientEmail = process.env.FB_PRODUCTION_CLIENT_EMAIL;
  clientID = process.env.FB_PRODUCTION_CLIENT_ID;
  authURI = process.env.FB_PRODUCTION_AUTH_URI;
  tokenURI = process.env.FB_PRODUCTION_TOKEN_URI;
  authProvider = process.env.FB_PRODUCTION_AUTH_PROVIDER_X509_CERT_URL;
  clientCertURL = process.env.FB_PRODUCTION_CLIENT_X509_CERT_URL;
}

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
