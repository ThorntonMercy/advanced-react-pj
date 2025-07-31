import { initializeApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from 'firebase/firestore';


const firebaseConfig = {
apiKey: "AIzaSyC0nDczLmDLymOsw6FNkSVNdudqaTjkhBo",
authDomain: "fir-ecommerce-c420e.firebaseapp.com",
projectId: "fir-ecommerce-c420e",
storageBucket: "fir-ecommerce-c420e.firebasestorage.app",
messagingSenderId: "152758365233",
appId: "1:152758365233:web:b079f0051eec9d877e7910",
measurementId: "G-9WMEYMFMTM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

export { auth, db }; 