import axios from "axios";

const NewsApi = axios.create({
  baseURL: "https://ncapi.onrender.com/api/",
});

export const fetchArticles = () => {
  return NewsApi.get("/articles").then(({ data }) => {
    return data.articles;
  });
};

export const fetchTopics = () => {
  return NewsApi.get("/topics").then((data) => {
    return data.data.topics;
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

export const changeVote = (article_id, voteData) => {
  return NewsApi.patch(`/articles/${article_id}/`, voteData)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.log("Error submitting changing vote", error);
      alert("Failed submit item, please try again.");
    });
};

export const deleteComment = (comment_id) => {
  return NewsApi.delete(`/comments/${comment_id}`)
    .then(() => {
      return;
    })
    .catch((error) => {
      console.log("Error from deletecomment:", error);
      alert("The followin error occured:", body.message);
    });
};
