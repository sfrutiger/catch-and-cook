import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
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
          axios.post(
            "/api/users",
            {
              uid: auth.currentUser.uid,
              email: auth.currentUser.email,
              username: auth.currentUser.displayName,
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

  const deleteAccount = (user) => {
    auth.currentUser
      .getIdToken(true)
      .then(function (idToken) {
        axios.delete(`/api/users/${auth.currentUser.uid}`, {
          headers: {
            authtoken: idToken,
          },
        });
        /* axios.delete(`/api/posts/accountdeletion/${auth.currentUser.uid}`, {
          headers: {
            authtoken: idToken,
          },
        });
        axios.delete(`/api/recipes/accountdeletion/${auth.currentUser.uid}`, {
          headers: {
            authtoken: idToken,
          },
        }); */
      })
      //need to figure out how to delete pictures from firebase
      /* .then(function () {
        return deleteUser(user);
      }) */
      .catch((error) => {
        console.log(error);
      });
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password).catch(function (
      error
    ) {
      return error;
    });
  };

  const reauthenticateUser = (user, password) => {
    const credential = EmailAuthProvider.credential(user.email, password);
    return reauthenticateWithCredential(user, credential).catch(function (
      error
    ) {
      return error;
    });
  };

  const changePassword = (user, newPassword) => {
    console.log("try to change password");
    return updatePassword(user, newPassword).catch((error) => {
      console.log(error);
    });
  };

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
        changePassword,
        reauthenticateUser,
        deleteAccount,
        user,
        signIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
