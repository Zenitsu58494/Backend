console.log("Hello world");

const express = require("express");
const app = express();
const port = 3002;
const fs = require("fs");
const cors = require("cors");

app.use(express.json());
app.use(cors());

const readData = () => {
  const data = fs.readFileSync("data/datas.json");
  return JSON.parse(data);
};

const writeData = (data) => {
  const movieString = JSON.stringify(data, null, 2);
  fs.writeFileSync("data/datas.json", movieString);
};

app.get("/data", (req, res) => {
  const movies = readData();
  res.json(movies);
});

app.get("/data/:id", (req, res) => {
  const movieId = Number(req.params.id);
  const movies = readData();

  const movie = movies.find((movie) => movie.id === movieId);

  res.json(movie);
});

app.post("/data", (req, res) => {
  const { name } = req.body;

  const movies = readData();
  const newMovie = { id: Date.now(), name: name };
  movies.push(newMovie);

  writeData(movies);

  res.json(newMovie);
});

app.put("/data/:id", (req, res) => {
  const movieId = Number(req.params.id);
  const { name } = req.body;

  const movies = readData();

  const movieIndex = movies.findIndex((movie) => movie.id === movieId);

  movies[movieIndex] = { id: movieId, name };

  writeData(movies);

  res.send("success");
});

app.delete("/data/:id", (req, res) => {
  const movieId = Number(req.params.id);
  const movies = readData();

  const movieIndex = movies.findIndex((movie) => movie.id === movieId);

  const deletedMovie = movies.splice(movieIndex, 1);

  writeData(movies);

  res.json(deletedMovie[0]);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
