import React, { useState, useEffect } from "react";
import "./styles.css"; // Import the CSS file

const NewsApp = () => {
  const [newsData, setNewsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = "06b89d08762d56a13cb3b24ca1887455"; // Replace with your GNews API key
        const apiUrl = `https://gnews.io/api/v4/top-headlines?country=ca&token=${apiKey}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        setNewsData(data);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="header">
        <p>TeamLitho - News</p>
      </div>
      <h1>Top Headlines</h1>
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
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
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
