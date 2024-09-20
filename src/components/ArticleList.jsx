import "./ArticleList.css";
import { fetchArticles, fetchTopics } from "./api";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

export const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoadingArticles, setisLoadingArticles] = useState(false);
  const [isLoadingTopics, setisLoadingTopics] = useState(false);
  const [topics, setTopics] = useState([]);
  const [sortAscendDescend, setSortAscendDescend] = useState(true);
  const [sortTopic, setSortTopic] = useState("");
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
    //topic is extracted from the URL
    //topics is the list of topics derived from the database
    if (
      !(
        topic === undefined ||
        topics.map((object) => object.slug).includes(topic)
      )
    ) {
      navigate("/notfound");
    }
  }, []);

  useEffect(() => {
    setisLoadingArticles(true);
    fetchArticles().then((articles) => {
      setisLoadingArticles(false);

      /*my backend does not have this api yet, so I'm doing it here*/
      let sortedArticles = articles;

      if (sortAscendDescend && sortTopic === "comment_count") {
        sortedArticles = articles.sort(
          (a, b) => a.comment_count - b.comment_count
        );
      } else if (!sortAscendDescend && sortTopic === "comment_count") {
        sortedArticles = articles.sort(
          (a, b) => b.comment_count - a.comment_count
        );
      }

      if (sortAscendDescend && sortTopic === "votes") {
        sortedArticles = articles.sort((a, b) => a.votes - b.votes);
      } else if (!sortAscendDescend && sortTopic === "votes") {
        sortedArticles = articles.sort((a, b) => b.votes - a.votes);
      }

      if (sortAscendDescend && sortTopic === "created_at") {
        sortedArticles = articles.sort((a, b) =>
          a.created_at.localeCompare(b.created_at)
        );
      } else if (!sortAscendDescend && sortTopic === "created_at") {
        sortedArticles = articles.sort((a, b) =>
          b.created_at.localeCompare(a.created_at)
        );
      }
      /*my backend does not have the api to do this, so I'm doing this here*/
      if (topic === undefined || topic === "") {
        setArticles(sortedArticles);
      } else {
        const filteredData = sortedArticles.filter(
          (object) => object.topic === topic
        );
        setArticles(filteredData);
      }
    });
  }, [topic, sortAscendDescend, sortTopic]);

  const handleTopicsButton = (topic) => {
    if (topic === "") {
      navigate(`/`);
    } else {
      {
        navigate(`/${topic}`);
      }
    }
  };

  const handleAscendDescendButton = () => {
    setSortAscendDescend((state) => !state);
  };

  const handleSortTopicdButton = (topicSort) => {
    setSortTopic(topicSort);
  };

  return (
    <main>
      <h2>Here are our articles</h2>
      {isLoadingTopics ? <p>loading topics</p> : <p>Choose a topic</p>}
      <div id="topic-buttons">
        <button onClick={() => handleTopicsButton("")}>All topics</button>
        {topics.map((topic, i) => {
          return (
            <button onClick={() => handleTopicsButton(topic.slug)} key={i}>
              {topic.slug}
            </button>
          );
        })}
        <p>Would you like to sort your articles?</p>
        <button onClick={() => handleAscendDescendButton()}>
          Ascending/Descending
        </button>
        <button onClick={() => handleSortTopicdButton("comment_count")}>
          Comment Count
        </button>
        <button onClick={() => handleSortTopicdButton("created_at")}>
          Date
        </button>
        <button onClick={() => handleSortTopicdButton("votes")}>
          Number of Votes
        </button>
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
                  <div className="link-container"></div>
                  <div className="item-details">
                    <h3>
                      <Link
                        to={`/articles/${article.article_id}`}
                        className="nav-link"
                      >
                        {article.title}
                      </Link>
                    </h3>
                    <p>Date: {article.created_at.slice(0, 10)}</p>
                    <p>topc: {article.topic}</p>
                    <p>author: {article.author} </p>
                    <p>Comment Count: {article.comment_count}</p>
                    <p>Votes: {article.votes}</p>
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
