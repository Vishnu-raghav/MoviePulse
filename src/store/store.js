import {configureStore} from "@reduxjs/toolkit"
import watchlistReducer from './watchList/watchlistSlice';
import moviesReducer from './moviesSlice';
import authSlice from './authSlice'

const store = configureStore({
    reducer : {
        movies: moviesReducer, 
        watchlist: watchlistReducer, 
        auth : authSlice,
    }
})


export default store