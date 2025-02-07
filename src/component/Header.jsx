import Input from "./Input"
import {useSelector} from "react-redux"
import {useNavigate} from "react-hook-form"
import Button from "./Button"
import LogOutBtn from "./LogOutBtn"



function Header(){
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

    const navItem = [
        {
            name : Home,
            URL : '/',
            authStatus : true,
        },
        {
          
        }
    ]
    return(
        <div>
            Header
        </div>
    )
}

export default Header