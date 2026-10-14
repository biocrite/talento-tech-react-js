
import { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "@firebase-config/firebase.js";
import { useAuth } from "@context";

import "./Login.css";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { isAdmin, authLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Refresh the token so the latest admin claim is checked.
      const token = await credential.user.getIdTokenResult(true);

      if (token.claims.admin !== true) {
        await signOut(auth);
        setError("This account does not have administrator access.");
        return;
      }

      navigate("/admin", { replace: true });
    } catch (err) {
      console.error("Login failed:", err);
      setError("Could not sign in. Check your email and password.");
    } finally {
      setSubmitting(false);
    }
  };


if (authLoading) {
  return (
    <div className="login-page">
      <p className="login-loading">Checking authentication...</p>
    </div>
  );
}

if (isAdmin) {
  return (
    <div className="login-page">
      <section className="login-card">
        <h1>You're signed in</h1>
        <p className="login-description">
          Your administrator account is ready.
        </p>
        <button
          className="login-button"
          onClick={() => navigate("/admin", { replace: true })}
        >
          Go to admin dashboard
        </button>
      </section>
    </div>
  );
}

return (
  <main className="login-page">
    <section className="login-card">
      <h1>Admin login</h1>
      <p className="login-description">
        Sign in to manage your shop.
      </p>

      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="username"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {error && (
          <p className="login-error" role="alert">
            {error}
          </p>
        )}

        <button
          className="login-button"
          type="submit"
          disabled={submitting}
        >
          {submitting ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </section>
  </main>
);


}
