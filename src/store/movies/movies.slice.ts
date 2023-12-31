import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Genre, Movie } from '../../types';
import { MOVIES_BY_PAGE } from '../../constants.ts';
import { changeMovieFavoriteStatusAction, fetchAllMoviesAction } from '../api-actions/api-actions.ts';
import { getMoviesGenres } from '../../utils/get-movies-genres/get-movies-genres.ts';

export interface MoviesSliceState {
  genres: Genre[];
  selectedGenre: Genre;
  allMovies: Movie[];
  movies: Movie[];
  totalMovies: number;
  loadedMovies: number;
  isLoading: boolean;
  favoriteMovies: Movie[] | null;
}

const initialState: MoviesSliceState = {
  genres: [],
  selectedGenre: {id: -1, title: 'All genres'},
  allMovies: [],
  movies: [],
  totalMovies: 0,
  loadedMovies: 0,
  isLoading: true,
  favoriteMovies: null
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    changeGenre: (state, action: PayloadAction<Genre>) => {
      state.selectedGenre = action.payload;
    },
    getMovies: (state) => {
      state.movies = state.selectedGenre.title === 'All genres' ? state.allMovies : state.allMovies.filter((movie) => movie.genre === state.selectedGenre.title);
      state.totalMovies = state.movies.length;
      state.loadedMovies = Math.min(state.totalMovies, MOVIES_BY_PAGE);
    },
    showMoreMovies: (state) => {
      state.loadedMovies += MOVIES_BY_PAGE;
    },
    setAllMovies: (state, action: PayloadAction<Movie[]>) => {
      state.allMovies = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setFavoriteMovies: (state, action: PayloadAction<Movie[]>) => {
      state.favoriteMovies = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMoviesAction.fulfilled, (state, action) => {
        state.genres = getMoviesGenres(action.payload);
      })
      .addCase(changeMovieFavoriteStatusAction.fulfilled, (state, action) => {
        if (!state.favoriteMovies) {
          state.favoriteMovies = [];
        }

        if (action.payload.status) {
          state.favoriteMovies.push(action.payload.movie);
        } else {
          state.favoriteMovies = state.favoriteMovies.filter((favoriteMovie) => favoriteMovie.id !== action.payload.movie.id);
        }
      });
  }
});

export const {setAllMovies, setFavoriteMovies, getMovies, showMoreMovies, setLoading, changeGenre} = moviesSlice.actions;
