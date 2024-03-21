import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthProvider';
import googleLogo from '../assets/google-logo.svg';
const SignUp = () => {
    const { createUser,loginwithGoogle } = useContext(AuthContext);
    const [error, setError] = useState(null); // Changed initial state to null

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";

    const handleSignUp = async (event) => { // Added async keyword for asynchronous operation
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);
        try { // Added try-catch block for error handling
            const userCredential = await createUser(email, password); // Await for createUser
            const user = userCredential.user;
            alert("Sign up Successfully!");
            navigate(from, { replace: true });
        } catch (error) { // Catch any errors
            const errorMessage = error.message;
            setError(errorMessage); // Set error state
        }
    }
    // signup using google account 
    const handleRegister = () => {
        loginwithGoogle()
            .then((result) => {
                const user = result.user;
                alert("Sign up Successfully!");
                navigate(from, { replace: true });
            })
            .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage); // Set error state
            });
    }
    

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold">Sign up Form</h1>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <form onSubmit={handleSignUp} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="relative">
                                    <input id="email" name="email" type="text" className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600" placeholder="Email address" />
                                </div>
                                <div className="relative">
                                    <input id="password" name="password" type="password" className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600" placeholder="Password" />
                                    <p>If you have an account. please <Link to="/login" className="text-blue-700">Login</Link> Here</p>
                                </div>
                                <div className="relative">
                                <button className="bg-blue-500 text-white rounded-md px-12 py-2">Sign up</button>
                                </div>
                                {error && <div className="text-red-600">{error}</div>} {/* Display error message if error exists */}
                            </form>
                        </div>
                        <div className='flex w-full items-center flex-col mt-5 gap-3'>
                            <button onClick={handleRegister}><img src={googleLogo} alt='' className='w-12 h-12 inline-block'></img>Login with Google</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
