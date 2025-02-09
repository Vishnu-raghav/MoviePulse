import { createAsyncThunk } from "@reduxjs/toolkit";
import service from "../../appwrite/config"; 

export const fetchWatchlist = createAsyncThunk(
  "watchlist/fetchWatchlist",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await service.getWatchList(userId);

      if (!response || !response.documents || response.documents.length === 0) {
        return rejectWithValue("No documents found");
      }

      return response.documents; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addMovieToWatchlist = createAsyncThunk(
  "watchlist/addMovie",
  async ({ movieId , title, poster, userId }, { rejectWithValue }) => {
    try {
      const response = await service.addToWatchList({ movieId: String(movieId), title, poster : poster, userId });
      return response; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeMovieFromWatchlist = createAsyncThunk(
  "watchlist/removeMovie",
  async (documentId, { rejectWithValue }) => {
    try {
      if (!documentId) {
        return rejectWithValue("Invalid document ID");
      }

      const response = await service.removeFromWatchList(documentId);

      if (response) {
        return documentId;
      } else {
        return rejectWithValue("Failed to remove movie");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);