"use client";

import { useEffect } from "react";
import { setCookie } from "cookies-next";

import SecureLandTransactions from "./teaser/teaserone/page";
import Head from "next/head";

const Home = () => {
    useEffect(() => {
        setCookie("userRole", "buyer", { maxAge: 60 * 60 * 24 * 7 }); 
        setCookie("userName", "Shawazi", { maxAge: 60 * 60 * 24 * 7 }); 
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
