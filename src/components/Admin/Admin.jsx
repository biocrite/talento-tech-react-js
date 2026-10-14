import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "@firebase-config/firebase.js";

export function Admin() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <main>
      <h1>Admin dashboard</h1>
      <p>Welcome to your administration panel!</p>

      <button onClick={handleLogout}>
        Log out
      </button>
    </main>
  );
}