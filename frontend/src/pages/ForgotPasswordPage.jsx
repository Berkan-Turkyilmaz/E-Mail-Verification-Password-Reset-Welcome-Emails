import React, { useState } from "react";
import { useAuthStore } from "../stores/authStore";
import { MdOutlineEmail } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Loader } from "lucide-react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { isLoading,error, forgotPassword } = useAuthStore();

  const handleForgotPassword = async (e) => {
    await forgotPassword(email);
    setSubmitted(true);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={0.5}
      className="min-h-screen  w-full  flex justify-center items-center "
    >
      {!submitted ? (
        <div className="h-auto w-1/4  bg-customLastBG bg-opacity-50 rounded-xl">
          <div className=" mt-10 mb-8 text-3xl font-bold text-emerald-500  text-center">
            Forgot Password
          </div>
          <div className="w-full flex justify-center">
            <div className="text-gray-300 text-center mb-8 w-3/4  ">
              Enter your email adress and we'll send you a link to reset your
              password.
            </div>
          </div>
          <div>
            <div className="w-full flex justify-center">
              <div className="mb-8 flex w-3/4  items-center bg-customBG2 rounded-xl gap-x-2 h-10">
                <MdOutlineEmail className="m-4" style={{ fill: "seagreen" }} />
                <input
                  className="w-3/4 outline-none bg-customBG2 text-white"
                  type="text"
                  placeholder="E-Mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center mb-6">{error && <div className="text-red-500">{error}</div>}</div>

          <div className="w-full flex justify-center mb-8 ">
            <motion.button
              className="w-2/3 text-white bg-gradient-to-l font-semibold from-green-800 to-green-500 pt-2 pb-2 rounded-xl"
              whileHover={{ scale: 1.1 }}
              onClick={() => {
                handleForgotPassword();
              }}
            >
              {isLoading ? (
                <Loader className="w-6 h-6 animate-spin  mx-auto" />
              ) : (
                "Send Reset Link"
              )}
            </motion.button>
          </div>
          <div className="pb-2 pt-2 w-full flex  rounded-br-xl rounded-bl-xl bg-customBG2 justify-center text-emerald-500  ">
            <Link to="/login" className="flex text-xl gap-x-2 items-center">
              <IoMdArrowRoundBack
                style={{ fill: "mediumseagreen", fontSize: "25px" }}
              />
              Back to login
            </Link>
          </div>
        </div>
      ) : (
        <div className="h-auto w-1/4  bg-customLastBG bg-opacity-50 rounded-xl">
          <div className=" mt-10 mb-8 text-3xl font-bold text-emerald-500  text-center">
            Forgot Password
          </div>
          <div className="flex justify-center items-center ">
            <div className="flex items-center justify-center  bg-emerald-400 rounded-full w-14 h-14">
              <MdOutlineEmail style={{ fill: "white" }} className="h-10 w-10" />
            </div>
          </div>
          <div className="mt-6 w-full flex justify-center">
            <div className="text-gray-300 text-center mb-8 w-5/6  ">
              If an account exists for {email}, you will receive an email with a
              link to reset your password.
            </div>
          </div>
          <div className="pb-2 pt-2 w-full flex  rounded-br-xl rounded-bl-xl bg-customBG2 justify-center text-emerald-500  ">
            <Link to="/login" className="flex text-xl gap-x-2 items-center">
              <IoMdArrowRoundBack
                style={{ fill: "seagreen", fontSize: "25px" }}
              />
              Back to login
            </Link>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ForgotPasswordPage;
