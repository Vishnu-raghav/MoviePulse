import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'

const router = createBrowserRouter([
  {
    path : "/",
    element : <App/>,
    children:[
      {
        path : "/",
        element : <Home/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      {/* Wrap RouterProvider around the app */}
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)


