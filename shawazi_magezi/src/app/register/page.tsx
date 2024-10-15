"use client";
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IoPersonSharp } from "react-icons/io5";
import { FaEye, FaEyeSlash, FaPhoneAlt } from 'react-icons/fa';
import { RiLockPasswordFill } from "react-icons/ri";
import { setCookie, getCookie } from 'cookies-next';
import { loginUser } from '../utils/userLogin';
import { UserLogin } from '../utils/types';

// Define user signup interface
interface UserSignup {
  first_name: string;
  last_name: string;
  phone_number: string;
  password: string;
  confirm_password: string;
  role: string;
}

// Define validation schema
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
  const [error, setError] = useState('');
  
  // Use form
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<UserSignup>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  // Check if user is already registered
  useEffect(() => {
    const storedPhoneNumber = getCookie('userPhone');
    const storedFirstName = getCookie('firstName');
    const storedLastName = getCookie('lastName');
    const storedUserRole = getCookie('userRole'); 

    if (storedPhoneNumber) {
        setValue('phone_number', storedPhoneNumber.toString());
    }

    console.log('Stored User Info:', { storedPhoneNumber, storedFirstName, storedLastName, storedUserRole }); // Log for debugging
  }, [setValue]);

  // Submit handler
  const onSubmit: SubmitHandler<UserSignup> = async (data) => {
    setLoading(true);
    setError('');

    try {
        const loginResponse = await loginUser(data);
        console.log('Login Response:', loginResponse); 

        if (loginResponse.message?.includes('success')) {
            // Set cookies with user information
            setCookie('isLoggedIn', 'true', { maxAge: 60 * 60 * 24 });
            setCookie('userPhone', data.phone_number, { maxAge: 60 * 60 * 24 });

            // Extract user details from the response
            const { first_name, last_name, role } = loginResponse.user;

            setCookie('firstName', first_name, { maxAge: 60 * 60 * 24 });
            setCookie('lastName', last_name, { maxAge: 60 * 60 * 24 });
            setCookie('userRole', role, { maxAge: 60 * 60 * 24 }); 

            console.log('User Info:', { first_name, last_name, role }); // Debugging output

            // Redirect to OTP verification page
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

  const redirectToRolePage = (role: string) => {
    switch (role) {
      case 'buyer':
        router.push("/buyer/login");
        break;
      case 'lawyer':
        router.push("/lawyer/login");
        break;
      case 'seller':
        router.push("/seller/login");
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-jost justify-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-60 h-60 bg-foreground rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-foreground rounded-full translate-x-1/2 translate-y-1/5"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-foreground rounded-full translate-x-1/4 translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-foreground rounded-full translate-x-1/5 translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-foreground rounded-full translate-x-1/9 mr-[9%] translate-y-[80%]"></div>
      <div className="w-full md:w-[40%] mx-auto z-10 bg-white p-6 md:p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-6 md:mb-8">Sign Up</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
          <div>
            <label htmlFor="first_name" className="block text-lg md:text-xl font-medium text-primary mb-1">
              <IoPersonSharp className="inline w-6 h-6 mr-2" /> First Name:
            </label>
            <input
              id="first_name"
              {...register('first_name')}
              className={`w-full border text-[16px] md:text-[20px] ${errors.first_name ? 'border-border-color' : 'border-foreground'} border-2 rounded-md shadow-sm p-3 focus:outline-none focus:ring-1 focus:ring-foreground`}
            />
            {errors.first_name && <p className="mt-1 text-xs text-border-color">{errors.first_name.message}</p>}
          </div>
          <div>
            <label htmlFor="last_name" className="block text-lg md:text-xl font-medium text-primary mb-1">
              <IoPersonSharp className="inline w-6 h-6 mr-2" /> Last Name:
            </label>
            <input
              id="last_name"
              {...register('last_name')}
              className={`w-full border text-[16px] md:text-[20px] ${errors.last_name ? 'border-border-color' : 'border-foreground'} border-2 rounded-md shadow-sm p-3 focus:outline-none focus:ring-1 focus:ring-foreground`}
            />
            {errors.last_name && <p className="mt-1 text-xs text-border-color">{errors.last_name.message}</p>}
          </div>
          <div>
            <label htmlFor="phone_number" className="block text-lg md:text-xl font-medium text-primary mb-1">
              <FaPhoneAlt className="inline w-4 h-4 mr-2" /> Phone Number:
            </label>
            <input
              id="phone_number"
              {...register('phone_number')}
              className={`w-full border text-[16px] md:text-[20px] ${errors.phone_number ? 'border-border-color' : 'border-foreground'} border-2 rounded-md shadow-sm p-3 focus:outline-none focus:ring-1 focus:ring-foreground`}
            />
            {errors.phone_number && <p className="mt-1 text-xs text-border-color">{errors.phone_number.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-lg md:text-xl font-medium text-primary mb-1">
              <RiLockPasswordFill className="inline w-6 h-6 mr-2" /> Password:
            </label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              className={`w-full border text-[16px] md:text-[20px] ${errors.password ? 'border-border-color' : 'border-foreground'} border-2 rounded-md shadow-sm p-3 focus:outline-none focus:ring-1 focus:ring-foreground`}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-10">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && <p className="mt-1 text-xs text-border-color">{errors.password.message}</p>}
          </div>
          <div>
            <label htmlFor="confirm_password" className="block text-lg md:text-xl font-medium text-primary mb-1">
              <RiLockPasswordFill className="inline w-6 h-6 mr-2" /> Confirm Password:
            </label>
            <input
              id="confirm_password"
              type={showConfirmPassword ? 'text' : 'password'}
              {...register('confirm_password')}
              className={`w-full border text-[16px] md:text-[20px] ${errors.confirm_password ? 'border-border-color' : 'border-foreground'} border-2 rounded-md shadow-sm p-3 focus:outline-none focus:ring-1 focus:ring-foreground`}
            />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-10">
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.confirm_password && <p className="mt-1 text-xs text-border-color">{errors.confirm_password.message}</p>}
          </div>
          <div>
            <label htmlFor="role" className="block text-lg md:text-xl font-medium text-primary mb-1">Role:</label>
            <select
              id="role"
              {...register('role')}
              className={`w-full border text-[16px] md:text-[20px] ${errors.role ? 'border-border-color' : 'border-foreground'} border-2 rounded-md shadow-sm p-3 focus:outline-none focus:ring-1 focus:ring-foreground`}
            >
              <option value="">Select Role</option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
              <option value="lawyer">Lawyer</option>
            </select>
            {errors.role && <p className="mt-1 text-xs text-border-color">{errors.role.message}</p>}
          </div>
          <button type="submit" disabled={loading} className={`w-full py-3 px-4 rounded-md font-semibold text-white ${loading ? 'bg-gray-400' : 'bg-primary'} hover:bg-secondary focus:outline-none`}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account? <Link href="/login" className="text-primary hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;




















// "use client";
// import React, { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { IoPersonSharp } from "react-icons/io5";
// import { FaEye, FaEyeSlash, FaPhoneAlt } from 'react-icons/fa';
// import { RiLockPasswordFill } from "react-icons/ri";
// import { setCookie } from 'cookies-next';
// interface UserSignup {
//   first_name: string;
//   last_name: string;
//   phone_number: string;
//   password: string;
//   confirm_password: string;
//   role: string;
// }
// const schema = yup.object().shape({
//   first_name: yup.string().required('First name is required'),
//   last_name: yup.string().required('Last name is required'),
//   phone_number: yup.string()
//     .matches(/^\+254\d{9}$/, 'Phone number must start with +254 and be 13 characters long')
//     .required('Phone number is required'),
//   password: yup.string()
//     .min(6, 'Password must be at least 6 characters')
//     .matches(/[A-Z]/, 'Password must contain an uppercase letter')
//     .matches(/\d/, 'Password must contain a number')
//     .matches(/[@$!%*?&#]/, 'Password must contain a special character')
//     .required('Password is required'),
//   confirm_password: yup.string()
//     .oneOf([yup.ref('password')], 'Passwords must match')
//     .required('Confirm password is required'),
//   role: yup.string().required('Role is required'),
// });
// const Signup = () => {
//   const router = useRouter();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const { register, handleSubmit, formState: { errors }, watch } = useForm<UserSignup>({
//     resolver: yupResolver(schema),
//     mode: 'onChange',
//   });

//   const onSubmit = async (data: UserSignup) => {
//     setLoading(true);
//     setErrorMessage('');
//     try {
//       const response = await fetch('/api/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data),
//       });
//       if (response.ok) {
//         const responseData = await response.json();
//         // Set cookies with a 24-hour expiration
//         setCookie('first_name', responseData.first_name, { maxAge: 60 * 60 * 24 });
//         setCookie('last_name', responseData.last_name, { maxAge: 60 * 60 * 24 });
//         setCookie('phone_number', responseData.phone_number, { maxAge: 60 * 60 * 24 });
//         setCookie('user_role', responseData.role, { maxAge: 60 * 60 * 24 });
//         alert("Account created successfully! Redirecting...");
        
//         // Redirect to the appropriate page based on the role
//         redirectToRolePage(data.role);
//       } else {
//         const errorData = await response.json();
//         setErrorMessage(errorData.message || 'Signup failed. Please try again.');
//         console.error('Backend error:', errorData);
//       }
//     } catch (error) {
//       console.error('Sign-up error:', error);
//       setErrorMessage('An error occurred during signup. Please check your network connection and try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const redirectToRolePage = (role: string) => {
//     switch (role) {
//       case 'buyer':
//         router.push("/buyer/login");
//         break;
//       case 'lawyer':
//         router.push("/lawyer/login");
//         break;
//       case 'seller':
//         router.push("/seller/login");
//         break;
//       default:
//         break;
//     }
//   };
//   return (
//     <div className="min-h-screen bg-white flex flex-col font-jost justify-center relative overflow-hidden">
//       <div className="absolute top-0 left-0 w-60 h-60 bg-foreground rounded-full -translate-x-1/2 -translate-y-1/2"></div>
//       <div className="absolute bottom-0 right-0 w-60 h-60 bg-foreground rounded-full translate-x-1/2 translate-y-1/5"></div>
//       <div className="absolute bottom-0 right-0 w-60 h-60 bg-foreground rounded-full translate-x-1/4 translate-y-1/2"></div>
//       <div className="absolute bottom-0 right-0 w-64 h-64 bg-foreground rounded-full translate-x-1/5 translate-y-1/2"></div>
//       <div className="absolute bottom-0 right-0 w-60 h-60 bg-foreground rounded-full translate-x-1/9 mr-[9%] translate-y-[80%]"></div>
//       <div className="w-full md:w-[40%] mx-auto z-10 bg-white p-6 md:p-8 rounded-lg shadow-lg">
//         <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-6 md:mb-8">Sign Up</h2>
//         {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
//           <div>
//             <label htmlFor="first_name" className="block text-lg md:text-xl font-medium text-primary mb-1">
//               <IoPersonSharp className="inline w-6 h-6 mr-2" /> First Name:
//             </label>
//             <input
//               id="first_name"
//               {...register('first_name')}
//               className={`w-full border text-[16px] md:text-[20px] ${errors.first_name ? 'border-border-color' : 'border-foreground'} border-2 rounded-md shadow-sm p-3 focus:outline-none focus:ring-1 focus:ring-foreground`}
//             />
//             {errors.first_name && <p className="mt-1 text-xs text-border-color">{errors.first_name.message}</p>}
//           </div>
//           <div>
//             <label htmlFor="last_name" className="block text-lg md:text-xl font-medium text-primary mb-1">
//               <IoPersonSharp className="inline w-6 h-6 mr-2" /> Last Name:
//             </label>
//             <input
//               id="last_name"
//               {...register('last_name')}
//               className={`w-full border text-[16px] md:text-[20px] ${errors.last_name ? 'border-border-color' : 'border-foreground'} border-2 rounded-md shadow-sm p-3 focus:outline-none focus:ring-1 focus:ring-foreground`}
//             />
//             {errors.last_name && <p className="mt-1 text-xs text-border-color">{errors.last_name.message}</p>}
//           </div>
//           <div>
//             <label htmlFor="phone_number" className="block text-lg md:text-xl font-medium text-primary mb-1">
//               <FaPhoneAlt className="inline w-4 h-4 mr-2" /> Phone Number:
//             </label>
//             <input
//               id="phone_number"
//               {...register('phone_number')}
//               className="w-full text-[16px] md:text-[20px] px-3 py-3 border-2 border-foreground rounded-md focus:outline-none focus:ring-1 focus:ring-foreground"
//               placeholder="+254XXXXXXXX"
//             />
//             {errors.phone_number && <p className="mt-1 text-xs text-border-color">{errors.phone_number.message}</p>}
//           </div>
//           <div>
//             <label htmlFor="password" className="flex items-center text-lg md:text-xl font-medium text-primary mb-1">
//               <RiLockPasswordFill className="w-6 h-6 mr-2" /> Password:
//             </label>
//             <div className="relative">
//               <input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 {...register('password')}
//                 className={`w-full border text-[16px] md:text-[20px] ${errors.password ? 'border-border-color' : 'border-foreground'} border-2 rounded-md shadow-sm p-3 focus:outline-none focus:ring-1 focus:ring-foreground`}
//               />
//               <button
//                 type="button"
//                 className="absolute inset-y-0 right-0 flex items-center pr-3"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <FaEyeSlash className="h-5 w-5 text-primary" /> : <FaEye className="h-5 w-5 text-primary" />}
//               </button>
//             </div>
//             {errors.password && <p className="mt-1 text-xs text-border-color">{errors.password.message}</p>}
//           </div>
//           <div>
//             <label htmlFor="confirm_password" className="flex items-center text-lg md:text-xl font-medium text-primary mb-1">
//               <RiLockPasswordFill className="w-6 h-6 mr-2" /> Confirm Password:
//             </label>
//             <div className="relative">
//               <input
//                 id="confirm_password"
//                 type={showConfirmPassword ? "text" : "password"}
//                 {...register('confirm_password')}
//                 className={`w-full border text-[16px] md:text-[20px] ${errors.confirm_password ? 'border-border-color' : 'border-foreground'} border-2 rounded-md shadow-sm p-3 focus:outline-none focus:ring-1 focus:ring-foreground`}
//               />
//               <button
//                 type="button"
//                 className="absolute inset-y-0 right-0 flex items-center pr-3"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
//                 {showConfirmPassword ? <FaEyeSlash className="h-5 w-5 text-primary" /> : <FaEye className="h-5 w-5 text-primary" />}
//               </button>
//             </div>
//             {errors.confirm_password && <p className="mt-1 text-xs text-border-color">{errors.confirm_password.message}</p>}
//           </div>
//           <div>
//             <label htmlFor="role" className="block text-lg md:text-xl font-medium text-primary mb-1">
//               Role:
//             </label>
//             <select
//               id="role"
//               {...register('role')}
//               className={`w-full border text-[16px] md:text-[20px] ${errors.role ? 'border-border-color' : 'border-foreground'} border-2 rounded-md shadow-sm p-3 focus:outline-none focus:ring-1 focus:ring-foreground`}
//             >
//               <option value="">Select a role</option>
//               <option value="seller">seller</option>
//               <option value="buyer">buyer</option>
//               <option value="lawyer">lawyer</option>
//             </select>
//             {errors.role && <p className="mt-1 text-xs text-border-color">{errors.role.message}</p>}
//           </div>
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-3 text-lg md:text-xl text-white bg-primary rounded-md hover:bg-secondary transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//           >
//             {loading ? 'Signing Up...' : 'Sign Up'}
//           </button>
//         </form>
//         <div className="mt-8 text-center text-lg sm:text-xl">
//           <span className="text-primary">Already have an account? </span>
//             <Link href="./login/" className="font-medium text-foreground hover:text-secondary hover:underline">
//                 Log In
//             </Link>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Signup;