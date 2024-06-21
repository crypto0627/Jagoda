import React, { useState } from 'react';
import { Navbar, Footer } from '../Home/components';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { createUser } from '../../api';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/userSlice';
import axios from 'axios';

export default function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const passwordPattern = /^[0-9a-zA-Z!@#$%^&*()_+[\]{};':"\\|,.<>/?-]+$/;
        if (!passwordPattern.test(password)) {
            setError('Password can only contain 0-9, a-z, A-Z, and special characters.');
            Swal.fire('Error', 'Password can only contain 0-9, a-z, A-Z, and special characters.', 'error');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            Swal.fire('Error', 'Passwords do not match', 'error');
            return;
        }

        setError('');

        try {
            const response = await createUser(email, username, password);
            const { id = '', userName: userUsername, email: userEmail } = response.data;
            dispatch(setUser({ id, username: userUsername, email: userEmail }));
            Swal.fire('Success', 'User registered successfully', 'success');
            navigate('/profile');
        } catch (err: unknown) {
            let errorMessage = 'Error registering user';
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
            console.error('Error registering user:', err);
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
                        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
                        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
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
                                />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                    Confirm Password
                                </label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Sign Up
                                </button>
                                <div className="flex items-center justify-center my-8">
                                    <hr className="border-t border-gray-300 flex-grow mx-4" />
                                    <h2 className="text-2xl font-bold">OR</h2>
                                    <hr className="border-t border-gray-300 flex-grow mx-4" />
                                </div>
                                <Link
                                    to='/signin'
                                    className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Sign In
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
