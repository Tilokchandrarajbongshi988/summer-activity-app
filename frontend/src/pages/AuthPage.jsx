import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import { useNavigate } from "react-router-dom"

import { useState } from "react";
import toast from "react-hot-toast";
import { login, signUp } from "../services/authService";
import AnimatedBackground from "../components/AnimatedBackground";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

const isValidEmail = (value) => EMAIL_REGEX.test(value.trim());

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSignup, setIsSignup] = useState(false);

  const [fullName, setFullName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("guest");

  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const validateLogin = () => {
    if (!email.trim()) {
      toast.error("Email is required");
      return false;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (!password) {
      toast.error("Password is required");
      return false;
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  const validateSignup = () => {
    if (!fullName.trim()) {
      toast.error("Full name is required");
      return false;
    }

    if (!signupEmail.trim()) {
      toast.error("Email is required");
      return false;
    }

    if (!isValidEmail(signupEmail)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (!signupPassword) {
      toast.error("Password is required");
      return false;
    }

    if (signupPassword.length < MIN_PASSWORD_LENGTH) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    if (signupPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (!validateLogin()) {
      return;
    }

    try {
      const formData = {
        email: email.trim().toLowerCase(),
        password,
      };
      console.log(formData);
      const data = await login(formData);
      console.log("login response: ", data);

      if(data.error) {
        toast.error(data.error);
        return;
      }

      setUser(data);
      
      if (data.userType === "host") {
        navigate("/host/dashboard");
      } else {
        navigate("/guest/dashboard");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleSignUp = async () =>{
    if (!validateSignup()) {
      return;
    }

    try {
      const formData ={
        fullName: fullName.trim(),
        email: signupEmail.trim().toLowerCase(),
        password: signupPassword,
        confirmPassword,
        userType,
      }
      console.log(formData);
      const data = await signUp(formData);
      console.log(data);

      if (data.error) {
        toast.error(data.error);
        return;
      }

      toast.success("Account created. Please login.");
      setIsSignup(false);

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }


  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />

      <div className="absolute inset-0 flex items-center justify-center px-4">

        <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white/10  backdrop-blur-lg  p-8  shadow-2xl">
          <h1 className="text-center text-4xl font-bold text-white">
            Summer Activity
          </h1>

          <p className="mt-2 text-center text-white/70">
            Discover amazing kids activities
          </p>

          {!isSignup ? (
            <div className="mt-8 space-y-4">

              <input  type="email"  placeholder="Email" value={email} required inputMode="email" autoComplete="email" className="w-full  rounded-xl  bg-white/20  px-4  py-3  text-white  placeholder:text-white/60  outline-none" onChange={(e) => setEmail(e.target.value)}/>

              <input  type="password"  placeholder="Password" value={password} required minLength={MIN_PASSWORD_LENGTH} autoComplete="current-password" className="w-full  rounded-xl  bg-white/20  px-4  py-3 text-white  placeholder:text-white/60  outline-none" onChange={(e) => setPassword(e.target.value)}/>

              <button type="button" onClick={handleLogin} className="w-full rounded-xl  bg-sky-500  py-3  text-white  font-semibold  cursor-pointer">Login</button>
              <p className="text-center text-white/70">
                Don't have an account?{" "}
                <button
                  onClick={() => setIsSignup(true)}
                  className="text-sky-300  font-semibold  cursor-pointer">
                  Sign Up
                </button>
              </p>
            </div>
          ) : (
            <div className="mt-8 space-y-4">

              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                required
                autoComplete="name"
                className="w-full rounded-xl bg-white/20 px-4 py-3 text-white"
                onChange={(e) => setFullName(e.target.value)}/>

              <input
                type="email"
                placeholder="Email"
                value={signupEmail}
                required
                inputMode="email"
                autoComplete="email"
                className="w-full rounded-xl bg-white/20 px-4 py-3 text-white"
                onChange={(e) => setSignupEmail(e.target.value)}/>

              <input
                type="password"
                placeholder="Password"
                value={signupPassword}
                required
                minLength={MIN_PASSWORD_LENGTH}
                autoComplete="new-password"
                className="w-full rounded-xl bg-white/20 px-4 py-3 text-white"
                onChange={(e) => setSignupPassword(e.target.value)}/>

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                required
                minLength={MIN_PASSWORD_LENGTH}
                autoComplete="new-password"
                className="w-full rounded-xl bg-white/20 px-4 py-3 text-white"
                onChange={(e) => setConfirmPassword(e.target.value)}/>

              <div className="flex gap-6 text-white">

                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="userType" value="guest" checked={userType === "guest"} onChange={(e) => setUserType(e.target.value)}/>
                  Guest
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="userType" value="host" checked={userType === "host"} onChange={(e) => setUserType(e.target.value)}/>
                  Host
                </label>

              </div>

              <button type="button" onClick={handleSignUp} className="w-full  rounded-xl  bg-sky-500  py-3  text-white  font-semibold cursor-pointer"> Create Account</button>
              <p className="text-center text-white/70">
                Already have an account?{" "}
                <button
                  onClick={() => setIsSignup(false)}
                  className="font-semibold text-sky-300 cursor-pointer"
                >
                  Login
                </button>
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AuthPage;
