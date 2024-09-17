import "./Article.css";
import { fetchArticleByID } from "./api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Article = () => {
  const [article, setArtcile] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { article_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetchArticleByID(article_id).then((article) => {
      setArtcile(article.article);
      setIsLoading(false);
    });
  }, []);

  return (
    <main>
      <h2>Article</h2>
      {isLoading ? (
        <div className="loading">
          <h3>Loading</h3>
        </div>
      ) : (
        <div id="article-wrapper">
          <div className="article-card">
            <img
              className="article-image"
              src={article.article_img_url}
              alt={article.title}
            ></img>
            <div className="item-details">
              <h3>{article.title}</h3>
              <p>{article.body}</p>
              <p>author: {article.author} </p>
              <p>topc: {article.topic}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
