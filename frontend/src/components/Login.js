import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  const handleGitHubLogin = () => {
    window.location.href = "http://localhost:5000/auth/github";
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h1 className="mb-4 fw-bold">Login</h1>
      <button className="btn btn-danger mb-3 px-4 py-2" onClick={handleGoogleLogin}>
        Login with Google
      </button>
      <button className="btn btn-dark px-4 py-2" onClick={handleGitHubLogin}>
        Login with GitHub
      </button>
    </div>
  );
};

export default Login;