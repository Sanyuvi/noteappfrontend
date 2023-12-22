import React, { useState } from "react";
import Notelogo from "../Assests/notes-removebg-preview.png";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useFormik } from "formik";

export const ForgotPassword = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const validation = yup.object({
    email: yup
      .string()
      .required("Email is required")
      .email("Email is not valid"),
  });

  async function sendDataToMail(values) {
    console.log("Working sendDataToMail");
    setLoading(true);
    try {
      const response = await axios.post(
        "https://backendnoteapp.onrender.com/api/auth/forgotpassword",
        values
      );

      setLoading(false);
      toast.success("Reset Link send to your Mail", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      // You can use navigate here if needed
      navigate("/", {
        state: {
          message: "Reset Link send to your Mail, Please Verify you Mail",
        },
      });
    } catch (err) {
      setLoading(false);
      setError("Email is not Register");
      toast.error("Email is not Register", {
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
      email: "",
    },
    validationSchema: validation,
    onSubmit: sendDataToMail,
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
        <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Forgot Password
        </h2>
        <p className="mt-3 text-gray-900">
          Enter the email address you used to register with
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          {error ? <p className="text-danger ">{error}</p> : ""}
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
                value={formik.values.email} // Use formik.values for input value
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
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-sky-950 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-800"
            >
              Send Reset Password Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
