import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/user", { withCredentials: true })
      .then((response) => {
        console.log("✅ User Data:", response.data); // Debugging
        if (response.data) {
          setUser(response.data);
        } else {
          navigate("/"); // Redirect if not logged in
        }
      })
      .catch((error) => {
        console.error("❌ Auth Error:", error); // Debugging
        navigate("/");
      })
      .finally(() => {
        setLoading(false); // Set loading to false after request
      });
  }, [navigate]);

  if (loading) {
    return <div className="container text-center mt-5"><p>Loading...</p></div>;
  }

  return (
    <div className="container text-center mt-5">
      {user ? (
        <>
          <h1>Welcome, {user.name}!</h1>
          <p>Here are your personalized AI-powered news summaries.</p>
          <a
            href="http://localhost:5000/auth/logout"
            className="btn btn-danger"
          >
            Logout
          </a>
        </>
      ) : (
        <p>Redirecting to home...</p>
      )}
    </div>
  );
}

export default Dashboard;