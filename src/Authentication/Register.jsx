import { useContext, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEyeSlash, FaEye } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProviders";

const Register = () => {

    const { createUser, updateUserProfile } = useContext(AuthContext);
    const [registerError, setRegisterError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const email = form.get('email');
        const password = form.get('password');
        try {
            const result = await createUser(email, password);
            toast.success("Registration successful!");

            await updateUserProfile(result.user, { displayName: name });
            console.log("Profile updated successfully!");
        }
        catch (error) {
            console.error("Error during registration:", error);
            setRegisterError(error.message);
            toast.error(error.message);
        }
    };

    return (
        <div className="w-full bg-amber-50 min-h-screen">
            <ToastContainer />
            <div className="hero-content ">
                <div className="card shrink-0 bg-amber-100 w-full max-w-xl shadow-xl">
                    <h2 className="text-3xl text-center font-bold mt-6">Register Now</h2>
                    <form onSubmit={handleRegister} className="card-body ">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" placeholder="Your Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="Your Email" className="input input-bordered" required />
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-orange-300 px-6">Register</button>
                        </div>
                    </form>
                    <p className="text-xl font-semibold text-center mb-6">Already Have an Account? <Link to="/login" className="text-red-500">Log In</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;
