import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CSS/Login.css";
import shopping from "../Components/Assets/shopping.png";
import { supabase } from "../client";
import { ShopContext } from "../Context/ShopContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, user } = useContext(ShopContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    // handle email confirmation redirect
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("access_token");
    const refreshToken = urlParams.get("refresh_token");
    if (accessToken && refreshToken) {
      supabase.auth
        .setSession({ access_token: accessToken, refresh_token: refreshToken })
        .then(() => {
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname,
          );
          setSuccess("Email confirmed successfully! You are now logged in.");
          setTimeout(() => navigate("/"), 2000);
        })
        .catch(() => {
          setError("Failed to confirm email. Please log in manually.");
        });
    } else if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await login(formData.email, formData.password);
      setSuccess("Login successful! Redirecting...");
      setFormData({ email: "", password: "" });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasskeyLogin = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Check if WebAuthn is supported
      if (!window.PublicKeyCredential) {
        throw new Error("Passkeys are not supported on this device");
      }

      // Call WebAuthn API to get passkey credentials
      const assertion = await navigator.credentials.get({
        publicKey: {
          challenge: new Uint8Array(32), // In production, get this from your server
          timeout: 60000,
          userVerification: "preferred",
        },
      });

      if (!assertion) {
        throw new Error("Passkey authentication was cancelled");
      }

      setSuccess("Passkey authentication successful! Redirecting...");

      // Redirect to home after successful login
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError(
        err.message || "Passkey authentication failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Logo at top left */}
      <Link to="/" className="login-logo" style={{ textDecoration: "none" }}>
        <img src={shopping} alt="Logo" />
        <p>SHOPPER</p>
      </Link>

      {/* Modal Container */}
      <div className="login-container">
        {/* Header */}
        <h1>Log in</h1>
        <p className="login-subtitle">
          Welcome Back. Continue to Shop with us!
        </p>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="login-fields">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Password Input */}
          <div className="login-fields">
            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="login-continue-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="login-separator">
          <span className="separator-line"></span>
          <span className="separator-text">or</span>
          <span className="separator-line"></span>
        </div>

        {/* Passkey Button */}
        <button
          type="button"
          className="passkey-btn"
          onClick={handlePasskeyLogin}
          disabled={loading}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 1.5C10.243 1.5 11.25 2.507 11.25 3.75V6H12.75C13.576 6 14.25 6.674 14.25 7.5V15C14.25 15.826 13.576 16.5 12.75 16.5H5.25C4.424 16.5 3.75 15.826 3.75 15V7.5C3.75 6.674 4.424 6 5.25 6H6.75V3.75C6.75 2.507 7.757 1.5 9 1.5ZM9 3C8.586 3 8.25 3.336 8.25 3.75V6H9.75V3.75C9.75 3.336 9.414 3 9 3Z"
              fill="currentColor"
            />
            <circle cx="9" cy="11.25" r="1.5" fill="currentColor" />
          </svg>
          {loading ? "Verifying passkey..." : "Sign in with passkey"}
        </button>

        {/* Social Buttons - Horizontal */}
        <div className="login-social-buttons">
          {/* <button className="login-social-btn apple-btn">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
              <path d="M13.5 3c-.15.75-.48 1.35-1.05 1.8-.57.45-1.32.675-2.25.675-.15 0-.3 0-.45-.015.15-.75.45-1.35.9-1.8.45-.45 1.05-.705 1.8-.765.03.15.03.285.03.375 0 .3-.03.57-.03.93zm1.785 4.5c1.35 0 2.4.525 3.15 1.575.75 1.08.975 2.565.675 4.455-.3 1.95-.9 3.45-1.8 4.5-.87 1.05-1.875 1.575-3.015 1.575-.45 0-.9-.075-1.35-.225-.45-.15-.93-.345-1.44-.585-.33-.15-.705-.24-1.125-.27-.42-.03-.825.03-1.215.18-.39.15-.78.345-1.17.585-.42.21-.855.345-1.305.405-.45.06-.9-.015-1.35-.225-1.14-.45-2.085-1.29-2.835-2.52C1.05 15.45.525 13.575.525 11.175c0-1.65.39-3.075 1.17-4.275.78-1.2 1.935-1.875 3.465-2.025.42-.03.84.015 1.26.135.42.12.825.285 1.215.495.39.21.75.39 1.08.54.27.12.54.195.81.225.27.03.525.015.765-.045.6-.15 1.155-.345 1.665-.585.51-.24.975-.42 1.395-.54.42-.12.825-.18 1.215-.18z" />
            </svg>
          </button>
          <button className="login-social-btn facebook-btn">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
              <path d="M9 0C4.03 0 0 4.03 0 9c0 4.5 3.285 8.22 7.59 8.91v-6.3H5.31V9h2.28V7.02c0-2.25 1.34-3.49 3.39-3.49.98 0 2.01.175 2.01.175v2.21h-1.13c-1.11 0-1.46.69-1.46 1.4V9h2.48l-.4 2.61h-2.08v6.3C14.715 17.22 18 13.5 18 9c0-4.97-4.03-9-9-9z" />
            </svg>
          </button> */}
          <button className="login-social-btn google-btn">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M17.64 9.20454C17.64 8.56636 17.5827 7.95272 17.4764 7.36363H9V10.845H13.8436C13.635 11.97 13.0009 12.9231 12.0477 13.5613V15.8195H14.9564C16.6582 14.2527 17.64 11.9454 17.64 9.20454Z"
                fill="#4285F4"
              />
              <path
                d="M9 18C11.43 18 13.467 17.1941 14.9564 15.8195L12.0477 13.5613C11.2418 14.1013 10.2109 14.4204 9 14.4204C6.65455 14.4204 4.67182 12.8372 3.96409 10.71H0.957275V13.0418C2.43818 15.9831 5.48182 18 9 18Z"
                fill="#34A853"
              />
              <path
                d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40681 3.78409 7.82999 3.96409 7.28999V4.95818H0.957273C0.347727 6.17318 0 7.54772 0 9C0 10.4523 0.347727 11.8268 0.957273 13.0418L3.96409 10.71Z"
                fill="#FBBC05"
              />
              <path
                d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65455 3.57955 9 3.57955Z"
                fill="#EA4335"
              />
            </svg>
          </button>
        </div>

        {/* Sign up link */}
        <p className="login-signup-link">
          New to Shopper? <Link to="/login-signup">Get started →</Link>
        </p>

        {/* Footer Links */}
        <div className="login-footer-links">
          <a href="#help">Help</a>
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
