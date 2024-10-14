"use client";

import { useEffect } from "react";
// import { setCookie } from "cookies-next";

import SecureLandTransactions from "./teaser/teaserone/page";
import Head from "next/head";

const Home = () => {
    // useEffect(() => {
    //     setCookie("userRole", "buyer", { maxAge: 60 * 60 * 24 * 7 });
    //     setCookie("userName", "Gatweri", { maxAge: 60 * 60 * 24 * 7 });
    // }, []);

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



// "use client";
// import { useEffect } from 'react';
// import { setCookie } from 'cookies-next';
// import ChatRoom from './components/Chatroom';
// const ChatRoomPage = () => {
//     useEffect(() => {
//         setCookie('userRole', 'buyer', { maxAge: 60 * 60 * 24 * 7 }); 
//     }, []);

//     return <ChatRoom />;
// };

// export default ChatRoomPage;


// =======
// "use client"; 
// >>>>>>> 4553ce8facc07aaa8146d534cd42f282020d604e

// import { useEffect } from "react";
// import { setCookie } from "cookies-next";
// import SecureLandTransactions from "./teaser/teaserone/page";
// import Head from "next/head";

// const Home = () => {
//   useEffect(() => {

//     setCookie("userRole", "lawyer", { maxAge: 60 * 60 * 24 * 7 });
//     setCookie("userName", "Gatweri", { maxAge: 60 * 60 * 24 * 7 });
//   }, []);

// <<<<<<< HEAD
// =======
//   return (
//     <div>
//       <Head>
//       <link rel="icon" href="/favicon.ico" />
//       </Head>
//       <main>
//         <SecureLandTransactions />
//       </main>
 
//     </div>
//   );
// };

// export default Home;