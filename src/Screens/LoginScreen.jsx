import React, { useState, useEffect, useRef } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { isEmailValid, isPasswordValid } from "../utilities/validationForm";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      toast.success("Login successfully");
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleChangeEmail = (e) => {
    const emailValue = e.target.value;
    isEmailValid(emailValue, setEmail, emailRef);
  };
  const handleChangePassword = (e) => {
    const passwordValue = e.target.value;
    isPasswordValid(passwordValue, setPassword, passwordRef);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        isEmailValid(email, setEmail, emailRef) &&
        isPasswordValid(password, setPassword, passwordRef)
      ) {
        const res = await login({ email, password }).unwrap();

        dispatch(setCredentials({ ...res }));

        navigate("/");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <div
        className="h-screen overflow-hidden flex items-center justify-center"
        style={{ background: "#edf2f7" }}
      >
        <div className="max-w-md w-full space-y-8 mt-10 mb-10 p-10 bg-white rounded-xl">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Welcome Back!
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please sign in to your account
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <label
                htmlFor="email"
                className="text-sm font-bold text-gray-700 tracking-wide"
              >
                Email
              </label>
              <input
                id="email"
                className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="email"
                placeholder="mail@gmail.com"
                value={email}
                onChange={handleChangeEmail}
              />
              <div className="text-red-700 mt-2">
                <span ref={emailRef}></span>
              </div>
            </div>
            <div className="mt-8 mb-3 content-center">
              <label
                htmlFor="password"
                className="text-sm font-bold text-gray-700 tracking-wide"
              >
                Password
              </label>
              <input
                id="password"
                className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={handleChangePassword}
              />
              <div className="text-red-700 mt-2">
                <span ref={passwordRef}></span>
              </div>
            </div>
            <div>
              {isLoading && <Loader />}
              <button
                type="submit"
                className="w-full flex justify-center mb-4 bg-indigo-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300"
              >
                Login in
              </button>
            </div>
          </form>
          <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
            <Link to="/signup">
              <span>Don't have an account?</span>
              <a className="text-indigo-500 hover:text-indigo-500no-underline hover:underline cursor-pointer transition ease-in duration-300">
                Sign up
              </a>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginScreen;
