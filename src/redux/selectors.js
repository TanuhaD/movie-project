export const selectPopularMovies = (state) => state.moviesStore.popularMovies;

export const selectModalWindowMovieInfo = (state) =>
  state.moviesStore.modalWindowMovieInfo;

export const selectMoviesQueueToShow = (state) =>
  state.moviesStore.moviesQueueToShow;

export const selectMoviesWatchedToShow = (state) =>
  state.moviesStore.moviesWatchedToShow;

export const selectQueueIds = (state) => state.moviesStore.queueIds;

export const selectWatchedIds = (state) => state.moviesStore.watchedIds;

export const totalSelector = (state) => state.moviesStore.total;
