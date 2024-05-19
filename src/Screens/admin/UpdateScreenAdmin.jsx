import React, { useState, useEffect, useRef } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "../../slices/adminApiSlice";
import { setCredentials } from "../../slices/adminauthSlice";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config/config";

import Loader from "../../components/Loader";
import {
  isEmailValid,
  isPasswordValid,
  nameValidate,
} from "../../utilities/validationForm";

function UpdateScreenAdmin() {
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [imageFile, setImageFile] = useState();
  const [imageUrl, setImageUrl] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const cpasswordRef = useRef(null);
  const { state } = useLocation();
  console.log(state);

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const { adminInfo } = useSelector((state) => state.adminAuth);

  const handleChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
    if (file) {
      setImageFile(file);
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    setUsername(state.item.name);
    setEmail(state.item.email);
    setImageUrl(`${BASE_URL}static/userImages/${state.item.image}`);
  }, [state.item.setUsername, state.item.setEmail, state.item.image]);

  const handleChangeName = (e) => {
    const NameValue = e.target.value;
    nameValidate(NameValue, setUsername, usernameRef);
  };
  const handleChangeEmail = (e) => {
    const emailValue = e.target.value;
    isEmailValid(emailValue, setEmail, emailRef);
  };
  const handleChangePassword = (e) => {
    const passwordValue = e.target.value;
    isPasswordValid(passwordValue, setPassword, passwordRef);
  };
  const handleChangeCPassword = (e) => {
    const passwordValue = e.target.value;
    isPasswordValid(passwordValue, setConfirmPassword, cpasswordRef);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password do not Match");
    } else {
      try {
        const formData = new FormData();
        formData.append("_id", state.item._id);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("image", imageFile);

        const res = await updateUser(formData).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile Updated");
        navigate("/admin/dashboard");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <>
      <div className=" flex justify-center" style={{ background: "#edf2f7" }}>
        <div className="max-w-md w-full mt-10 mb-10 space-y-8 p-10 bg-white rounded-xl">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Update User
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="mx-auto w-32 h-32 relative -mt-4 border-4 border-white rounded-full overflow-hidden">
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleChange}
                id="fileInput"
              />
              <label htmlFor="fileInput">
                <img
                  className="object-cover object-center h-32 cursor-pointer"
                  src={imageUrl}
                  alt="Woman looking front"
                />
              </label>
            </div>
            <div className="relative">
              <label
                htmlFor="email"
                className="text-sm font-bold text-gray-700 tracking-wide"
              >
                Username
              </label>
              <input
                id="username"
                className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="name"
                placeholder="Enter Your Name"
                value={name}
                onChange={handleChangeName}
              />
              <div className="text-red-700 mt-2">
                <span ref={usernameRef}></span>
              </div>
            </div>
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
            <div className="mt-8 mb-3 content-center">
              <label
                htmlFor="password"
                className="text-sm font-bold text-gray-700 tracking-wide"
              >
                Confirm Password
              </label>
              <input
                id="password"
                className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="password"
                placeholder="Re Enter password"
                value={confirmPassword}
                onChange={handleChangeCPassword}
              />
              <div className="text-red-700 mt-2">
                <span ref={cpasswordRef}></span>
              </div>
            </div>
            <div class="p-4 border-t mx-8 mt-2">
              {isLoading && <Loader />}
              <button
                type="submit"
                className="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateScreenAdmin;
