import "./ArticleList.css";
import { fetchArticles, fetchTopics } from "./api";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

export const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoadingArticles, setisLoadingArticles] = useState(false);
  const [isLoadingTopics, setisLoadingTopics] = useState(false);
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  const { topic } = useParams();

  useEffect(() => {
    setisLoadingTopics(true);
    fetchTopics()
      .then((topics) => {
        setTopics(topics);
        setisLoadingTopics(false);
      })
      .catch(() => {
        alert("error loading topics");
      });
  }, []);

  useEffect(() => {
    setisLoadingArticles(true);
    fetchArticles().then((data) => {
      setisLoadingArticles(false);

      if (topic === undefined || topic === "") {
        setArticles(data.articles);
      } else {
        const filteredData = data.articles.filter(
          (object) => object.topic === topic
        );
        setArticles(filteredData);
      }
    });
  }, [topic]);

  const handleTopicsButton = (topic) => {
    if (topic === "") {
      navigate(`/`);
    } else {
      {
        navigate(`/${topic}`);
      }
    }
  };

  return (
    <main>
      <h2>Article List</h2>
      {isLoadingTopics ? <p>loading topics</p> : <p>your topics are</p>}
      <div id="topic-buttons">
        <button onClick={() => handleTopicsButton("")}>All topics</button>
        {topics.map((topic, i) => {
          return (
            <button onClick={() => handleTopicsButton(topic.slug)} key={i}>
              {topic.slug}
            </button>
          );
        })}
      </div>
      {isLoadingArticles ? (
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
                      to={`/articles/${article.article_id}`}
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
