import { createSlice } from '@reduxjs/toolkit';
import { addMovieToWatchlist, removeMovieFromWatchlist, fetchWatchlist } from './watchlistAsync.js';

const initialState = {
  movies: [],     
  status: 'idle', 
  error: null,     
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {},    
  extraReducers: (builder) => {
    builder

      .addCase(fetchWatchlist.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWatchlist.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;  
      })
      .addCase(fetchWatchlist.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(addMovieToWatchlist.fulfilled, (state, action) => {
        state.movies.push(action.payload);  
      })

      .addCase(removeMovieFromWatchlist.fulfilled, (state, action) => {
        state.movies = state.movies.filter((movie) => movie.$id !== action.payload);  
      });
  },
});

export default watchlistSlice.reducer;
