import React from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../stores/authStore";
import toast from "react-hot-toast";
const HomePage = () => {
  const {user, logout} = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
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
      <div className="flex flex-col gap-6  h-auto w-1/4 bg-customLastBG bg-opacity-50 rounded-xl">
        <div className="text-center mt-8 mb-4 text-3xl  text-green-500 font-bold">Dashboard</div>
        <div className="pb-2 shadow-[0_0_0_1px_#000]  pl-4 ml-6 mr-6  rounded-xl">
          <div className="mb-4 mt-2  text-xl font-semibold text-green-500">Profile Information</div>
          <div className="text-gray-300 ">Name: {user.name}</div>
          <div className="text-gray-300 ">Email: {user.email}</div>
        </div>
        <div className="pb-2 pl-4 ml-6 mr-6 shadow-[0_0_0_1px_#000] rounded-xl">
          <div className="mb-4 mt-2 text-xl font-semibold text-green-500">Account Activity</div>
          <div className="text-gray-300 ">Joined at : {new Date(user.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</div>
          
        </div>
        <div className="w-full flex justify-center mt-4 mb-6">
          <motion.button onClick={handleLogout} whileHover={{ scale: 1.1 }} className="w-1/2 h-10 text-center text-white font-bold rounded-xl bg-gradient-to-l from-green-800 to-green-500">
            Logout
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default HomePage;
