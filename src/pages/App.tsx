import './App.css'
import {Helmet} from "react-helmet";
import {Route, Routes} from "react-router-dom";
import {routes} from "../routes/routes";
import ContextElement from "../routes/contextRouter.tsx";


function App() {


    const renderRoutes = (routes: any, parentPath = '') => {
        return Object.keys(routes).map((path) => {
            const fullPath = `${parentPath}${path === '/' ? '' : path}`;

            if (routes[path].children) {
                return (
                    <Route key={fullPath} path={fullPath}
                           element={<ContextElement name={routes[path].name} children={routes[path].component}/>}>
                        {renderRoutes(routes[path].children, fullPath)}
                    </Route>
                );
            } else {
                return <Route key={fullPath}  path={fullPath}
                              element={<ContextElement name={routes[path].name} children={routes[path].component}/>}/>
            }
        });
    };


    return (
        <div className='h-dvh'>
            <Helmet>
                <title>{import.meta.env.VITE_SITE_TITLE}</title>
                <link rel={'icon'} href={''}/>
            </Helmet>
            <Routes>
                {renderRoutes(routes)}
            </Routes>
        </div>

    )
}

export default App
