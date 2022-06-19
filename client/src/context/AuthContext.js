import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  /* signOut, */
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";

const UserContext = createContext();
const provider = new GoogleAuthProvider();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const createUser = (email, password, username) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(function () {
        return updateProfile(auth.currentUser, {
          displayName: username,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = (provider) => {
    return signInWithPopup(auth, provider);
  };

  // cannot get this to work in context
  /* const logOut = () => {
    return signOut(auth);
  }; */

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      /* console.log(currentUser); */
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        createUser,
        googleSignIn,
        provider,
        user,
        /* logOut, */ signIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
