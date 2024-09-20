import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { ArticleList } from "./components/ArticleList";
import { Article } from "./components/Article";
import { NotFound } from "./components/NotFound";

function App() {
  return (
    <div id="app">
      <Header />
      <Routes>
        <Route path="/:topic" element={<ArticleList />}></Route>
        <Route path="/" element={<ArticleList />}></Route>
        <Route path="/articles/:article_id" element={<Article />}></Route>
        <Route
          path="/articles/:article_id/:extension"
          element={<Article />}
        ></Route>
        <Route path="/notfound" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
