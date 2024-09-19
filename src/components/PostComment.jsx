import "./PostComment.css";
import { postComment } from "./api";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function PostComment({ articleID }) {
  const { article_id } = useParams();
  const [postData, setPostData] = useState({
    username: "grumpy19",
    body: "",
  });
  const navigate = useNavigate();

  const HandleChange = (event) => {
    setPostData({
      username: "grumpy19",
      body: event.target.value,
    });
    //setPostData({ ...postData, [event.target.name]: event.target.value });
  };

  const HandleSubmit = (event) => {
    event.preventDefault();
    postComment(article_id, postData)
      .then((data) => {
        alert("Post successful");
        navigate(`/articles/${articleID}`);
      })
      .catch((error) => {
        console.log("Error submitting post:", error);
        alert("Failed submit item, please try again.");
      });
  };

  return (
    <>
      <nav>
        <Link to={`/articles/${articleID}`} className="nav-link">
          <h2 className="nav-item">Comments List</h2>
        </Link>
        <h2 className="nav-item">Post a Comment</h2>
      </nav>
      <form onSubmit={HandleSubmit}>
        <h3>Post Comment</h3>
        <p>Username: {postData.username}</p>
        <label>
          Body:
          <input
            id="body"
            type="text"
            name="body"
            size="200"
            value={postData.body}
            onChange={HandleChange}
            required
          />
        </label>
        <button type="submit">Publish Post</button>
      </form>
    </>
  );
}
