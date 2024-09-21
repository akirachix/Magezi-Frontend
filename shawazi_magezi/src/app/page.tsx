import Image from "next/image";
import Login from "./components/Login";
// import TransactionsPage from "./components/Transactions/page";
export default function Home() {
  return (
    <div>
      <main>
        <Login/>
        {/* <TransactionsPage/> */}
      </main>
    </div>
  );
}
