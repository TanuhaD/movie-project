import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import css from "./MovieList.module.css";
import { selectPopularMovies, totalSelector } from "../../redux/selectors";
import { useEffect, useState } from "react";
import { getMovies } from "../../redux/operrations";
import Pagination from "../Pagination/Pagination";
const limit = 20;

const MovieList = () => {
  const movies = useSelector(selectPopularMovies);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const total = useSelector(totalSelector);
  useEffect(() => {
    dispatch(getMovies({ page, limit }));
  }, [dispatch, page]);

  return (
    <div className={css.container}>
      <ul className={css.list}>
        {movies.map(({ id, poster_path, release_date, title, genre_ids }) => (
          <Card
            key={id}
            id={id}
            poster_path={poster_path}
            release_date={release_date}
            title={title}
            genre_ids={genre_ids}
          />
        ))}
      </ul>
      <div>
        <Pagination total={total} page={page} setPage={setPage} limit={limit} />
      </div>
    </div>
  );
};

export default MovieList;
