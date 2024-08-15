import { createBrowserRouter } from "react-router-dom";
import Home from "../Home/Home";
import Root from "../Root/Root";
import Register from "../Authentication/Register";

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
            }
        ]
    },
]);
export default router;