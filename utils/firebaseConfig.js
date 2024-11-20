import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDnucaffFyhsG5e8ex3MGZiSfdfwjdJhBk",
  authDomain: "examen-react-native---m7-uf1.firebaseapp.com",
  projectId: "examen-react-native---m7-uf1",
  storageBucket: "examen-react-native---m7-uf1.firebasestorage.app",
  messagingSenderId: "10033736103",
  appId: "1:10033736103:web:c3038a3c26fce4b7df2e82",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
