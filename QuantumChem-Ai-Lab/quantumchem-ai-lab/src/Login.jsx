import React, { useState, useEffect } from "react";
import { Atom, Mail, Lock, Eye, EyeOff, Sparkles, Info } from "lucide-react";

const chemistryFacts = [
  "Water expands when it freezes, unlike most other substances.",
  "Helium is the only element that cannot be solidified by cooling alone.",
  "Your body contains enough carbon to provide lead for about 9,000 pencils.",
  "Graphene is a single layer of carbon atoms, 200 times stronger than steel.",
  "A single drop of water contains about 1.67 sextillion molecules.",
  "Glass is actually a supercooled liquid, not a true solid.",
  "Liquid oxygen is pale blue and strongly magnetic."
];

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [factIndex, setFactIndex] = useState(0);

  // Rotate chemistry facts
  useEffect(() => {
    const timer = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % chemistryFacts.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!isSignUp && email && password) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        onLogin({
          email,
          name: email.split("@")[0],
        });
        setLoading(false);
      }, 1000);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      onLogin({
        email,
        name,
      });
      setLoading(false);
    }, 1000);
  };

  const handleAutoFill = () => {
    setEmail("demo@quantumchem.com");
    setPassword("password123");
  };

  const getPasswordStrength = (pwd) => {
    if (!pwd) return null;
    if (pwd.length < 6) return { text: "Too short", color: "text-red-500", barColor: "bg-red-400", width: "w-1/3" };
    
    const hasLetters = /[a-zA-Z]/.test(pwd);
    const hasNumbers = /[0-9]/.test(pwd);
    const hasSpecial = /[^a-zA-Z0-9]/.test(pwd);
    
    if (hasLetters && hasNumbers && hasSpecial && pwd.length >= 8) {
      return { text: "Strong 💪", color: "text-emerald-600", barColor: "bg-emerald-500", width: "w-full" };
    }
    if ((hasLetters && hasNumbers) || (hasLetters && hasSpecial) || (hasNumbers && hasSpecial)) {
      return { text: "Medium 🛡️", color: "text-amber-500", barColor: "bg-amber-500", width: "w-2/3" };
    }
    return { text: "Weak ⚠️", color: "text-orange-500", barColor: "bg-orange-400", width: "w-1/3" };
  };

  const strength = getPasswordStrength(password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-slate-50 to-teal-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements (Pastel colors) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-violet-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white bg-opacity-70 backdrop-blur-xl rounded-3xl shadow-xl shadow-indigo-100/50 border border-white border-opacity-60 p-8">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <Atom className="text-indigo-600 w-10 h-10 animate-spin" style={{ animationDuration: '8s' }} />
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              QuantumChem
            </h1>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-slate-800 text-center mb-1">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-slate-500 text-center mb-8">
            {isSignUp
              ? "Join QuantumChem AI Lab"
              : "Login to QuantumChem AI Lab"}
          </p>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={
              isSignUp ? handleSignUp : handleLogin
            }
          >
            {/* Name Field (Sign Up Only) */}
            {isSignUp && (
              <div className="mb-6">
                <label className="block text-slate-700 font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
                  placeholder="Enter your name"
                />
              </div>
            )}

            {/* Email Field */}
            <div className="mb-6">
              <label className="block text-slate-700 font-semibold mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-indigo-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-6 relative">
              <label className="block text-slate-700 font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-indigo-500" />
                <input
                  type={
                    showPassword ? "text" : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
                  placeholder={
                    isSignUp
                      ? "Min 6 characters"
                      : "Enter password"
                  }
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-3.5 text-slate-400 hover:text-indigo-500 transition"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>

              {/* Password strength meter for sign up */}
              {isSignUp && strength && (
                <div className="mt-2">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-slate-500">Password Strength:</span>
                    <span className={`font-semibold ${strength.color}`}>{strength.text}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className={`h-full transition-all duration-300 ${strength.barColor} ${strength.width}`}></div>
                  </div>
                </div>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            {!isSignUp && (
              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-indigo-650 focus:ring-indigo-500 focus:ring-opacity-25 w-4 h-4"
                  />
                  <span className="text-xs text-slate-500 font-medium">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert("Demo Password recovery: Use the quick autofill demo credentials below!")}
                  className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold hover:shadow-lg hover:shadow-indigo-500/25 transition disabled:opacity-50 mb-4"
            >
              {loading
                ? "Processing..."
                : isSignUp
                  ? "Create Account"
                  : "Login"}
            </button>
          </form>

          {/* Toggle Sign Up / Login */}
          <div className="text-center">
            <span className="text-slate-500">
              {isSignUp
                ? "Already have an account? "
                : "Don't have an account? "}
            </span>
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError("");
                setEmail("");
                setPassword("");
                setName("");
              }}
              className="text-indigo-600 font-semibold hover:text-indigo-700 transition"
            >
              {isSignUp ? "Login" : "Sign Up"}
            </button>
          </div>

          {/* Demo Credentials Container (Now clickable to autofill) */}
          {!isSignUp && (
            <button
              type="button"
              onClick={handleAutoFill}
              className="w-full mt-6 p-4 rounded-xl bg-indigo-50 border border-indigo-100 hover:bg-indigo-100/50 active:bg-indigo-100 transition text-left group relative overflow-hidden"
            >
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-indigo-950 text-xs font-bold flex items-center gap-1">
                  <Sparkles size={12} className="text-indigo-650 animate-pulse" />
                  Quick Demo Access
                </span>
                <span className="text-[10px] bg-indigo-200 bg-opacity-70 text-indigo-700 px-2 py-0.5 rounded-full font-semibold group-hover:scale-105 transition">
                  Click to Autofill
                </span>
              </div>
              <p className="text-indigo-700 text-xs">
                Email: <span className="font-mono selection:bg-indigo-200">demo@quantumchem.com</span>
              </p>
              <p className="text-indigo-700 text-xs">
                Password: <span className="font-mono selection:bg-indigo-200">password123</span>
              </p>
            </button>
          )}

          {/* Chemistry Fact Carousel */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-start gap-2.5 text-slate-500">
            <Info size={16} className="text-indigo-500 shrink-0 mt-0.5" />
            <div className="min-h-[44px]">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-0.5">Did you know?</span>
              <p className="text-xs leading-relaxed text-slate-600 transition-all duration-500 ease-in-out">
                {chemistryFacts[factIndex]}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
