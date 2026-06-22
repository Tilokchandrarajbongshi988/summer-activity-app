import { useNavigate } from "react-router-dom"

import { useState } from "react";
import { login, signUp } from "../services/authService";
import AnimatedBackground from "../components/AnimatedBackground";

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

  const handleLogin = async () => {
    try {
      const formData = {
        email,
        password,
      };
      console.log(formData);
      const data = await login(formData);
      console.log("login response: ", data);

      if(data.error) {
        alert(data.error);
        return;
      }

      if (data.userType === "host") {
        navigate("/host/dashboard");
      } else {
        navigate("/guest/dashboard");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignUp = async () =>{
    try {
      const formData ={
        fullName,
        email: signupEmail,
        password: signupPassword,
        confirmPassword,
        userType,
      }
      console.log(formData);
      const data = await signUp(formData);
      console.log(data);
      setIsSignup(false);

    } catch (error) {
      console.log(error);
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

              <input  type="email"  placeholder="Email" value={email} className="w-full  rounded-xl  bg-white/20  px-4  py-3  text-white  placeholder:text-white/60  outline-none" onChange={(e) => setEmail(e.target.value)}/>

              <input  type="password"  placeholder="Password" value={password}  className="w-full  rounded-xl  bg-white/20  px-4  py-3 text-white  placeholder:text-white/60  outline-none" onChange={(e) => setPassword(e.target.value)}/>

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
                className="w-full rounded-xl bg-white/20 px-4 py-3 text-white"
                onChange={(e) => setFullName(e.target.value)}/>

              <input
                type="email"
                placeholder="Email"
                value={signupEmail}
                className="w-full rounded-xl bg-white/20 px-4 py-3 text-white"
                onChange={(e) => setSignupEmail(e.target.value)}/>

              <input
                type="password"
                placeholder="Password"
                value={signupPassword}
                className="w-full rounded-xl bg-white/20 px-4 py-3 text-white"
                onChange={(e) => setSignupPassword(e.target.value)}/>

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
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