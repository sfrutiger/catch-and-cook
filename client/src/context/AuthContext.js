import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const createUser = (email, password, username) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(function () {
        return updateProfile(auth.currentUser, {
          displayName: username,
        });
      })
      .then(function () {
        return sendEmailVerification(auth.currentUser);
      })
      .then(function () {
        auth.currentUser.getIdToken(true).then(function (idToken) {
          // this is not getting the token for some reason **8/7/22 I don't know what this comment means
          axios.post(
            "/api/users",
            {
              uid: auth.currentUser.uid,
              email: auth.currentUser.email,
              displayName: auth.currentUser.displayName,
            },
            {
              headers: {
                authtoken: idToken,
              },
            }
          );
        });
      })
      .catch(function (error) {
        return error;
      });
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password).catch(function (
      error
    ) {
      return error;
    });
  };

  // google sign in causing issue with user names, will re-implement later
  /*  const googleSignIn = (provider) => {
    return signInWithPopup(auth, provider);
  }; */

  // cannot get this to work in context
  /* const logOut = () => {
    return signOut(auth);
  }; */

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
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
        /* googleSignIn, */
        /* provider, */
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
