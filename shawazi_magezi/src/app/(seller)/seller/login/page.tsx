"use client"; 

import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from 'next/link';
import { FaEye, FaEyeSlash, FaPhoneAlt } from 'react-icons/fa';
import { RiLockPasswordFill } from "react-icons/ri";
import { loginUser } from "@/app/utils/userLogin";
import { useRouter } from "next/navigation";

import { UserLogin } from "../../../utils/types"; 
import { setCookie, getCookie } from 'cookies-next';
import React from "react";

// Define the validation schema using Yup
const schema = yup.object().shape({
    phone_number: yup.string()
        .matches(/^(?:\+254|254)\d{9}$/, 'Phone number must start with +254 or 254 followed by 9 digits')
        .required('Phone number is required'),

    password: yup.string()
        .min(6, 'Password must be at least 6 characters')
        .matches(/[A-Z]/, 'Password must contain an uppercase letter')
        .matches(/\d/, 'Password must contain a number')
        .matches(/[@$!%*?&#]/, 'Password must contain a special character')
        .required('Password is required'),
});

const Login = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<UserLogin>({
        resolver: yupResolver(schema),
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const storedPhoneNumber = getCookie('userPhone');
        const storedFirstName = getCookie('firstName');
        const storedLastName = getCookie('lastName');
        const storedUserRole = getCookie('userRole'); 

        if (storedPhoneNumber) {
            setValue('phone_number', storedPhoneNumber.toString());
        }

        console.log('Stored User Info:', { storedPhoneNumber, storedFirstName, storedLastName, storedUserRole }); 
    }, [setValue]);

    const onSubmit = async (data: UserLogin) => {
        setLoading(true);
        setError('');

        try {
            const loginResponse = await loginUser(data);
            console.log('Login Response:', loginResponse); 

            if (loginResponse.message?.includes('success')) {
                setCookie('userPhone', data.phone_number, { maxAge: 60 * 60 * 24 });
                setCookie('isLoggedIn', 'true', { maxAge: 60 * 60 * 24 });

                const { first_name, last_name, role, phone_number } = loginResponse.user;

                setCookie('firstName', first_name, { maxAge: 60 * 60 * 24 });
                setCookie('lastName', last_name, { maxAge: 60 * 60 * 24 });
                setCookie('userRole', role, { maxAge: 60 * 60 * 24 }); 
                setCookie('userPhone', phone_number, { maxAge: 60 * 60 * 24 }); 
                console.log('User Info:', { first_name, last_name, role, phone_number }); 

               
                router.push(`/seller/otp-verification?phone_number=${encodeURIComponent(data.phone_number)}`);
            } else {
                setError('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Login error:', error);
            const errorMessage = (error as any)?.response?.data?.message || 'Failed to login. Please try again.'; 
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="min-h-screen bg-white flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-60 h-60 bg-foreground rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-foreground rounded-full translate-x-1/2 translate-y-1/5"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-foreground rounded-full translate-x-1/5 translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-foreground rounded-full translate-x-1/9 mr-[9%] translate-y-[80%]"></div>
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto z-10 bg-white p-6 sm:p-8 rounded-lg">
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-6">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label htmlFor="phone_number" className="block text-lg sm:text-xl font-medium text-primary mb-1">
                            <FaPhoneAlt className="inline w-4 h-4 mr-2" /> Phone Number:
                        </label>
                        <input
                            id="phone_number"
                            {...register('phone_number')}
                            className={`w-full border text-[16px] sm:text-[18px] ${errors.phone_number ? 'border-border-color' : 'border-foreground'} border-2 rounded-md shadow-sm p-2 sm:p-3 focus:outline-none focus:ring-1 focus:ring-foreground`}
                            placeholder="+254XXXXXXXX"
                        />
                        {errors.phone_number && <p className="mt-1 text-xs text-border-color">{errors.phone_number.message}</p>}
                    </div>
                    
                    <div>
                        <label htmlFor="password" className="flex items-center text-lg sm:text-xl font-medium text-primary mb-2">
                            <RiLockPasswordFill className="w-6 h-6 mr-2" /> Password:
                        </label>

                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                {...register('password')}
                                className={`w-full border text-[16px] sm:text-[18px] ${errors.password ? 'border-border-color' : 'border-foreground'} border-2 rounded-md shadow-sm p-2 sm:p-3 focus:outline-none focus:ring-1 focus:ring-foreground`}
                            />

                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash className="h-5 w-5 text-primary" /> : <FaEye className="h-5 w-5 text-primary" />}
                            </button>
                        </div>

                        {errors.password && <p className="mt-1 text-xs text-border-color">{errors.password.message}</p>}
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <Link href="/forgot-password" className="text-medium text-primary hover:underline">
                            Forgot password?
                        </Link>
                    </div>
                    
                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-3 sm:py-4 px-4 rounded-md text-lg sm:text-xl hover:bg-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                        {loading ? "Loading..." : "Log in"}
                    </button>
                    
                    {error && <div className="text-border-color text-center mt-2">{error}</div>}
                </form>
                
                <div className="mt-8 text-center text-lg sm:text-xl">
                    <span className="text-primary">Don&apos;t have an account? </span>
                    <Link href="./register/" className="font-medium text-foreground hover:text-secondary hover:underline">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;