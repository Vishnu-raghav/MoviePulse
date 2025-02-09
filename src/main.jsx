import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import MoviePage from './pages/MoviePage.jsx'
import SearchResults from './pages/SearchResult.jsx'
import WatchList from './pages/WatchListPage.jsx'

const router = createBrowserRouter([
  {
    path : "/",
    element : <App/>,
    children:[
      {
        path : "/",
        element : <Home/>
      },
      {
        path : "/movie/:slug",
        element : <MoviePage/>
      },
      {
        path : "/search/:query",
        element : <SearchResults/>
      },
      {
        path : 'watchlist',
        element : <WatchList/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)


