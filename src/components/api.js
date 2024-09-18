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

export const fetchArticleByID = (id) => {
  return NewsApi.get(`/articles/${id}`).then((data) => {
    return data.data.article;
  });
};

export const fetchComments = (article_id) => {
  return NewsApi.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return data;
  });
};

export const postComment = (article_id, postData) => {
  console.log(postData, "<--post data from postComment");
  return NewsApi.post(`/articles/${article_id}/comments`, postData)
    .then(({ data }) => {
      console.log("success from api.js");
      return data;
    })
    .catch((error) => {
      console.log("Error submitting post:", error);
      alert("Failed submit item, please try again.");
    });
};
