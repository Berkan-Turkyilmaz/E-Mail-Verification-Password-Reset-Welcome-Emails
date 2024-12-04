import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { motion } from "framer-motion";
import { RiLockPasswordLine } from "react-icons/ri";
import { toast } from "react-hot-toast";
import { Loader } from "lucide-react";
import { FaCheck } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const { resetPassword, message, isLoading, error } = useAuthStore();

  const { token } = useParams();

  const handleResetPassword = async (e) => {
    if (password !== confirmPassword) {
     
      return;
    }
    await resetPassword(token, password, confirmPassword);
    toast.success("Password reset successfull, redirecting to the login page");
    setTimeout(() => {
      navigate("/login");
    }, 3000);
    
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={0.5}
      className="min-h-screen  w-full  flex justify-center items-center "
    >
      <div className="h-auto w-1/4 min-w-[300px]  bg-customLastBG bg-opacity-50 rounded-xl">
        <div className=" mt-10 mb-8 text-3xl font-bold text-emerald-500  text-center">
          Forgot Password
        </div>
        <div className="w-full flex-col">
          <div className="w-full flex justify-center">
            <div className="mb-10 flex w-3/4  items-center bg-customBG2 rounded-xl  h-10">
              <RiLockPasswordLine
                className="m-4"
                style={{ fill: "seagreen" }}
              />
              <input
                className="w-3/4 outline-none bg-customBG2 text-white"
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full flex justify-center">
            <div className="mb-6 flex w-3/4  items-center bg-customBG2 rounded-xl h-10">
              <RiLockPasswordLine
                className="m-4"
                style={{ fill: "seagreen" }}
              />
              <input
                className="w-3/4 outline-none bg-customBG2 text-white"
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full pl-16  mb-4">
            {password.length === 0 ? (
              ""
            ) : password === confirmPassword ? (
              <div className="flex items-center gap-x-2 ">
                <div className="text-green-500  ">Password Matched</div>
                  <div>
                     <FaCheck className="text-green-500" />
                  </div>
                
              </div>
            ) : (
              <div className="flex items-center gap-x-2 w-2/3  ">
                <div className="text-red-500 ">Password didn't match</div>
                <span>
                  <RxCross1 className="text-red-500" />
                </span>
              </div>
            )}
          </div>
          <div>{error ? <div className="text-red-500">{error}</div> : ""}</div>
          <div className="w-full flex justify-center mb-8 ">
            <motion.button
              className="w-2/3 text-white bg-gradient-to-l font-semibold from-green-800 to-green-500 pt-2 pb-2 rounded-xl"
              whileHover={{ scale: 1.1 }}
              onClick={() => {
                handleResetPassword();
              }}
            >
              {isLoading ? (
                <Loader className="w-6 h-6 animate-spin  mx-auto" />
              ) : (
                "Send Reset Link"
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResetPasswordPage;
