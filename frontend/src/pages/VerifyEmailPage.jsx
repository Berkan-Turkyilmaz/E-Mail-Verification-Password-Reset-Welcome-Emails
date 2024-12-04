import { Loader } from "lucide-react";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { MdOutlineToken } from "react-icons/md";
import { useAuthStore } from "../stores/authStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const VerifyEmailPage = () => {
  const [code, setCode] = useState("");

  const { error, isLoading, verifyEmail } = useAuthStore();

  const navigate = useNavigate();

  const handleVerifyEmail = async () => {
    try {
      await verifyEmail(code);
      navigate("/");
      toast.success("Email verified successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={0.5}
      className="min-h-screen w-full  flex justify-center items-center "
    >
      <div className="w-1/5 min-w-[275px] h-auto flex flex-col bg gap-y-8 rounded-xl bg-customLastBG bg-opacity-50  ">
        <div className="mt-10 text-3xl font-bold text-emerald-500 mb-2 text-center">
          Verify Your Email
        </div>
        <div className="text-gray-300 text-center">
          Enter the 6-digit code sent to your email adress.
        </div>
        <div className="w-full flex justify-center">
          <div className="flex w-3/4  items-center bg-customBG2 rounded-xl gap-x-2 h-10">
            <MdOutlineToken style={{ fill: "seagreen" }} className="ml-3" />

            <input
              className="w-3/4 outline-none bg-customBG2 text-white"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-center"> {error ? <div className="text-red-500">{error}</div> : null}</div>
        <div className="w-full flex justify-center mb-8 ">
          <motion.button
            className="w-2/3 text-white bg-gradient-to-l font-semibold from-green-800 to-green-500 pt-2 pb-2 rounded-xl"
            whileHover={{ scale: 1.1 }}
            onClick={() => {
              handleVerifyEmail();
            }}
          >
            {isLoading ? (
              <Loader className="w-6 h-6 animate-spin  mx-auto" />
            ) : (
              "Verify Email"
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default VerifyEmailPage;
