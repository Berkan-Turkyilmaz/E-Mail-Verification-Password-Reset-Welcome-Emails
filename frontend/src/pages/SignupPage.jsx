import React, { useState } from "react";
import { motion } from "framer-motion";
import { SlUser } from "react-icons/sl";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";


const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const navigate = useNavigate();
  const {signup, error} = useAuthStore();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password, name);
      navigate("/");
      
    } catch (error) {
      console.log(error);
    }
    
  };
    

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={0.5}
      className="h-screen w-screen flex items-center justify-center"
    >
      <div className="min-w-[300px]  w-1/4 rounded-xl flex-col flex gap-6 items-center bg-customLastBG bg-opacity-50  ">
        <div className=" p-2 mt-12 text-3xl font-bold text-emerald-400 tracking-wide mb-4">
          Create an Account
        </div>

        <div className="p-2 w-2/3  flex bg-customBG2 rounded-xl items-center gap-2">
          <SlUser style={{ fill: "seagreen" }} className="ml-1" />
          <input
            className="flex-1 w-2/3 outline-none bg-customBG2 text-white "
            placeholder="Full Name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="p-2 w-2/3  flex  bg-customBG2 rounded-xl items-center gap-2">
          <MdOutlineEmail style={{ fill: "seagreen" }} className="ml-1" />

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
        <div>{error ? <p className="text-red-500">{error}</p> : null}</div>

        <PasswordStrengthMeter password={password} />
        
        <motion.button
          onClick={handleSignup}
          whileHover={{ scale: 1.1 }}
          className="p-2 text-center text-white font-bold rounded-xl bg-gradient-to-l from-green-800 to-green-500 w-3/5 "
        >
          Sign Up
        </motion.button>
        <div className="flex justify-center items-center h-10 w-full bg-customBG2 rounded-br-xl rounded-bl-xl gap-x-1 text-gray-500  ">
          Already have an account?
          <Link to="/login" className="text-green-400 font-semibold">
            Login
          </Link>
        </div>
      </div>
    </motion.div>
  );
}  ;

export default SignupPage;
