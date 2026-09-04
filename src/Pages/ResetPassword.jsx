import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CSS/Login.css";
import shopping from "../Components/Assets/shopping.png";
import { supabase } from "../client";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("request");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadRecoverySession = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      try {
        if (code) {
          const { error: exchangeError } =
            await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) throw exchangeError;
          window.history.replaceState(
            {},
            document.title,
            `${window.location.pathname}${window.location.hash}`,
          );
        }

        const { data, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        if (isMounted && data.session) setMode("update");
      } catch (sessionError) {
        if (isMounted) {
          setError(
            "This reset link is invalid or has expired. Request a new one.",
          );
        }
      }
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        setMode("update");
      }
    });

    loadRecoverySession();
    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleRequestReset = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email,
        { redirectTo: `${window.location.origin}/reset-password` },
      );
      if (resetError) throw resetError;
      setSuccess("Check your email for a link to reset your password.");
      setEmail("");
    } catch (resetError) {
      setError(resetError.message || "Unable to send the reset email.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (password.length < 6) {
      setError("Your password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("The passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });
      if (updateError) throw updateError;
      setSuccess("Password updated successfully. Redirecting to login...");
      await supabase.auth.signOut();
      setTimeout(() => navigate("/login-page", { replace: true }), 1200);
    } catch (updateError) {
      setError(updateError.message || "Unable to update your password.");
    } finally {
      setLoading(false);
    }
  };

  const isUpdate = mode === "update";

  return (
    <div className="login-page">
      <Link to="/" className="login-logo" style={{ textDecoration: "none" }}>
        <img src={shopping} alt="Logo" />
        <p>SHOPPER</p>
      </Link>

      <div className="login-container">
        <h1>{isUpdate ? "Create a new password" : "Reset password"}</h1>
        <p className="login-subtitle">
          {isUpdate
            ? "Choose a strong password for your account."
            : "Enter your email and we will send you a secure reset link."}
        </p>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={isUpdate ? handleUpdatePassword : handleRequestReset}>
          {isUpdate ? (
            <>
              <div className="login-fields">
                <label htmlFor="new-password">New password</label>
                <input
                  id="new-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your new password"
                  autoComplete="new-password"
                  required
                />
              </div>
              <div className="login-fields">
                <label htmlFor="confirm-password">Confirm password</label>
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Confirm your new password"
                  autoComplete="new-password"
                  required
                />
              </div>
            </>
          ) : (
            <div className="login-fields">
              <label htmlFor="reset-email">Email</label>
              <input
                id="reset-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                autoComplete="email"
                required
              />
            </div>
          )}

          <button
            className="login-continue-btn"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : isUpdate
                ? "Update password"
                : "Send reset link"}
          </button>
        </form>

        <p className="login-signup-link">
          <Link to="/login-page">Back to login</Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
