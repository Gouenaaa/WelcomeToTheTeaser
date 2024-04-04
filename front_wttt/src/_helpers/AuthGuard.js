import { Navigate } from "react-router-dom"
import { accountService } from "../sevices/account.service"

export function AuthGuard ({children}) {
    if(!accountService.isLogged()){
        return <Navigate to={'/login'} />
    }
    return children
}

