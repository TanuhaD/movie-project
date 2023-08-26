import { useState } from "react";
import { genresList } from "../genresList";
import css from "./Card.module.css";
import PropTypes from "prop-types";
import ModalWindow from "../ModalWindow/ModalWindow";
import clsx from "clsx";
import bakcdropImage from "../../assets/imageDefault.jpg";
const Card = ({ poster_path, release_date, title, genre_ids, id }) => {
  const [openModal, setOpenModal] = useState(false);

  const openModalWindow = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const limintGenres = (genre_ids) => {
    const NUMBER_OF_GENRES_ON_CARD = 3;
    if (genre_ids.length <= NUMBER_OF_GENRES_ON_CARD) {
      return genre_ids.map((element) => genresList[element]).join(", ");
    } else {
      return genre_ids
        .slice(0, NUMBER_OF_GENRES_ON_CARD)
        .map((element) => genresList[element])
        .join(", ");
    }
  };
  const limitWordTitle = (title) => {
    return title.length > 100 ? title.slice(0, 100).trim() + "..." : title;
  };
  return (
    <>
      <li className={css.item} onClick={openModalWindow}>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : bakcdropImage
          }
          alt="movie"
          className={css.image}
        />
        <h2 className={css.title}>{limitWordTitle(title)}</h2>
        <div className={css.wrapper}>
          <p className={clsx(css.text, css.genres)}>
            {limintGenres(genre_ids)}
          </p>
          <p className={clsx(css.text, css.date)}>
            | {release_date.slice(0, 4)}
          </p>
        </div>
      </li>
      {openModal && (
        <ModalWindow
          handleCloseModal={handleCloseModal}
          openModalWindow={openModalWindow}
          id={id}
          genre_ids={genre_ids}
          openModal={openModal}
        />
      )}
    </>
  );
};
Card.propTypes = {
  poster_path: PropTypes.string,
  release_date: PropTypes.string,
  title: PropTypes.string,
  genre_ids: PropTypes.array,
  id: PropTypes.number,
};
export default Card;
