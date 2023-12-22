import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import Notelogo from "../Assests/notes-removebg-preview.png";

export default function ResetPassword() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { randomString } = useParams(); // Get the random string from the URL

  // Define a validation schema for the form
  const validation = yup.object({
    password: yup.string().required("Password is required"),
  });

  // Function to send updated password data to the server
  async function sendUpdatedData(values) {
    console.log("Working sendUpdatedData");
    setLoading(true);
    try {
      // Replace ":randomString" with the extracted random string
      const response = await axios.put(
        `https://backendnoteapp.onrender.com/api/auth/resetpassword/${randomString}`,
        values
      );
      console.log("response", response);
      setLoading(false);
      toast.success("Password Updated Successfully", {
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
      navigate("/login");
    } catch (err) {
      setLoading(false);
      setError("Random String is not valid");
      toast.error("Random String is not valid", {
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

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: validation,
    onSubmit: sendUpdatedData,
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
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={formik.values.password} // Use formik.values for input value
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
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
