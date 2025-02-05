import { createAsyncThunk } from '@reduxjs/toolkit';
import service from '../../appwrite/config';   // `service` lowercase me, kyunki tu instance export kar raha hai

export const addMovieToWatchlist = createAsyncThunk(
  'watchlist/addMovie',
  async (movie, thunkAPI) => {
    const response = await service.addToWatchList(movie);  // ✅ Function ko call kiya
    return response;
  }
);

export const removeMovieFromWatchlist = createAsyncThunk(
  'watchlist/removeMovie',
  async (documentId, thunkAPI) => {
    const response = await service.removeToWatchList(documentId);  // ✅ Function call fix
    return response;
  }
);

export const fetchWatchlist = createAsyncThunk(
  'watchlist/fetchWatchlist',
  async (userId, thunkAPI) => {
    const response = await service.getWatchList(userId);  // ✅ Function call fix
    return response;
  }
);
