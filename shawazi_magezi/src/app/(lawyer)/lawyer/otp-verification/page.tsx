"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const OtpVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const isVerified = await verifyOtp();
      if (isVerified) {
        router.push("/lawyer/draft-contract");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch {
      setError("Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center relative overflow-hidden px-4">
      <div className="border-2 border-primary rounded-lg p-6 md:p-12 mx-auto w-full sm:w-[90%] md:w-[60%] lg:w-[40%] bg-white shadow-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-4 sm:mb-8">Verify Code</h2>
        <p className="text-center mb-4 sm:mb-6">Please enter the verification code sent to your phone number.</p>
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-9">
          <div className="flex justify-center space-x-4 sm:space-x-6 mb-4 sm:mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-10 h-12 sm:w-12 sm:h-16 text-center text-2xl sm:text-3xl border-2 border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            ))}
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            type="submit"
            className={`w-full bg-primary text-white py-3 px-4 sm:py-4 rounded-md text-lg sm:text-xl ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;