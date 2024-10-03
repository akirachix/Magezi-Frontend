import { ResetPasswordData, UserLogin } from "./types";

export const loginUser = async (data: UserLogin) => {
    try {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Login failed. Please check your credentials.");
        }

        return await response.json();
    } catch (error) {
        console.error("Login error:", error);
        throw error; 
    }
};

export const resetPassword = async (data: ResetPasswordData) => {
    try {
        const response = await fetch('/api/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'An error occurred while resetting password.');
        }

        return await response.json();
    } catch (error) {
        console.error("Reset password error:", error);
        throw error; 
    }
};
