import { initializeApp } from "firebase/app";

export const initFirebaseConfig = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyB1navEDRVbBhvYECqL52svOOviWRvpha0",
    authDomain: "educational-social-network-usp.firebaseapp.com",
    projectId: "educational-social-network-usp",
    storageBucket: "educational-social-network-usp.appspot.com",
    messagingSenderId: "305253905431",
    appId: "1:305253905431:web:673f30c7451ef352801852",
    measurementId: "G-LV7JTFQGSM",
  };

  initializeApp(firebaseConfig);
};
