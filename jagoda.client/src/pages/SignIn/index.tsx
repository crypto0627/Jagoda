import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/userSlice';
import { Navbar, Footer } from '../Home/components';
import { loginUser } from '../../api';
import axios from 'axios';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await loginUser(email, password);
            const { userId, userEmail, userUserName } = response.data;
            dispatch(setUser({ id: userId, username: userUserName, email: userEmail }));
            Swal.fire({
                title: 'Success',
                text: 'Login successful',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/profile');
            });
        } catch (err: unknown) {
            let errorMessage = 'Error logging in';
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    errorMessage = err.response.data;
                } else if (err.request) {
                    errorMessage = 'No response received from server';
                } else {
                    errorMessage = err.message;
                }
            } else if (err instanceof Error) {
                errorMessage = err.message;
            } else if (typeof err === 'string') {
                errorMessage = err;
            }
            console.error('Error logging in:', err);
            setError(errorMessage);
            Swal.fire('Error', errorMessage, 'error');
        }
    };

    return (
        <>
            <Navbar />
            <div className="relative w-full min-h-screen overflow-hidden -z-0">
                <video autoPlay loop muted className="w-full h-full absolute object-cover">
                    <source src="/beachVid.mp4" type="video/mp4" />
                </video>
                <div className="flex items-center justify-center min-h-screen relative z-10">
                    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg bg-opacity-20">
                        <h2 className="text-2xl font-bold text-center">Sign In</h2>
                        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    autoComplete="current-email"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    autoComplete="current-password"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="rememberMe"
                                        name="rememberMe"
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                    />
                                    <label htmlFor="rememberMe" className="block ml-2 text-sm text-gray-900">
                                        Remember me
                                    </label>
                                </div>
                                <div className="text-sm">
                                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Sign in
                                </button>
                            </div>
                            <a className='flex justify-end' href='/signup'>Don't have an account? Sign up</a>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
