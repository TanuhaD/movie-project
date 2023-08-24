import { Route, Routes } from "react-router-dom";
import "./App.css";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import Home from "./pages/Home/Home";

import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import firebase from "./fireBaseConfig.js";
import Queue from "./pages/Queue/Queue";
import Watched from "./pages/Watched/Watched";
import { saveUserData } from "./redux/users/userSlice";
import { writeLibraryFromFirestore } from "./redux/moviesSlice";

function App() {
  const dispatch = useDispatch();

  if (firebase.auth) {
    onAuthStateChanged(firebase.auth, (user) => {
      if (user) {
        dispatch(
          saveUserData({
            name: user.displayName,
            email: user.email,
            token: user.accessToken,
            uid: user.uid,
          })
        );
        if (firebase.db) {
          getDocs(collection(firebase.db, "usersLibs", user.uid, "queue"))
            .then((querySnapshot) => {
              let queue = [];
              querySnapshot.forEach((doc) => {
                queue.push({ docId: doc.id, movieId: doc.data().movieId });
              });
              dispatch(writeLibraryFromFirestore({ queue }));
            })
            .catch((error) => {
              console.log("error", error);
            });
          getDocs(collection(firebase.db, "usersLibs", user.uid, "watched"))
            .then((querySnapshot) => {
              let watched = [];
              querySnapshot.forEach((doc) => {
                watched.push({ docId: doc.id, movieId: doc.data().movieId });
              });
              dispatch(writeLibraryFromFirestore({ watched }));
            })
            .catch((error) => {
              console.log("error", error);
            });
        }
      } else {
        dispatch(
          saveUserData({
            name: "",
            email: "",
            token: "",
            uid: "",
          })
        );
      }
    });
  }

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route
          path="library/watched"
          element={<PrivateRoute component={<Watched />} />}
        />
        <Route
          path="library/queue"
          element={<PrivateRoute component={<Queue />} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
