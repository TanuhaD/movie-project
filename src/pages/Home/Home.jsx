import MovieList from "../../components/MovieList/MovieList";
import css from "./Home.module.css";

const Home = () => {
  return (
    <div className={css.container}>
      <MovieList />
    </div>
  );
};

export default Home;
