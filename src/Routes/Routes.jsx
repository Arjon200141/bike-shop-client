import { createBrowserRouter } from "react-router-dom";
import Home from "../Home/Home";
import Root from "../Root/Root";
import Register from "../Authentication/Register";
import LogIn from "../Authentication/LogIn";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children:
        [
            {
                path:"/",
                element:<Home></Home>,
            },
            {
                path:"/register",
                element:<Register></Register>
            },
            {
                path:"/login",
                element:<LogIn></LogIn>
            }
        ]
    },
]);
export default router;