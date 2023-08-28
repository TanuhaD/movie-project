import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const api_key = "5a2419fd63850feafab2665d44923974";
axios.defaults.baseURL = "https://api.themoviedb.org/3/";

export const getMovies = createAsyncThunk(
  "movies/get",
  async ({ page = 1, limit = 20 }, thunkAPI) => {
    try {
      const { data } = await axios.get("trending/movie/week", {
        params: { api_key, page, limit },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getSearch = createAsyncThunk(
  "search/movie",
  async (query, thunkAPI) => {
    try {
      const { data } = await axios.get("search/movie", {
        params: { api_key, query },
      });
      return data.results;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getMovieId = createAsyncThunk("movie/id", async (id, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const movieFromState = state.moviesStore.moviesInfo.find((movie) => {
      return movie.id === id;
    });
    if (movieFromState) {
      return movieFromState;
    }
    const { data } = await axios.get(`movie/${id}`, {
      params: { api_key },
    });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
export const getMoviesListByIdList = createAsyncThunk(
  "movies/ids",
  async ({ ids, isQueue }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const idsToFetch = [];
      const moviesFromState = [];
      ids.forEach((id) => {
        const movie = state.moviesStore.moviesInfo.find((movie) => {
          return movie.id === id;
        });
        if (movie) {
          moviesFromState.push(movie);
        } else {
          idsToFetch.push(id);
        }
      });
      const requestsPromisesArray = idsToFetch.map(async (id) => {
        return axios.get(`movie/${id}`, {
          params: { api_key },
        });
      });

      const results = await Promise.all(requestsPromisesArray);

      const fetchedMovies = results.map((res) => {
        return res.data;
      });
      return { moviesFromState, fetchedMovies, ids, isQueue };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const getMoviesInfo =()
