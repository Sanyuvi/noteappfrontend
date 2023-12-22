import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Notelogo from "../Assests/notes-removebg-preview.png";

export default function VerifyRandomString() {
  const [verificationStatus, setVerificationStatus] = useState("Verifying...");
  const navigate = useNavigate();
  const { randomString } = useParams();

  useEffect(() => {
    async function verifyRandomString() {
      try {
        const response = await axios.get(
          `https://backendnoteapp.onrender.com/api/auth/verifyRandomString/${randomString}`
        );

        if (response.data.message === "Random String Verified") {
          // If the random string is verified, display a success message
          toast.success("Random String Verified Successfully", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setVerificationStatus("Random String Verified");
        } else {
          // If verification fails, display an error message
          setVerificationStatus("Random String Verification Failed");
          toast.error("Random String Verification Failed", {
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
      } catch (error) {
        // Handle API request error
        setVerificationStatus("Random String is Invalid or Expires");
        toast.error("Random String is Invalid or Expires", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        console.error(error);
      }
    }

    if (randomString) {
      verifyRandomString();
    }
  }, [randomString]);

  // Handle the "Continue" button click
  const handleContinueClick = () => {
    navigate(`/resetPassword/${randomString}`);
  };

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
          Verify Random String
        </h2>
        <p className="mt-3 text-gray-900">Random String Verified</p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-sky-950 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-800"
              onClick={handleContinueClick}
            >
              Continue to Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
