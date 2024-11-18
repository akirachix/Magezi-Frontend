"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { FaEye, FaEyeSlash, FaPhoneAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { loginUser } from "@/app/utils/userLogin";
import { useRouter } from "next/navigation";
import { setCookie, getCookie } from "cookies-next";
import { UserRole } from "@/app/utils/types";

interface FormValues {
  phone_number: string;
  password: string;
  role: UserRole;
}

interface LoginResponse {
  first_name: string;
  last_name: string;
}

const schema: yup.ObjectSchema<FormValues> = yup.object().shape({
  phone_number: yup
    .string()
    .matches(/^\+254\d{9}$/, 'Phone number must start with +254 and be 13 characters long')
    .required('Phone number is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .matches(/\d/, 'Password must contain a number')
    .matches(/[@$!%*?&#]/, 'Password must contain a special character')
    .required('Password is required'),
  role: yup
    .mixed<UserRole>()
    .oneOf(Object.values(UserRole), 'Role is required.')
    .required('Role is required.'),
}) as yup.ObjectSchema<FormValues>;

const Login = () => {
  const { 
    register, 
    handleSubmit, 
    setValue, 
    formState: { errors } 
  } = useForm<FormValues>({
    resolver: yupResolver<FormValues>(schema),
    mode: 'onChange',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedPhoneNumber = getCookie("phone_number");
    if (storedPhoneNumber && typeof storedPhoneNumber === 'string') {
      setValue("phone_number", storedPhoneNumber);
    }

    const rememberedLogin = localStorage.getItem("rememberedLogin");
    if (rememberedLogin === "true") {
      setRememberMe(true);
      const storedPhone = localStorage.getItem("phone_number");
      if (storedPhone) {
        setValue("phone_number", storedPhone);
      }
    }
  }, [setValue]);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setError("");
    try {
      const loginResponse = await loginUser(data) as LoginResponse;
      
      if (loginResponse && loginResponse.first_name) {
        setCookie("role", data.role);
        setCookie("phone_number", data.phone_number);
        setCookie("first_name", loginResponse.first_name);
        setCookie("last_name", loginResponse.last_name);
        setCookie("isLoggedIn", "true");

        if (rememberMe) {
          localStorage.setItem("rememberedLogin", "true");
          localStorage.setItem("phone_number", data.phone_number);
        } else {
          localStorage.removeItem("rememberedLogin");
          localStorage.removeItem("phone_number");
        }

        router.push('/otp-verification');
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : "Failed to log in. Please try again.";
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
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-6">
          Login
        </h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="role" className="block text-lg sm:text-xl font-medium text-primary mb-1">
              Role:
            </label>
            <select
              id="role"
              {...register("role")}
              className={`w-full border text-[16px] sm:text-[18px] ${
                errors.role ? "border-red-500" : "border-foreground"
              } border-2 rounded-md shadow-sm p-2 sm:p-3 focus:outline-none focus:ring-1 focus:ring-foreground`}
            >
              <option value="">Select your role</option>
              <option value={UserRole.BUYER}>Buyer</option>
              <option value={UserRole.SELLER}>Seller</option>
              <option value={UserRole.LAWYER}>Lawyer</option>
            </select>
            {errors.role && (
              <p className="mt-1 text-xs text-red-500">{errors.role.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone_number" className="block text-lg sm:text-xl font-medium text-primary mb-1">
              <FaPhoneAlt className="inline w-4 h-4 mr-2" /> Phone Number:
            </label>
            <input
              id="phone_number"
              {...register("phone_number")}
              className={`w-full border text-[16px] sm:text-[18px] ${
                errors.phone_number ? "border-red-500" : "border-foreground"
              } border-2 rounded-md shadow-sm p-2 sm:p-3 focus:outline-none focus:ring-1 focus:ring-foreground`}
              placeholder="+254XXXXXXXX"
            />
            {errors.phone_number && (
              <p className="mt-1 text-xs text-red-500">{errors.phone_number.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="flex items-center text-lg sm:text-xl font-medium text-primary mb-2">
              <RiLockPasswordFill className="w-6 h-6 mr-2" /> Password:
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={`w-full border text-[16px] sm:text-[18px] ${
                  errors.password ? "border-red-500" : "border-foreground"
                } border-2 rounded-md shadow-sm p-2 sm:p-3 focus:outline-none focus:ring-1 focus:ring-foreground`}
                placeholder="@Pass123!"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEye className="h-5 w-5 text-primary" />
                ) : (
                  <FaEyeSlash className="h-5 w-5 text-primary" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2"
              />
              Remember me
            </label>
          </div>

          {error && <p className="mt-2 text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full bg-primary text-white text-lg sm:text-xl font-medium py-2 sm:py-3 rounded-md shadow-md hover:bg-primary/90 transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary hover:text-secondary">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;