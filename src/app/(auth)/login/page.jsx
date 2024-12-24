"use client";
import { useLoginRegister } from "@/store/login";
import { axiosRequest } from "@/utils/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function Login() {
  let {handleLogin} = useLoginRegister()
  const router = useRouter();


  function handleSubmit(event) {
    event.preventDefault();
    const obj = {
      userName: event.target["username"].value,
      password: event.target["password"].value,
    };

    router.push("/"); 
    handleLogin(obj);
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 w-[1520px]">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              name="username"
              id="username"
              type="text"
              placeholder="Enter your username"
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              name="password"
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
