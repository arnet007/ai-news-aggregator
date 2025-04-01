import React from "react";

function Home() {
  return (
    <div className="container text-center mt-5">
      <h1>Welcome to AI News Aggregator</h1>
      <p>Get personalized AI-powered news summaries from multiple sources.</p>

      <div className="d-flex flex-column align-items-center gap-3 mt-4">
        <a href="http://localhost:5000/auth/google" className="btn btn-primary rounded-circle px-4 py-2">
          Login with Google
        </a>
        <a href="http://localhost:5000/auth/github" className="btn btn-dark rounded-circle px-4 py-2">
          Login with GitHub
        </a>
      </div>
    </div>
  );
}

export default Home;