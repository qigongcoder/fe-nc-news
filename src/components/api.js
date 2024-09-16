import axios from "axios";

const NewsApi = axios.create({
  baseURL: "https://ncapi.onrender.com/api/",
});

export const fetchArticles = (topic) => {
  return NewsApi.get("/articles", {
    params: {
      type: topic,
    },
  }).then(({ data }) => {
    return data;
  });
};
