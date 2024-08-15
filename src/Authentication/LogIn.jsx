import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import auth from "../../firebase.config";

const LogIn = () => {


    const location = useLocation();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const googleProvider = new GoogleAuthProvider();


    const handleGoogleLogin = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const loggedInUser = result.user;
                setUser(loggedInUser);
                console.log(loggedInUser);
                toast.success("Login successful!");
                navigate(location?.state ? location.state : "/")

            })
            .catch(error => {
                console.error(error.message);
                toast.error(error.message);
            })
    }
    const handleLogIn = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget)
        const email = form.get('email');
        const password = form.get('password');
        console.log("Email:", email, "Password:", password);

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedmailUser = result.user;
                console.log(loggedmailUser);
                setUser(loggedmailUser);
                toast.success("Login successful!");
                navigate(location?.state ? location.state : "/")
            })
            .catch(error => {
                console.error(error)
                toast.error(error.message);
            })
    }
    return (
        <div className="w-full py-2 bg-sky-100">
            <ToastContainer />
            <div className="hero-content">
                <div className="card shrink-0 w-full max-w-xl shadow-2xl bg-sky-200/35">
                    <h2 className="text-3xl text-center font-semibold mt-3 ">Log in to your account</h2>
                    <form onSubmit={handleLogIn} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input data-aos="fade-right" type="email" name="email" placeholder="Your Email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="Password" className="input input-bordered" />
                        </div>

                        <div className="form-control mt-3">
                            <button className="btn bg-red-300 text-lg font-medium">Log In</button>
                        </div>
                    </form>
                    <div className="divider">OR</div>

                    <div className="mb-2 flex justify-center items-center gap-12">
                        <button onClick={handleGoogleLogin} className="btn h-16 px-6 py-1 "><img src="https://i.ibb.co/PMh8F7x/google-symbol.png" alt="" className="h-10 w-10" /> </button>
                    </div>
                    <p className="text-xl font-semibold text-center mb-6">New Here ? <Link to="/register" className="text-red-500">Register Now</Link></p>
                </div>
            </div>
        </div>
    );
};

export default LogIn;