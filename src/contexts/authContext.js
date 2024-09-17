import React, { createContext, useContext, useState } from 'react';
import {getAuth, signOut  , createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase/Firebase';


const MyContext = createContext();

const UserAuthContextProvider = ({ children }) => {

  const auth = getAuth(app);

const [signActive, setSignActive] = useState(true);

  // Function to sign out the user
  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out successfully');
      })
      .catch((error) => {
        console.error('Error signing out:', error.message);
      });
  };
   // Function to sign In the user
  const userSignIn = (email, password) => {
    if (signActive) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            console.log("User created successfully:", userCredential.user);
            
          })
          .catch((error) => {
            console.error("Error creating user:", error.message);
            if (error.code === "auth/email-already-in-use") {
              alert("Email is already in use. Please Log in instead.");
            } else {
              alert("Error creating user:", error.message);
            }
          });
      } else {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            console.log("User logged in successfully:", userCredential.user);
          })
          .catch((error) => {
            console.error("Error logging in:", error.message);
            alert("Error logging in:", error.message);
          });
      }
  }
//   Toggling the sign In and Log In 
  const toggleSignIn = () => {
    setSignActive(!signActive)
  }
   // Function to handle the google sign in

const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("User signed in with Google:", result.user);
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error.message);
      });
}
  // Pass state variable and function as values to the provider's value prop
  return (
    <MyContext.Provider value={{ userSignOut, userSignIn,signActive, toggleSignIn, googleSignIn }}>
      {children}
    </MyContext.Provider>
  );
};

// Custom hook to access the context values
const useAuthContext = () => useContext(MyContext);

export { UserAuthContextProvider, useAuthContext };
