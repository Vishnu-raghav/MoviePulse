import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"
import {logout } from "../store/authSlice"

function LogOutBtn(){
  const dispatch = useDispatch()
  const logOuthandler = () =>{
    authService.logout().then(() =>{
        dispatch(logout())
    })
  }
    return(
      <button
      className="bg-white text-blue-600 px-5 py-2 rounded-full font-semibold shadow-md transition duration-200 hover:bg-blue-700 hover:text-white"
      onClick={logOuthandler}
      >
        Logout
      </button>
    )
}

export default LogOutBtn