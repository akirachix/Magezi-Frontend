"use client"; 

import { useEffect } from "react";
import { setCookie } from "cookies-next";

import Head from "next/head";
import SecureLandTransactions from "./components/teaserone";

const Home = () => {
  useEffect(() => {

    setCookie("userRole", "lawyer", { maxAge: 60 * 60 * 24 * 7 });
    setCookie("userName", "Gatweri", { maxAge: 60 * 60 * 24 * 7 });
  }, []);

  return (
    <div>
      <Head>
        <link rel="icon" href="/images/shawazilogo.png" />
      </Head>
      <main>

          <SecureLandTransactions/>

      </main>
    </div>
  );
};

export default Home;
