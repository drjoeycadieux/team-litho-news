import React, { useState, useEffect } from "react";

import "./styles.css";

const NewsApp = () => {
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = process.env.REACT_APP_GNEWS_API_KEY;
        if (!apiKey) {
          throw new Error("GNews API key is missing.");
        }

        const apiUrl = `https://gnews.io/api/v4/top-headlines?country=ca&token=${apiKey}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        setNewsData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="alerts">
        <p>Breaking News!</p>
      </div>
      <div className="header">
        <p>TeamLitho - News</p>
      </div>
      <h1>Top Headlines</h1>

      {loading && <p>Loading...</p>}

      {error && <p id="error">Error: {error}</p>}

      {newsData && (
        <ul>
          {newsData.articles.map((article, index) => (
            <li key={index}>
              <div className="article-image">
                {article.image && (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="article-image"
                  />
                )}
              </div>
              <h2>{article.title}</h2>
              <h4>{article.name}</h4>
              <p>{article.description}</p>
              <h3>{article.publishedAt}</h3>
              <a
                id="btn"
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read more
              </a>
            </li>
          ))}
        </ul>
      )}

      <div className="footerModule">
        <p>&copy; Copyright TeamLitho 2023.</p>
      </div>
    </div>
  );
};

export default NewsApp;
