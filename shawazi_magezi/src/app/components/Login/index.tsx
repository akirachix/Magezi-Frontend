'use client'
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock } from "react-icons/fa"; // Import icons

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await ({ username, email });
      console.log(response);
      setLoading(false);
      router.push("/");
    } catch (error) {
      setError((error as Error).message);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
        <div></div>
        <div>
           <img src="/images/loginimages.png" alt="loginicon" className="image w-96 h-96"/>
        </div>
      <form className="w-4/12 p-10" onSubmit={handleLogin}>
        <h2 className="text-3xl font-bold text-brown-800 mb-60">Login</h2>
        
        
        <div className="mb-16">
          <div className="flex items-center mb-1">
            <FaEnvelope className="text-black mr-2" />
            <label className="text-black text-lg">Email:</label>
          </div>
          <input
            type="text"
            placeholder=""
            required
            className="border border-hover rounded-md w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setUsername(event.target.value)
            }
          />
        </div>
        
        <div className="mb-16">
          <div className="flex items-center mb-1">
            <FaLock className="text-black mr-2" />
            <label className="text-black text-lg">Password:</label>
          </div>
          <input
            type="password"
            placeholder=""
            required
            className="border border-hover rounded-md w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setEmail(event.target.value)
            }
          />
        </div>
        
        <button
          type="submit"
          className="bg-hover w-full text-white py-3 px-4 rounded-md font-semibold text-lg hover:bg-green-700 transition-colors duration-300"
        >
          {loading ? "Loading..." : "Log in"}
        </button>
        
        <div className="flex items-center my-4 mt-16">
          <hr className="w-full border-t border-black" /> 
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-black">
            Don't have an account? <a href="/signup" className="text-black font-bold hover:underline">Sign up</a>
          </p>
        </div>
        {error && <small className="text-red-500 mt-2 block text-center">{error}</small>}
      </form>
    </div>
  );
};

export default Login;
