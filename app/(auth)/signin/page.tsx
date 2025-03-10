'use client';

import { FormEvent, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import icon1 from '../../../public/suttle link icon.jpg'
import Image from 'next/image';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post('https://shuttlelink-backend.onrender.com/api/auth/signin', {
                email,
                password,
            }, {
                withCredentials: true // 🔥 Allows sending & receiving cookies
            });
            const {  userId, role, user_email, firstname } = res.data
            localStorage.setItem('role', role);
            localStorage.setItem('email', user_email);
            localStorage.setItem('firstname', firstname);
            localStorage.setItem('userId', userId);

            if (role === 'driver') {
                router.push('/role/driver')
            } else {
                router.push('/role/passenger/bookride')
            }

            console.log(res.data.message)

            // Handle login (e.g., store token, redirect user)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    return (
        <>

            <div className="flex items-center justify-center bg-white min-h-screen">
                <div className="w-full max-w-md p-6">
                        <Image className='rounded-full justify-self-center h-[100px] w-[100px] mb-2' alt='icon' src={icon1} height={100} width={100}/>
                    <h2 className="mb-1 text-center text-black font-light text-xl">WELCOME TO <span className='text-black font-bold'>SHUTTLE LINK</span></h2>
                    <h5 className='mb-14 font-medium text-sm text-center text-gray-400'>sign in to continue your journey</h5>
                    <form onSubmit={handleSubmit} className="space-y-4 text-black">
                        <div>
                            <input
                                type="email"
                                className="mb-3 pl-6 w-full rounded-full bg-slate-50  p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder='Email'
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                className="w-full pl-6 mb-2 rounded-full p-4 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder='password'
                            />
                            <h5 className='mb-4 font-medium text-sm text-right text-blue-700 hover:underline'>forgot password ?</h5>
                        </div>
                        <button
                            type="submit"
                            className="w-full font-medium rounded-full bg-blue-600 p-4 text-white hover:bg-blue-700"
                            disabled={loading}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignIn;
