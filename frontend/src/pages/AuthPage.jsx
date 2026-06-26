import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { login, signUp } from "../services/authService";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

const isValidEmail = (value) => EMAIL_REGEX.test(value.trim());

const AuthPage = () => {
  const [showAuthPanel, setShowAuthPanel] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fullName, setFullName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("guest");

  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const openLogin = () => {
    setIsSignup(false);
    setShowAuthPanel(true);
  };

  const openSignup = () => {
    setIsSignup(true);
    setShowAuthPanel(true);
  };

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
      setAuthLoading(true);
      const data = await login({
        email: email.trim().toLowerCase(),
        password,
      });

      if (data.error) {
        toast.error(data.error);
        return;
      }

      setUser(data);

      if (data.userType === "host") {
        navigate("/host/dashboard");
      } else {
        navigate("/guest/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!validateSignup()) {
      return;
    }

    try {
      setAuthLoading(true);
      const data = await signUp({
        fullName: fullName.trim(),
        email: signupEmail.trim().toLowerCase(),
        password: signupPassword,
        confirmPassword,
        userType,
      });

      if (data.error) {
        toast.error(data.error);
        return;
      }

      toast.success("Account created. Please login.");
      setIsSignup(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-yellow-100 via-orange-100 to-amber-200">
      <div className="absolute -left-32 top-16 h-96 w-96 rounded-full bg-yellow-200/40 blur-3xl" />
      <div className="absolute right-0 top-40 h-[28rem] w-[28rem] rounded-full bg-orange-200/25 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-amber-200/30 blur-3xl" />

      <nav className="relative z-10 flex justify-end px-8 py-6">
        <button
          type="button"
          onClick={openLogin}
          className="rounded-full bg-orange-500 px-6 py-3 font-semibold text-white shadow-lg hover:bg-orange-600"
        >
          Login
        </button>
      </nav>

      <section className="relative z-10 flex min-h-[calc(100vh-96px)] items-center justify-center px-6 text-center">
        <div className="relative max-w-5xl">
          <img
            src="/hat-svgrepo-com.svg"
            alt="Summer hat"
            className="absolute -top-16 left-1/2 z-20 h-24 w-24 -translate-x-1/2 rotate-[-18deg] drop-shadow-lg sm:-top-24 sm:h-32 sm:w-32"
          />

          <h1 className="relative rounded-[2rem] bg-white/60 px-8 py-8 text-5xl font-black leading-tight text-orange-950 shadow-2xl backdrop-blur-md sm:text-7xl lg:text-8xl">
            Ready for Summer Activity
          </h1>

          <p className="mx-auto mt-6 max-w-2xl rounded-full bg-white/60 px-6 py-3 text-lg font-semibold text-orange-900 shadow backdrop-blur-md">
            Discover sunny camps, outdoor fun, and happy little adventures.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={openSignup}
              className="rounded-full bg-orange-500 px-8 py-4 text-lg font-bold text-white shadow-lg hover:bg-orange-600"
            >
              Create Account
            </button>
          </div>
        </div>
      </section>

      {showAuthPanel && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-orange-950/35 px-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl border border-white/50 bg-orange-950/75 p-8 shadow-2xl backdrop-blur-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold text-white">
                  {isSignup ? "Create Account" : "Login"}
                </h1>

                <p className="mt-2 text-white/70">
                  {isSignup
                    ? "Join the summer fun"
                    : "Welcome back to Summer Activity"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAuthPanel(false)}
                className="rounded-full bg-white/20 px-3 py-1 text-2xl text-white hover:bg-white/30"
              >
                ×
              </button>
            </div>

            {!isSignup ? (
              <div className="mt-8 space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  required
                  inputMode="email"
                  autoComplete="email"
                  className="w-full rounded-xl bg-white/20 px-4 py-3 text-white outline-none placeholder:text-orange-50/60 focus:ring-2 focus:ring-yellow-300"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  required
                  minLength={MIN_PASSWORD_LENGTH}
                  autoComplete="current-password"
                  className="w-full rounded-xl bg-white/20 px-4 py-3 text-white outline-none placeholder:text-orange-50/60 focus:ring-2 focus:ring-yellow-300"
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  onClick={handleLogin}
                  disabled={authLoading}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-orange-500 py-3 font-semibold text-white shadow hover:bg-orange-600 disabled:opacity-50"
                >
                  {authLoading ? "Logging in..." : "Login"}
                </button>

                <p className="text-center text-white/70">
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsSignup(true)}
                    className="cursor-pointer font-semibold text-yellow-300"
                  >
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
                  className="w-full rounded-xl bg-white/20 px-4 py-3 text-white outline-none placeholder:text-orange-50/60 focus:ring-2 focus:ring-yellow-300"
                  onChange={(e) => setFullName(e.target.value)}
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={signupEmail}
                  required
                  inputMode="email"
                  autoComplete="email"
                  className="w-full rounded-xl bg-white/20 px-4 py-3 text-white outline-none placeholder:text-orange-50/60 focus:ring-2 focus:ring-yellow-300"
                  onChange={(e) => setSignupEmail(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={signupPassword}
                  required
                  minLength={MIN_PASSWORD_LENGTH}
                  autoComplete="new-password"
                  className="w-full rounded-xl bg-white/20 px-4 py-3 text-white outline-none placeholder:text-orange-50/60 focus:ring-2 focus:ring-yellow-300"
                  onChange={(e) => setSignupPassword(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  required
                  minLength={MIN_PASSWORD_LENGTH}
                  autoComplete="new-password"
                  className="w-full rounded-xl bg-white/20 px-4 py-3 text-white outline-none placeholder:text-orange-50/60 focus:ring-2 focus:ring-yellow-300"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <div className="flex gap-6 text-white">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="userType"
                      value="guest"
                      checked={userType === "guest"}
                      onChange={(e) => setUserType(e.target.value)}
                    />
                    Guest
                  </label>

                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="userType"
                      value="host"
                      checked={userType === "host"}
                      onChange={(e) => setUserType(e.target.value)}
                    />
                    Host
                  </label>
                </div>

                <button
                  type="button"
                  onClick={handleSignUp}
                  disabled={authLoading}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-orange-500 py-3 font-semibold text-white shadow hover:bg-orange-600 disabled:opacity-50"
                >
                  {authLoading ? "Creating..." : "Create Account"}
                </button>

                <p className="text-center text-white/70">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsSignup(false)}
                    className="cursor-pointer font-semibold text-yellow-300"
                  >
                    Login
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthPage;
