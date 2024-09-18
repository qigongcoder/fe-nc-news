import "./Article.css";
import { fetchArticleByID } from "./api";
import CommentsList from "./CommentsList";
import PostComment from "./PostComment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Article = () => {
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { article_id } = useParams();
  const { extension } = useParams();
  const [articleID, setArticleID] = useState(article_id);
  useEffect(() => {
    setIsLoading(true);
    fetchArticleByID(articleID).then((article) => {
      setArticle(article);
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
        <div>
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
                <p>votes: {article.votes}</p>
              </div>
            </div>
          </div>
          {extension != "comments" ? (
            <CommentsList articleID={articleID} />
          ) : (
            <PostComment articleID={articleID} />
          )}
        </div>
      )}
    </main>
  );
};
