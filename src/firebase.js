import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import * as apis from "./CONSTANT_API";

const firebaseConfig = {
  apiKey: apis.API_KEY,
  authDomain: apis.AUTH_DOMAIN,
  projectId: apis.PROJECT_ID,
  storageBucket: apis.STORAGE_BUCKET,
  messagingSenderId: apis.MESSAGING_SENDER_ID,
  appId: apis.APP_ID,
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
export { db };
