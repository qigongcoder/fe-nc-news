import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { ArticleList } from "./components/ArticleList";

function App() {
  return (
    <div id="app">
      <Header />
      <ArticleList />
    </div>
  );
}

export default App;
