"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { fetchUsers } from "../../utils/getUsers";
import { UserDatas } from "../../utils/types";
const OtpVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [users, setUsers] = useState<UserDatas[]>([]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const phone = searchParams.get("phone_number");
    console.log("Phone number from query params:", phone);
    if (phone) {
      setPhoneNumber(phone);
    } else {
      setError("Phone number not found. Please log in again.");
    }
    const cachedUsers = Cookies.get("users");
    if (cachedUsers) {
      setUsers(JSON.parse(cachedUsers));
    } else {
      fetchAllUsers();
    }
  }, [searchParams]);
  const fetchAllUsers = async () => {
    try {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
      Cookies.set("users", JSON.stringify(fetchedUsers), { expires: 1 / 24 });
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users. Please try again.");
    }
  };
  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const isVerified = await verifyOtp(otp.join(""));
      console.log("Users at submit:", users);
      if (users.length === 0) {
        setError("Failed to load users. Please try again.");
        setLoading(false);
        return;
      }
      if (isVerified && phoneNumber) {
        const cleanPhoneNumber = (phone: string) => phone.replace(/\D/g, "");
        console.log("Phone number to compare:", cleanPhoneNumber(phoneNumber));
        const currentUser = users.find((user: UserDatas) => {
          console.log(
            "Checking user phone:",
            cleanPhoneNumber(user.phone_number),
            "with",
            cleanPhoneNumber(phoneNumber)
          );
          return (
            cleanPhoneNumber(user.phone_number) ===
            cleanPhoneNumber(phoneNumber)
          );
        });
        console.log("Current user:", currentUser);
        if (currentUser) {
          let redirectUrl = "/";
          switch (currentUser.role) {
            case "lawyer":
              redirectUrl = "/lawyer/draft-contract";
              break;
            case "buyer":
              redirectUrl = "/buyer/land-display";
              break;
            case "seller":
              redirectUrl = "/seller/seller-page";
              break;
            default:
              console.error("Unknown user role:", currentUser.role);
              setError(
                "Unable to determine user role. Please try logging in again."
              );
              setLoading(false);
              return;
          }
          console.log("Redirecting to:", redirectUrl);
          router.push(redirectUrl);
        } else {
          setError("User not found. Please try logging in again.");
        }
      } else {
        setError("Invalid OTP or phone number not found. Please try again.");
      }
    } catch (err) {
      console.error("Error during OTP verification:", err);
      setError("Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const verifyOtp = async (otpString: string) => {
    console.log("Verifying OTP:", otpString);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  };
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center relative overflow-hidden">
      <div className="border-2 border-primary rounded-lg p-4 sm:p-6 md:p-8 lg:p-12 mx-auto w-[90%] sm:w-[85%] md:w-[80%] lg:w-[50%] bg-white shadow-md">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-primary mb-4">
          Verify Code
        </h2>
        <p className="text-center mb-3 text-sm sm:text-base">
          Please enter the verification code sent to your phone number
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center space-x-2 mb-4">
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
                className="w-6 sm:w-8 md:w-10 h-12 text-center text-2xl border-2 border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            ))}
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            type="submit"
            className={`w-full bg-primary text-white py-2 sm:py-3 md:py-4 rounded-md text-md sm:text-lg ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
      <div className="mt-4 w-[90%] md:w-[80%] lg:w-[50%]">
        {/* The user list section can be uncommented if needed */}
        {/* <h3 className="text-2xl font-bold mb-4">All Users</h3>
        <ul className="list-disc pl-5">
          {users.map((user, index) => (
            <li key={index} className="mb-2">
              {user.name} - {user.phone_number} ({user.role})
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
};
export default OtpVerification;