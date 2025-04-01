import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [news, setNews] = useState([]); // Store summarized news
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/user", { withCredentials: true })
      .then((response) => {
        console.log("✅ User Data:", response.data);
        if (response.data) {
          setUser(response.data);
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("❌ Auth Error:", error);
        navigate("/");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  // Fetch AI-Powered News Summaries
  useEffect(() => {
    if (user) { // Only fetch news if user is authenticated
      axios
        .get("http://localhost:5000/news/fetch") // Ensure the backend is running!
        .then((response) => {
          console.log("✅ News Data:", response.data);
          setNews(response.data);
        })
        .catch((error) => {
          console.error("❌ News Fetch Error:", error);
        });
    }
  }, [user]); // Fetch news only when user is set

  if (loading) {
    return <div className="container text-center mt-5"><p>Loading...</p></div>;
  }

  return (
    <div className="container text-center mt-5">
      {user ? (
        <>
          <h1>Welcome, {user.name}!</h1>
          <p>Here are your personalized AI-powered news summaries.</p>

          {/* 📰 Display News Summaries */}
          {news.length > 0 ? (
            <div className="news-container">
              {news.map((article, index) => (
                <div key={index} className="news-card">
                  <h3>{article.title}</h3>
                  <p>{article.summary}</p>
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    Read more
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p>No news available. Please try again later.</p>
          )}

          <a href="http://localhost:5000/auth/logout" className="btn btn-danger">
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