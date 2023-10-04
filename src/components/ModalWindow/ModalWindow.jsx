import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import firebase from "../../fireBaseConfig.js";
import {
  addMovieToLibrary,
  clearModalWindowMovieInfo,
  removeMovieFromLibrary,
} from "../../redux/moviesSlice";
import { getMovieId } from "../../redux/operrations";
import {
  selectModalWindowMovieInfo,
  selectQueueIds,
  selectWatchedIds,
} from "../../redux/selectors";
import {
  userTokenSelector,
  userUidSelector,
} from "../../redux/users/usersSelectors";
import { genresList } from "../genresList";
import CloseBtn from "./CloseBtn/CloseBtn";
import css from "./ModalWindow.module.css";
import { onSignIn } from "../../googleAuth.js";
import backdropImage from "../../assets/imageDefault.jpg";

const modalRoot = document.querySelector("#modalPortal");
const body = document.querySelector("body");

const ModalWindow = ({ handleCloseModal, id, genre_ids }) => {
  const queueId = useSelector(selectQueueIds);
  const userToken = useSelector(userTokenSelector);

  const uid = useSelector(userUidSelector);
  const [isInQueue, setIsInQueue] = useState(
    queueId.some((movieInfo) => {
      return movieInfo.movieId === id;
    })
  );

  const watchedId = useSelector(selectWatchedIds);
  const [isInWatched, setIsInWatched] = useState(
    watchedId.some((movieInfo) => {
      return movieInfo.movieId === id;
    })
  );
  const dispatch = useDispatch();

  useEffect(() => {
    body.classList.add("openModal");
    return () => {
      body.classList.remove("openModal");
    };
  }, []);

  const {
    overview,
    popularity,
    original_title,
    vote_average,
    vote_count,
    poster_path,
    release_date,
  } = useSelector(selectModalWindowMovieInfo);

  useEffect(() => {
    dispatch(getMovieId(id));
    return () => {
      dispatch(clearModalWindowMovieInfo());
    };
  }, [dispatch, id]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };
  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      handleCloseModal();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  const handleClickWatched = () => {
    const index = watchedId.findIndex((movieInfo) => {
      return movieInfo.movieId === id;
    });
    if (index !== -1) {
      deleteDoc(
        doc(firebase.db, "usersLibs", uid, "watched", watchedId[index].docId)
      ).then(() => {
        setIsInWatched(false);
        dispatch(removeMovieFromLibrary({ id }));
      });
    } else {
      addDoc(collection(firebase.db, "usersLibs", uid, "watched"), {
        movieId: id,
      }).then((res) => {
        dispatch(addMovieToLibrary({ id, docId: res.id }));
        setIsInWatched(true);
      });
    }
  };

  const handleClickQueue = () => {
    const index = queueId.findIndex((movieInfo) => {
      return movieInfo.movieId === id;
    });
    if (index !== -1) {
      deleteDoc(
        doc(firebase.db, "usersLibs", uid, "queue", queueId[index].docId)
      ).then(() => {
        setIsInQueue(false);
        dispatch(removeMovieFromLibrary({ isQueue: true, id }));
      });
    } else {
      addDoc(collection(firebase.db, "usersLibs", uid, "queue"), {
        movieId: id,
      }).then((res) => {
        dispatch(addMovieToLibrary({ id, docId: res.id, isQueue: true }));
        setIsInQueue(true);
      });
    }
  };
  return createPortal(
    <div className={css.overlay} onClick={handleOverlayClick}>
      {overview && (
        <div className={css.modal}>
          <CloseBtn className={css.closeBtn} onClick={handleCloseModal} />
          <div className={css.wrraperImg}>
            <img
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                  : backdropImage
              }
              alt=" movie"
              className={css.image}
            />
          </div>
          <div className={css.wrapperInfo}>
            <h2 className={css.title}>{original_title}</h2>
            <div className={css.box}>
              <div className={css.boxText}>
                <p className={css.text}>Vote / Votes</p>
                <p className={css.text}>Popularity</p>
                <p className={css.text}>Original Title</p>
              </div>
              <div className={css.boxInfo}>
                <div className={css.boxVote}>
                  <p className={css.voteAverage}>{vote_average}</p>
                  <span className={css.voteCount}> / {vote_count}</span>
                </div>
                <p className={css.infoText}>{popularity}</p>
                <p className={css.originalTitle}>{original_title}</p>
              </div>
            </div>
            <div className={css.wrapperGenres}>
              <p className={css.textGenres}>genres</p>
              <p className={css.infoGenrse}>
                {genre_ids.map((element) => genresList[element]).join(", ")}
              </p>
            </div>

            <h3 className={css.titleAbout}>About</h3>
            <p className={css.overviewText}>{overview}</p>

            <div className={css.boxBtnLink}>
              <div className={css.wrapperBtn}>
                <button
                  disabled={!userToken}
                  className={css.btn}
                  onClick={handleClickWatched}
                >
                  {isInWatched ? "remove from watched" : "add to watched"}
                </button>

                <button
                  disabled={!userToken}
                  className={css.btn}
                  onClick={handleClickQueue}
                >
                  {isInQueue ? "remove from queue" : "add to queue"}
                </button>
              </div>
              {!userToken && (
                <p className={css.textSingIngWarning}>
                  Please{" "}
                  <button
                    type="submit"
                    className={css.signInBtn}
                    onClick={onSignIn}
                  >
                    Sing in
                  </button>{" "}
                  to add the movie to your library!
                </p>
              )}
              <div className={css.wrapperLink}>
                <a
                  href={`https://www.google.com/search?q=${original_title} ${release_date.slice(
                    0,
                    4
                  )} смотреть онлайн бесплатно`}
                  target="_blank"
                  rel="noreferrer"
                  className={css.link}
                >
                  Watch online
                </a>
                <a
                  href={`https://www.google.com/search?q=${original_title} ${release_date.slice(
                    0,
                    4
                  )} смотреть трейлер youtube`}
                  target="_blank"
                  rel="noreferrer"
                  className={css.link}
                >
                  Watch trailer
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>,
    modalRoot
  );
};

export default ModalWindow;
