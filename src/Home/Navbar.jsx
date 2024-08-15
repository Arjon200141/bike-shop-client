import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div>
            <div className="navbar bg-base-200 px-6">
                <div className="flex-1">
                    <a className="text-xl"><img src="https://i.ibb.co/PQBVffS/motorcycle-shop-logo-design-template-fc202cd2725fd0f2b441464f3f9ef6c1-screen.jpg" alt="" className="h-14 w-full rounded-full" /></a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1 gap-4">
                        <Link to="/login">
                        <li><a className="text-black bg-sky-200/65 btn text-2xl font-semibold px-4">Log In</a></li>
                        </Link>
                        <Link to="/register">
                            <li><a className="text-black bg-lime-200/65 btn text-2xl font-semibold px-4">Register</a></li>
                        </Link>
                    </ul>
                </div>
            </div>
            <div className="">
                <div className="divider mt-[-6px]"></div>
            </div>
        </div>
    );
};

export default Navbar;