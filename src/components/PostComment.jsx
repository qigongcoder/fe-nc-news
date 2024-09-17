import "./PostComment.css";
import { Link } from "react-router-dom";

export default function PostComment({ articleID }) {
  return (
    <>
      <nav>
        <Link to={`/article/${articleID}`} className="nav-link">
          <h2 className="nav-item">Comments List</h2>
        </Link>
        <h2 className="nav-item">Post a Comment</h2>
      </nav>
    </>
  );
}
