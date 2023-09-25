import MovieList from "../../components/MovieList/MovieList";
import Slider from "../../components/Slider/Slider";

import css from "./Home.module.css";

const Home = () => {
  return (
    <div className={css.container}>
      <Slider />
      <MovieList />
    </div>
  );
};

export default Home;
