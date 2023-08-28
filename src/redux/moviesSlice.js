import { createSlice } from "@reduxjs/toolkit";
import {
  getMovieId,
  getMovies,
  getMoviesListByIdList,
  getSearch,
} from "./operrations";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    popularMovies: [],
    modalWindowMovieInfo: {},
    queueIds: [], //[{docId, movieId}]
    watchedIds: [],
    moviesWatchedToShow: [],
    moviesQueueToShow: [],
    moviesInfo: [],
    total: 20,
  },
  reducers: {
    removeMovieFromLibrary: (state, { payload: { isQueue, id } }) => {
      if (isQueue) {
        state.queueIds = state.queueIds.filter((movie) => {
          return movie.movieId !== id;
        });
      } else {
        state.watchedIds = state.watchedIds.filter((movie) => {
          return movie.movieId !== id;
        });
      }
    },
    addMovieToLibrary: (state, { payload: { isQueue, id, docId } }) => {
      if (isQueue) {
        state.queueIds.push({ docId, movieId: id });
      } else {
        state.watchedIds.push({ docId, movieId: id });
      }
    },
    writeLibraryFromFirestore: (state, { payload: { queue, watched } }) => {
      if (queue) {
        state.queueIds = queue;
      }
      if (watched) {
        state.watchedIds = watched;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.fulfilled, (state, action) => {
        state.popularMovies = action.payload.results;
        state.total = action.payload.total_results;
      })
      .addCase(getMovies.rejected, (state, action) => {})
      .addCase(getSearch.fulfilled, (state, action) => {
        state.popularMovies = action.payload;
      })
      .addCase(getSearch.rejected, (state, action) => {})

      .addCase(getMovieId.fulfilled, (state, action) => {
        const isMovieInStore = state.moviesInfo.find((movie) => {
          return movie.id === action.payload.id;
        });
        if (!isMovieInStore) {
          state.moviesInfo.push(action.payload);
        }
        state.modalWindowMovieInfo = action.payload;
      })
      .addCase(getMovieId.rejected, (state, action) => {})

      .addCase(getMoviesListByIdList.fulfilled, (state, action) => {
        state.moviesInfo = [
          ...state.moviesInfo,
          ...action.payload.fetchedMovies,
        ];

        const list = [];
        action.payload.ids.forEach((id) => {
          let movie = action.payload.moviesFromState.find((movie) => {
            return movie.id === id;
          });
          if (!movie) {
            movie = action.payload.fetchedMovies.find((movie) => {
              return movie.id === id;
            });
          }
          list.push(movie);
        });
        if (action.payload.isQueue) {
          state.moviesQueueToShow = list;
        } else {
          state.moviesWatchedToShow = list;
        }
      });
  },
});
export const {
  removeMovieFromLibrary,
  addMovieToLibrary,
  writeLibraryFromFirestore,
} = moviesSlice.actions;

export const moviesReducer = moviesSlice.reducer;
