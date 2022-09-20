import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth,GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import {Link} from 'react-router-dom';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQWYUMUT1z3ocSoAheSHPXABckaQLmYIc",
  authDomain: "to-do-application-fa421.firebaseapp.com",
  projectId: "to-do-application-fa421",
  storageBucket: "to-do-application-fa421.appspot.com",
  messagingSenderId: "245891755707",
  appId: "1:245891755707:web:586783606894d549ed039e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth=getAuth(app);
const provider = new GoogleAuthProvider();
export const signInWithGoogle=()=>{
    signInWithPopup(auth,provider).then((result) => {
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      const userId = result.user.uid;
      localStorage.setItem("userId",userId)
    
    }).catch((error) => {
     
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      
    });
  
}

export { db };
