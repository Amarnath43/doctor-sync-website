// VerifySignup.jsx
import React, { useState, useEffect } from "react";
import {signupVerify,signinVerify} from '../apiManager/auth'
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import useUserStore from "../store/user";
import {TOKEN} from '../const/doctor'


const EmailVerify = () => {
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const {user,setUser}=useUserStore();

  // Retrieve email from localStorage
  const email = localStorage.getItem("emailForVerification");

   // Detect whether this is Signup or Signin based on the path
   const isSignupFlow = location.pathname.toLowerCase().includes('/signup');

  useEffect(() => {
    if (!email) {
      setMessage("No email found. Please sign up again.");
    }
  }, [email]);

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const apiFunc = isSignupFlow ? signupVerify : signinVerify;
      const res = await apiFunc({ email, otp });
      setMessage(res.data.message);
      localStorage.removeItem("emailForVerification");

      if (isSignupFlow) {
        navigate("/signin");
      } else {
        navigate(`/`); 
        setUser(res.data.user); 
        console.log(res)
        localStorage.setItem(TOKEN, res.data.token)

      }
      toast.success("Login successful")

    } catch (err) {
      setMessage(err.response?.data?.message || "Verification failed.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>OTP Verification</h2>
      <p>Please enter the OTP sent to your email ({email}).</p>
      <form onSubmit={handleVerify}>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <br /><br />
        <button type="submit">Verify</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EmailVerify;
