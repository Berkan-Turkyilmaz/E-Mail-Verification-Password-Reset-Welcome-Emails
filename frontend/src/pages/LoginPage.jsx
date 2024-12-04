import { useState } from "react";
import { motion } from "framer-motion";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { useAuthStore } from "../stores/authStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const {login, error, isLoading} = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
   await login(email,password);
   navigate("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={0.5}
      className="h-screen w-screen flex items-center justify-center"
    >
      <div className="h-auto w-1/4 min-w-[275px]  rounded-xl flex-col flex gap-6 items-center bg-customLastBG bg-opacity-50">
        <div className="mt-12 text-3xl font-bold text-emerald-400 tracking-wide mb-4">
          Sign In 
        </div>

        <div className="p-2 w-2/3  flex  bg-customBG2 rounded-xl items-center gap-2">
          <MdOutlineEmail  style={{ fill: "seagreen" }} className="ml-1" />

          <input
            className="flex-1 w-2/3 outline-none text-white bg-customBG2   "
            placeholder="E-Mail"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="p-2 w-2/3 flex  bg-customBG2 rounded-xl items-center gap-2">
          <RiLockPasswordLine style={{ fill: "seagreen" }} className="ml-1" />

          <input
            className="flex-1 w-2/3 outline-none  text-white bg-customBG2   "
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <div className="w-2/3 text-emerald-400 underline  "><Link to="/forgot-password">Forgot Password?</Link></div>
        <motion.button
          onClick={handleLogin}
          whileHover={{ scale: 1.1 }}
          className="p-2 text-center text-white font-bold rounded-xl bg-gradient-to-l from-green-800 to-green-500 w-3/5 "
        >
          {isLoading ? (
            <Loader className="w-6 h-6 animate-spin  mx-auto" />
          ) : (
            "Login"
          )}
        </motion.button>
        

        <div className="flex justify-center h-10 items-center w-full bg-customBG2 rounded-br-xl rounded-bl-xl gap-x-1 text-gray-500">
          You don't have an account?
          <Link to="/signup" className="text-green-400 font-semibold">
            Sign Up
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;
