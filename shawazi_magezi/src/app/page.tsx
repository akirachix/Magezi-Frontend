import Layout from "./Layout";

import Head from "next/head";
import TransactionsPage from "./transactions/upload_transactions/page";
import TransactionsDisplay from "./transactions/transactions/page";
import SecureLandTransactions from "./teaser/teaserone/page";
import SecureTransactions from "./teaser/teaserthree/page";
import SeamlessTransactions from "./teaser/teasertwo/page";
import { useState } from "react";

export default function Home() {
  return (
    <div>
      <Head>
        <link rel="icon" href="/images/shawazilogo.png" />
      </Head>
      <main>
        {/* <Layout> */}
        {/* <TransactionsDisplay />   */}
        <SecureLandTransactions />
        {/* <SecureTransactions />  */}
        {/* <SeamlessTransactions/>
         */}
        {/* <Notifications notifications={notifications} /> */}

        {/* <InterestedButton/> */}
        <></>

        {/* </Layout> */}
      </main>
    </div>
  );
}
