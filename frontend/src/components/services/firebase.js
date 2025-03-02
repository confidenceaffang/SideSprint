
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyANFWtQbXGX9XFwbbRGs3DY1flas7VsaHU",
  authDomain: "sidesprint-1cd84.firebaseapp.com",
  projectId: "sidesprint-1cd84",
  storageBucket: "sidesprint-1cd84.firebasestorage.app",
  messagingSenderId: "1055720977856",
  appId: "1:1055720977856:web:0bc97e183d5bc6e64bc425",
  measurementId: "G-GB7SZQYX61"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth} ;