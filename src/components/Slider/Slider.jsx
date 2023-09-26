import Glide from "@glidejs/glide";
import clsx from "clsx";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectPopularMovies } from "../../redux/selectors";
import css from "./Slider.module.css";
import SliderCard from "./SliderCard/SliderCard";

let glider;
const Slider = () => {
  const movies = useSelector(selectPopularMovies);

  useEffect(() => {
    if (movies.length) {
      glider = new Glide(".glide", {
        gap: 10,
        type: "carousel",
        startAt: 0,
        perView: 10,
        autoplay: 2000,
        peek: { before: 50, after: 50 },
        breakpoints: {
          2000: {
            perView: 10,
          },
          1600: {
            perView: 8,
          },
          1280: {
            perView: 7,
          },
          1023: {
            perView: 5,
          },
          500: {
            perView: 2,
          },
        },
      }).mount();
    }
    return () => {
      if (glider) {
        glider.destroy();
      }
    };
  }, [movies]);

  return (
    <div className="glide container">
      <div className="glide__arrows" data-glide-el="controls">
        <button className="glide__arrow glide__arrow--left" data-glide-dir="<">
          &#5130;
        </button>
        <button className="glide__arrow glide__arrow--right" data-glide-dir=">">
          &#5125;
        </button>
      </div>
      <div className="glide__track" data-glide-el="track">
        <ul className={clsx(css.list, "glide__slides list")}>
          {movies.map(({ id, poster_path, genre_ids }) => {
            return (
              <SliderCard
                key={id}
                id={id}
                poster_path={poster_path}
                genre_ids={genre_ids}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Slider;
