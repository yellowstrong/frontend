import {Navigate} from "react-router-dom";

function RedirectDashboard() {
    return <Navigate to={'/dashboard'}/>
}

export default RedirectDashboard