"use client";

import { useEffect } from "react";
import SecureLandTransactions from "./teaser/teaserone/page";
import Head from "next/head";
import { setCookie } from "cookies-next";

const Home = () => {
    useEffect(() => {
        setCookie("userRole", "", { maxAge: 60 * 60 * 24 * 7 }); 
        setCookie("userName", "", { maxAge: 60 * 60 * 24 * 7 }); 
    }, []);

    return (
        <div>
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <SecureLandTransactions />
            </main>
        </div>
    );
};

export default Home;
