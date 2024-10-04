export async function POST(request: Request) {
    try {
        const { otp, phone_number } = await request.json();
        console.log("Received OTP:", otp, "Received Phone Number:", phone_number);
        if (!otp || !phone_number) {
            return new Response(
                JSON.stringify({ message: "OTP and phone number are required." }),
                { status: 400 }
            );
        }
        const externalResponse = await verifyOtpAPI(otp, phone_number);
        if (externalResponse.ok) {
            return new Response(JSON.stringify({ message: "Verification successful!" }), { status: 200 });
        } else {
            const errorData = await externalResponse.json();
            return new Response(JSON.stringify({ message: errorData.message }), { status: 400 });
        }
    } catch (error) {
        console.error("Server error during OTP verification:", error);
        return new Response(
            JSON.stringify({ message: "Error has occurred, kindly try again." }),
            { status: 500 }
        );
    }
}
async function verifyOtpAPI(otp: string, phone_number: string) {
    const response = await fetch(`${process.env.BASE_URL}/api/otp_verification`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp, phone_number }),
    });
    return response;
}




