import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY ,
  authDomain: "aiinterview-b1353.firebaseapp.com",
  projectId: "aiinterview-b1353",
  storageBucket: "aiinterview-b1353.firebasestorage.app",
  messagingSenderId: "153351047780",
  appId: "1:153351047780:web:0f33823500dcd78ed76d71"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export { auth , provider }