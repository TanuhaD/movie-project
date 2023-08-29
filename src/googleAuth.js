import { signInWithPopup, signOut } from "firebase/auth";
import firebase from "./fireBaseConfig";

export const onSignIn = () => {
  if (firebase.auth && firebase.provider) {
    signInWithPopup(firebase.auth, firebase.provider)
      .then(() => {})
      .catch((error) => {
        console.log(error.message);
      });
  }
};

export const onSignOut = () => {
  if (firebase.auth && firebase.provider) {
    signOut(firebase.auth)
      .then(() => {})
      .catch((error) => {
        console.log(error.message);
      });
  }
};
