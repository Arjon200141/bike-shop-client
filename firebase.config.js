// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLlbIHjthD028qzBObjDxwFaaYkBdAd1g",
  authDomain: "motorhub-88792.firebaseapp.com",
  projectId: "motorhub-88792",
  storageBucket: "motorhub-88792.appspot.com",
  messagingSenderId: "155154062173",
  appId: "1:155154062173:web:350c51a2daa79d93c8e6b4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;