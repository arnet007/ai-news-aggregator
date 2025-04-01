import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/news/fetch")
      .then((response) => {
        setNews(response.data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching news:", error));
  }, []);

  if (loading)
    return <p className="text-center fs-4 text-primary">Loading...</p>;

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">AI-Powered News</h1>
      <div className="row">
        {news.map((article, index) => (
          <div key={index} className="col-md-6 col-lg-4 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">{article.summary}</p>
                <a
                  href={article.url}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read More →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;