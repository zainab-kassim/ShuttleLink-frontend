'use client';

import { FormEvent, useState } from 'react';
import axios from 'axios';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post('http://localhost:4000/api/auth/signin', {
                email,
                password,
            });
            const { message, userId, role, user_email, firstname } = res.data
            localStorage.setItem('role', role);
            localStorage.setItem('useremail', user_email);
            localStorage.setItem('firstname', firstname);
            localStorage.setItem('userId', userId);
            


            console.log(message)

            // Handle login (e.g., store token, redirect user)
        } catch(error){
            console.log(error)
            
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-4 text-center text-2xl font-semibold">Sign In</h2>
                <form onSubmit={handleSubmit} className="space-y-4 text-black">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            className="mt-1 w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            className="mt-1 w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
