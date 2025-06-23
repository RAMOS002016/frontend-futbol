import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBu_AC90xhjV9mJwI9lDuykhS_MPoHZqfQ",
  authDomain: "sistemaescuelafutbol.firebaseapp.com",
  projectId: "sistemaescuelafutbol",
  storageBucket: "sistemaescuelafutbol.firebasestorage.app",
  messagingSenderId: "95288739667",
  appId: "1:95288739667:web:81e0c1f4eea236e19583a6",
  measurementId: "G-HJ0J7LQTF7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
