import {  UserLogin } from "./types";

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
        throw error; 
    }
};






