// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
let firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_DEVELOPMENT_API_KEY,
  authDomain: process.env.REACT_APP_FIREBAS_DEVELOPMENT_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_DEVELOPMENT_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_DEVELOPMENT_STORAGEBUCKET,
  messagingSenderId:
    process.env.REACT_APP_FIREBASE_DEVELOPMENT_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_DEVELOPMENT_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_DEVELOPMENT_MEASUREMENTID,
};
const environment = process.env.NODE_ENV;

/* if (environment === "development") {
  firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_DEVELOPMENT_API_KEY,
    authDomain: process.env.REACT_APP_FIREBAS_DEVELOPMENT_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_DEVELOPMENT_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_DEVELOPMENT_STORAGEBUCKET,
    messagingSenderId:
      process.env.REACT_APP_FIREBASE_DEVELOPMENT_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_DEVELOPMENT_APPID,
    measurementId: process.env.REACT_APP_FIREBASE_DEVELOPMENT_MEASUREMENTID,
  };
} else if (environment === "production") {
  firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_PRODUCTION_API_KEY,
    authDomain: process.env.REACT_APP_FIREBAS_PRODUCTION_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PRODUCTION_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_PRODUCTION_STORAGEBUCKET,
    messagingSenderId:
      process.env.REACT_APP_FIREBASE_PRODUCTION_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_PRODUCTION_APPID,
    measurementId: process.env.REACT_APP_FIREBASE_PRODUCTION_MEASUREMENTID,
  };
} else {
  console.log("environment not set");
} */

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export default app;
