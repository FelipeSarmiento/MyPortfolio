import React from 'react'
import ReactDOM from 'react-dom'
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import 'animate.css';
import './assets/index.css'
import {NavBar} from "./components/NavBar.jsx";
import {IndexPage} from "./Index/IndexPage.jsx";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import {Dashboard} from "@/Dashboard/Dashboard.jsx";

const routers = createBrowserRouter([
    {
        path: "/",
        element: <IndexPage/>,
        errorElement: <div>404</div>
    },
    {
        path: "dashboard",
        element: <Dashboard/>,
        errorElement: <div>404</div>
    },
]);

library.add(fas)

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <NavBar/>
        <RouterProvider router={routers}/>
    </React.StrictMode>,
)
