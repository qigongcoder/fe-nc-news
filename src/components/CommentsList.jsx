import "./CommentsList.css";
import { fetchComments } from "./api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CommentsList({ articleID }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchComments(articleID).then((data) => {
      setComments(data.comments);
      setIsLoading(false);
    });
  }, []);

  return (
    <main>
      <nav>
        <h2 className="nav-item">Comments List</h2>
        <Link to={`/articles/${articleID}/comments`} className="nav-link">
          <h2 className="nav-item">Post a Comment</h2>
        </Link>
      </nav>
      {isLoading ? (
        <div id="loading">
          <h3>Loading</h3>
        </div>
      ) : (
        <div id="comments-list-wrapper">
          <ul id="comments-list">
            {comments.map((comment) => {
              return (
                <li className="comment-card" key={comment.comment_id}>
                  <div className="item-details">
                    <p className="author">author: {comment.author} </p>
                    <p>{comment.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </main>
  );
}
