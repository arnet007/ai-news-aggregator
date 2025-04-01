import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/auth/user", { credentials: "include" }) // Fetch user info
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setUser(data);
          navigate("/dashboard"); // Redirect if logged in
        }
      })
      .catch((err) => console.error(err));
  }, [navigate]);

  return (
    <div>
      <h1>Welcome to the App</h1>
      <a href="http://localhost:5000/auth/google">
        <button>Login with Google</button>
      </a>
    </div>
  );
};

export default Home;
