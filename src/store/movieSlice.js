import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { fetchMoviesFromApi } from "../MovieApi/movies"

export const fetchMovies = createAsyncThunk('movies/fetchmovies',async() =>{
    const response = await fetchMoviesFromApi()
    return response
})

const movieSlice = createSlice({
    name: "movies",
    initialState : {
        movies : [],
        loading : false,
        error : null,
    },

    extraReducers : (builder) => {
        builder
         .addCase(fetchMovies.pending,(state) =>{
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchMovies.fulfilled,(state,action) =>{
            state.loading = false;
            state.movies = action.payload;
         })
         .addCase(fetchMovies.rejected,(state,action) =>{
            state.loading = false;
            state.error = action.error.message
         })
    }
})


export default movieSlice.reducer