import { useState,useEffect } from 'react'
import {useDispatch} from "react-redux"
import authService from './appwrite/auth'
import {login,logout} from "./store/authSlice"
import {Header,Footer} from './component/index'
import {Outlet} from "react-router-dom"
function App() {
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
               .then((userData) =>{
                  if(userData){
                    dispatch(login(userData))
                  }else{
                    dispatch(logout())
                  }
               })
               .finally(() => setLoading(false))
               
  },[])
  return !loading ? (
      <div className="flex flex-col min-h-screen">
        <Header/>
        <div className="flex-grow pt-10">
        <Outlet/>
        </div>
        <Footer/>
      </div>
  ) : null
}

export default App
