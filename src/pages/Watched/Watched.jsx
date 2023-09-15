import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card/Card";
import { getMoviesListByIdList } from "../../redux/operrations";
import css from "./Watched.module.css";
import { useEffect, useState } from "react";
import {
  selectMoviesWatchedToShow,
  selectWatchedIds,
} from "../../redux/selectors";
import Pagination from "../../components/Pagination/Pagination";
import useMediaQuery from "../../hooks/useMediaQuery";

const Watched = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(4);
  const watched = useSelector(selectWatchedIds);
  const movieWatched = useSelector(selectMoviesWatchedToShow);
  const isMobile = useMediaQuery("(max-width:767px)");
  const isTablet = useMediaQuery("(min-width:768px)");
  const isDesktop = useMediaQuery("(min-width:1280px)");
  useEffect(() => {
    if (isMobile) {
      setLimit(4);
    }
    if (isTablet) {
      setLimit(8);
    }
    if (isDesktop) {
      setLimit(9);
    }
  }, [isDesktop, isMobile, isTablet]);
  useEffect(() => {
    const ids = watched.map((movieInfo) => {
      return movieInfo.movieId;
    });
    setTotal(ids.length);
    const startIndex = (page - 1) * limit;
    const idsToFetch = ids.slice(startIndex, startIndex + limit);
    dispatch(getMoviesListByIdList({ ids: idsToFetch }));
  }, [dispatch, page, limit, watched]);
  return (
    <div className={css.container}>
      <ul className={css.list}>
        {movieWatched.map(
          ({ id, poster_path, release_date, title, genres }) => (
            <Card
              key={id}
              id={id}
              poster_path={poster_path}
              release_date={release_date}
              title={title}
              genre_ids={genres.map(({ id }) => id)}
            />
          )
        )}
      </ul>
      <Pagination page={page} total={total} setPage={setPage} limit={limit} />
    </div>
  );
};

export default Watched;
