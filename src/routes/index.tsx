import {createBrowserRouter} from "react-router-dom";
import Login from "../pages/login";
import Index from "../pages/index";
import Home from "../pages/dashboard";
import Subscribe from "../pages/subscribe";
import Site from "../pages/site";
import NotFound from "../pages/not-found";

const router = createBrowserRouter([
    {
        path: '/login/:next?',
        element: (<Login/>)
    },
    {
        path: '/',
        element: (<Index/>),
    }
])

export default router