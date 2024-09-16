import "./ArticleList.css";
import { fetchArticles } from "./api";
import { useEffect, useState } from "react";

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
    <>
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
                  <div>
                    <img
                      className="article-image"
                      src={article.article_img_url}
                      alt={article.title}
                    ></img>
                    <div className="button-container">
                      <button className="button-style">To Article</button>
                    </div>

                    <div className="item-details">
                      <h3>{article.title}</h3>
                      <p>author: {article.author} </p>
                      <p>topc: {article.topic}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};
