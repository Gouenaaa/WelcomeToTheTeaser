import { Navigate } from "react-router-dom"
import { accountService } from "../sevices/account.service"
import jwtDecode from 'jwt-decode'

export  function OffererGuard({children}) {
    if(!accountService.isLogged()){
        return <Navigate to={"/login"}/>
    }else{
        if(!jwtDecode(localStorage.getItem('token')).roles.includes('ROLE_OFFERER') && !jwtDecode(localStorage.getItem('token')).roles.includes('ROLE_ADMIN')){
            return <Navigate to={"/error_405"} />
        }
    }  
    return children
}
