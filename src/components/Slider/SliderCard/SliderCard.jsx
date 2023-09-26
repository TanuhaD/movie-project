import { useState } from "react";
import ModalWindow from "../../ModalWindow/ModalWindow";
import PropTypes from "prop-types";
import css from "./SliderCard.module.css";
import backdropImage from "../../../assets/imageDefault.jpg";

const SliderCard = ({ id, poster_path, genre_ids }) => {
  const [openModal, setOpenModal] = useState(false);

  const openModalWindow = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <>
      <li
        key={id}
        id={id}
        className="glide__slide item"
        onClick={() => openModalWindow({ id, genre_ids })}
      >
        <img
          className={css.image}
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : backdropImage
          }
          alt=" movie"
        />
      </li>
      {openModal && (
        <ModalWindow
          id={id}
          genre_ids={genre_ids}
          handleCloseModal={handleCloseModal}
          openModalWindow={openModalWindow}
        />
      )}
    </>
  );
};
SliderCard.propTypes = {
  poster_path: PropTypes.string,
  genre_ids: PropTypes.array,
  id: PropTypes.number,
};

export default SliderCard;
