
export const verifyOtp = async (otp: string, phone_number:string) => {
    try {
        const response = await fetch('/api/otp_verification', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ otp, phone_number }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "OTP verification failed");
        }

        return await response.json(); 
    } catch (error) {
        console.error("OTP verification error:", error);
        throw error;
    }
};


export const resendOtp = async (phone_number: string) => {
    try {
        const response = await fetch("/api/send-otp", {  
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ phone_number }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to resend OTP");
        }

        return await response.json();
    } catch (error) {
        console.error("Resend OTP error:", error);
        throw error;
    }
};

