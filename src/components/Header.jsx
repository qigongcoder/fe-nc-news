import "./Header.css";
import { Link } from "react-router-dom";
export const Header = () => {
  return (
    <header id="welcome-header">
      <h1>
        <Link to="/">Welcome to NC News</Link>
      </h1>
    </header>
  );
};
