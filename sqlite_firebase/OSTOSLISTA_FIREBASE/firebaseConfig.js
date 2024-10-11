// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBU6j62r96Z74LRwqpRK2zT-m6a-jqkUw",
  authDomain: "ostoslistawithfirebase.firebaseapp.com",
  databaseURL: "https://ostoslistawithfirebase-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ostoslistawithfirebase",
  storageBucket: "ostoslistawithfirebase.appspot.com",
  messagingSenderId: "392828937726",
  appId: "1:392828937726:web:c42d3cab67ee3fe88b4caf",
  measurementId: "G-TCXS71174J"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);