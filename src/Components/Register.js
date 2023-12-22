import React, { useState } from "react";
import Notelogo from "../Assests/notes-removebg-preview.png";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useFormik } from "formik";

export const Register = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validation = yup.object({
    firstName: yup.string().required("Enter First Name"),
    lastName: yup.string().required("Enter Last Name"),
    email: yup
      .string()
      .required("Email is required")
      .email("Email is not valid"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "Password start with capital letter then from 5 to 10 letters or digits"
      ),
  });
  async function sendData(values) {
    setLoading(true);
    try {
      const response = await axios.post(
        `https://backendnoteapp.onrender.com/api/auth/register`,
        values
      );
      const data = response.data;

      setLoading(false);

      // Handle successful registration
      toast.success("Register Successfull. Reset Email Send.", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      navigate("/login");
    } catch (err) {
      // Handle errors
      setLoading(false);
      const errorMessage = err.response?.data?.error || "Internal Server Error";
      setError(errorMessage);

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: validation,
    onSubmit: sendData,
  });

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gradient-to-br from-teal-500 to-cyan-600 h-screen w-full">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-20 w-auto"
          src={Notelogo}
          alt="Your Company"
        />
        <h2 className="mt-2 text-center text-2xl text-gray-900 font-bold">
          Recall
        </h2>
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign up to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          {error ? <p className="text-danger ">{error}</p> : ""}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Full name
            </label>
            <div className="mt-2">
              <input
                id="fullName"
                name="fullName"
                type="name"
                autoComplete="name"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.firstName && formik.touched.firstName ? (
                <p className="fs-small ps-1 text-danger text-start">
                  {formik.errors.firstName}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Last name
            </label>
            <div className="mt-2">
              <input
                id="lastName"
                name="lastName"
                type="name"
                autoComplete="name"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.lastName && formik.touched.lastName ? (
                <p className="fs-small ps-1 text-danger text-start">
                  {formik.errors.lastName}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email ? (
                <p className="fs-small ps-1 text-danger text-start">
                  {formik.errors.email}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.password && formik.touched.password ? (
                <p className="fs-small ps-1 text-danger text-start">
                  {formik.errors.password}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-sky-950 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-800"
            >
              Create Account
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-900">
          Already have an account?{" "}
          <a
            href="#"
            className="font-semibold leading-6 text-blue-950 hover:text-blue-800"
            onClick={() => navigate("/login")}
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};
