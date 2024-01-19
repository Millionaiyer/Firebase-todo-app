import React from "react";
import { Link } from "react-router-dom";

const Signin = () => {
  return (
    <section>
      <div className="max-w-[700px] mx-auto p-4 ">
        <h1 className="text-2xl font-bold py-2">Sign in to your account.</h1>
        <p className="py-2">
          Don't have an account yet?{" "}
          <Link to="/signup" className="underline">
            Sign up
          </Link>
        </p>
        <form action="">
          <div className="flex flex-col py-2">
            <label className="py-2 font-medium">Email Address</label>
            <input className="border p-3" type="email" />
          </div>
          <div className="flex flex-col py-2">
            <label className="py-2 font-medium">Password</label>
            <input className="border p-3" type="password" />
          </div>
          <button className="border-blue-300 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white ">
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );
};

export default Signin;
