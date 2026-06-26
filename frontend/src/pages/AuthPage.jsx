import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { login, signUp } from "../services/authService";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

const inputClassName =
  "w-full rounded-lg border-2 border-black bg-white px-4 py-3 text-black outline-none placeholder:text-black/40 focus:ring-2 focus:ring-black";

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
    } catch {
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
    } catch {
      toast.error("Something went wrong");
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-100">
      <nav className="flex justify-end px-8 py-6">
        <button
          type="button"
          onClick={openLogin}
          className="rounded-lg bg-black px-5 py-2.5 font-medium text-white hover:bg-black/80"
        >
          Login
        </button>
      </nav>

      <section className="flex min-h-[calc(100vh-88px)] items-center justify-center px-6 text-center">
        <div className="relative max-w-4xl">
          <img
            src="/hat-svgrepo-com.svg"
            alt="Summer hat"
            className="absolute -top-14 left-1/2 z-10 h-20 w-20 -translate-x-1/2 rotate-[-18deg] drop-shadow sm:-top-20 sm:h-28 sm:w-28"
          />

          <h1 className="rounded-2xl border-2 border-black bg-white px-8 py-10 text-5xl font-bold leading-tight text-black sm:text-6xl lg:text-7xl">
            Ready for Summer Activity
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-lg text-black/70">
            Discover camps, outdoor fun, and simple summer adventures.
          </p>

          <button
            type="button"
            onClick={openSignup}
            className="mt-8 rounded-lg bg-black px-6 py-3 font-semibold text-white hover:bg-black/80"
          >
            Create Account
          </button>
        </div>
      </section>

      {showAuthPanel && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 px-4">
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border-2 border-black bg-white p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-black">
                  {isSignup ? "Create Account" : "Login"}
                </h1>

                <p className="mt-2 text-black/70">
                  {isSignup
                    ? "Create your Summer Activity account"
                    : "Welcome back to Summer Activity"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAuthPanel(false)}
                className="rounded-lg px-3 py-1 text-2xl text-black hover:bg-yellow-200"
              >
                &times;
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
                  className={inputClassName}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  required
                  minLength={MIN_PASSWORD_LENGTH}
                  autoComplete="current-password"
                  className={inputClassName}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  onClick={handleLogin}
                  disabled={authLoading}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-black py-3 font-semibold text-white hover:bg-black/80 disabled:opacity-50"
                >
                  {authLoading ? "Logging in..." : "Login"}
                </button>

                <p className="text-center text-black/70">
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsSignup(true)}
                    className="cursor-pointer font-semibold text-black underline"
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
                  className={inputClassName}
                  onChange={(e) => setFullName(e.target.value)}
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={signupEmail}
                  required
                  inputMode="email"
                  autoComplete="email"
                  className={inputClassName}
                  onChange={(e) => setSignupEmail(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={signupPassword}
                  required
                  minLength={MIN_PASSWORD_LENGTH}
                  autoComplete="new-password"
                  className={inputClassName}
                  onChange={(e) => setSignupPassword(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  required
                  minLength={MIN_PASSWORD_LENGTH}
                  autoComplete="new-password"
                  className={inputClassName}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <div className="flex gap-6 text-black">
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
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-black py-3 font-semibold text-white hover:bg-black/80 disabled:opacity-50"
                >
                  {authLoading ? "Creating..." : "Create Account"}
                </button>

                <p className="text-center text-black/70">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsSignup(false)}
                    className="cursor-pointer font-semibold text-black underline"
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
