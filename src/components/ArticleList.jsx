import "./ArticleList.css";
import { fetchArticles } from "./api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchArticles().then((data) => {
      setArticles(data.articles);
      setIsLoading(false);
    });
  }, []);

  return (
    <main>
      <h2>Article List</h2>
      {isLoading ? (
        <div id="loading">
          <h3>Loading</h3>
        </div>
      ) : (
        <div id="article-list-wrapper">
          <ul id="artilce-list">
            {articles.map((article) => {
              return (
                <li className="article-card" key={article.article_id}>
                  <img
                    className="article-image"
                    src={article.article_img_url}
                    alt={article.title}
                  ></img>
                  <div className="link-container">
                    <Link
                      to={`/article/${article.article_id}`}
                      className="nav-link"
                    >
                      To Article
                    </Link>
                  </div>
                  <div className="item-details">
                    <h3>{article.title}</h3>
                    <p>author: {article.author} </p>
                    <p>topc: {article.topic}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </main>
  );
};

/*
                      <button className="button-style">To Article</button>
*/
