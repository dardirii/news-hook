import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const url = 'https://newsapi.org/v2/top-headlines?country=id&apiKey=4ddad75f151740bcbc45fc0243f1a0e2';

    fetch(url)
      .then(res => res.json())
      .then(resJson => {
        console.log(resJson);
        setArticles(resJson.articles);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const renderArticles = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>{error}</p>;
    }

    return articles.map(article => (
      <div className="card col-3 m-1" style={{ width: "18rem" }}>
        <img src={article.urlToImage} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{article.title}</h5>
          <p className="card-subtitle mb-2 text-body-secondary">{article.publishedAt}</p>
          <a href={article.url} className="btn btn-primary">Read More</a>
        </div>
      </div>
    ));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const searchQuery = document.getElementById('search').value;
    const newUrl = `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=4ddad75f151740bcbc45fc0243f1a0e2`;

    setLoading(true);
    setError("");

    fetch(newUrl)
      .then(res => res.json())
      .then(resJson => {
        console.log(resJson);
        setArticles(resJson.articles);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div>
      <Container>
        <form id="myForm" onSubmit={handleSubmit}>
          <input type="text" id="search" />
          <button type="submit">Search</button>
        </form>
        <div id="data">
          {renderArticles()}
        </div>
      </Container>
    </div>
  );
};

export default News;
