import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCBYDGWA21NH-8rx0NYvTvzbdEfxULVhLk",
  authDomain: "lista-gastos-dc66d.firebaseapp.com",
  projectId: "lista-gastos-dc66d",
  storageBucket: "lista-gastos-dc66d.firebasestorage.app",
  messagingSenderId: "17768891852",
  appId: "1:17768891852:web:ce5fbe4b18ebc062e94969"
};

const app = initializeApp(firebaseConfig);