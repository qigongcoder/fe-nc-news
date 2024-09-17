import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { ArticleList } from "./components/ArticleList";
import { Article } from "./components/Article";

function App() {
  return (
    <div id="app">
      <Header />
      <Routes>
        <Route path="/" element={<ArticleList />}></Route>
        <Route path="/article/:article_id" element={<Article />}></Route>
        <Route
          path="/article/:article_id/:extension"
          element={<Article />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
