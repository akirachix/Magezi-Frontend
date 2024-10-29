"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IoPersonSharp } from "react-icons/io5";
import { FaEye, FaEyeSlash, FaPhoneAlt } from 'react-icons/fa';
import { RiLockPasswordFill } from "react-icons/ri";
import { setCookie } from 'cookies-next';
import toast, { Toaster } from "react-hot-toast";
import 'react-toastify/dist/ReactToastify.css';

interface UserSignup {
  first_name: string;
  last_name: string;
  phone_number: string;
  password: string;
  confirm_password: string;
  role: string;
}

const schema = yup.object().shape({
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  phone_number: yup.string()
    .matches(/^\+254\d{9}$/, 'Phone number must start with +254 and be 13 characters long')
    .required('Phone number is required'),
  password: yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .matches(/\d/, 'Password must contain a number')
    .matches(/[@$!%*?&#]/, 'Password must contain a special character')
    .required('Password is required'),
  confirm_password: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  role: yup.string().required('Role is required'),
});

const Signup = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<UserSignup>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (data: UserSignup) => {
    setLoading(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setCookie('first_name', data.first_name, { maxAge: 60 * 60 * 24 });
        setCookie('last_name', data.last_name, { maxAge: 60 * 60 * 24 });
        setCookie('phone_number', data.phone_number, { maxAge: 60 * 60 * 24 });
        setCookie('role', data.role, { maxAge: 60 * 60 * 24 });

        toast.success("Account created successfully! Redirecting...");

        const usersResponse = await fetch('/api/users'); 
        if (usersResponse.ok) {
          const users = await usersResponse.json();
          console.log('Fetched users:', users); 
        } else {
          const errorData = await usersResponse.json();
          toast.error(errorData.message || 'Failed to fetch users.');
        }

        router.push("/login");

      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Signup failed. Please try again.');
        console.error('Backend error:', errorData);
      }
    } catch (error) {
      console.error('Sign-up error:', error);
      toast.error('An error occurred during signup. Please check your network connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-jost justify-center relative overflow-hidden">
      <Toaster />
      <div className="absolute top-0 left-0 w-60 h-60 bg-foreground rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-foreground rounded-full translate-x-1/2 translate-y-1/5"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-foreground rounded-full translate-x-1/4 translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-foreground rounded-full translate-x-1/5 translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-foreground rounded-full translate-x-1/9 mr-[9%] translate-y-[80%]"></div>
      <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[50%] xl:w-[40%] 2xl:w-[35%] mx-auto z-10 bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-primary mb-4 sm:mb-6 md:mb-8">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4 md:space-y-6">
          <div>
            <label htmlFor="first_name" className="block text-base sm:text-lg md:text-xl font-medium text-primary mb-1">
              <IoPersonSharp className="inline w-5 h-5 sm:w-6 sm:h-6 mr-2" /> First Name:
            </label>
            <input
              id="first_name"
              {...register('first_name')}
              className={`w-full border text-sm sm:text-base md:text-lg ${errors.first_name ? 'border-border-color' : 'border-foreground'} border-2 rounded-md shadow-sm py-1.5 sm:py-2 px-2 sm:px-3 focus:outline-none focus:ring-1 focus:ring-foreground`}
            />
            {errors.first_name && <p className="mt-1 text-xs text-border-color">{errors.first_name.message}</p>}
          </div>
          <div>
            <label htmlFor="last_name" className="block text-base sm:text-lg md:text-xl font-medium text-primary mb-1">
              <IoPersonSharp className="inline w-5 h-5 sm:w-6 sm:h-6 mr-2" /> Last Name:
            </label>
            <input
              id="last_name"
              {...register('last_name')}
              className={`w-full border text-sm sm:text-base md:text-lg ${errors.last_name ? 'border-border-color' : 'border-foreground'} border-2 rounded-md shadow-sm py-1.5 sm:py-2 px-2 sm:px-3 focus:outline-none focus:ring-1 focus:ring-foreground`}
            />
            {errors.last_name && <p className="mt-1 text-xs text-border-color">{errors.last_name.message}</p>}
          </div>
          <div>
            <label htmlFor="phone_number" className="block text-base sm:text-lg md:text-xl font-medium text-primary mb-1">
              <FaPhoneAlt className="inline w-4 h-4 mr-2" /> Phone Number:
            </label>
            <input
              id="phone_number"
              {...register('phone_number')}
              className="w-full text-sm sm:text-base md:text-lg px-2 sm:px-3 py-1.5 sm:py-2 border-2 border-foreground rounded-md focus:outline-none focus:ring-1 focus:ring-foreground"
              placeholder="+254XXXXXXXX"
            />
            {errors.phone_number && <p className="mt-1 text-xs text-border-color">{errors.phone_number.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="flex items-center text-base sm:text-lg md:text-xl font-medium text-primary mb-1">
              <RiLockPasswordFill className="w-5 h-5 sm:w-6 sm:h-6 mr-2" /> Password:
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register('password')}
                className={`w-full border text-sm sm:text-base md:text-lg ${errors.password ? 'border-border-color' : 'border-foreground'} border-2 rounded-md shadow-sm py-1.5 sm:py-2 px-2 sm:px-3 focus:outline-none focus:ring-1 focus:ring-foreground`}
                placeholder="@Pass123!"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye className="h-4 w-4 sm:h-5 sm:w-5 text-primary" /> : <FaEyeSlash className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-border-color">{errors.password.message}</p>}
          </div>
          <div>
            <label htmlFor="confirm_password" className="flex items-center text-base sm:text-lg md:text-xl font-medium text-primary mb-1">
              <RiLockPasswordFill className="w-5 h-5 sm:w-6 sm:h-6 mr-2" /> Confirm Password:
            </label>
            <div className="relative">
              <input
                id="confirm_password"
                type={showConfirmPassword ? "text" : "password"}
                {...register('confirm_password')}
                className={`w-full border text-sm sm:text-base md:text-lg ${errors.confirm_password ? 'border-border-color' : 'border-foreground'} border-2 rounded-md shadow-sm py-1.5 sm:py-2 px-2 sm:px-3 focus:outline-none focus:ring-1 focus:ring-foreground`}
                placeholder="@Pass123!"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEye className="h-4 w-4 sm:h-5 sm:w-5 text-primary" /> : <FaEyeSlash className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />}
              </button>
            </div>
            {errors.confirm_password && <p className="mt-1 text-xs text-border-color">{errors.confirm_password.message}</p>}
          </div>
          <div>
            <label htmlFor="role" className="block text-base sm:text-lg md:text-xl font-medium text-primary mb-1">
              Role:
            </label>
            <select
              id="role"
              {...register('role')}
              className={`w-full border text-sm sm:text-base md:text-lg ${errors.role ? 'border-border-color' : 'border-foreground'} border-2 rounded-md shadow-sm py-1.5 sm:py-2 px-2 sm:px-3 focus:outline-none focus:ring-1 focus:ring-foreground`}
            >
              <option value="">Select your role</option>
              <option value="buyer">Buyer</option>
              <option value="lawyer">Lawyer</option>
              <option value="seller">Seller</option>
            </select>
            {errors.role && <p className="mt-1 text-xs text-border-color">{errors.role.message}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-primary text-white py-2 sm:py-3 rounded-md font-semibold text-sm sm:text-base hover:bg-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>
        <p className="mt-3 sm:mt-4 text-center text-sm sm:text-base text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-primary font-semibold hover:text-secondary">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;