console.log("Hello world");

const express = require("express");
const app = express();
const port = 3002;
const fs = require("fs");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("First");
});

app.get("/data", (req, res) => {
  const data = fs.readFileSync("data/datas.json");
  const movies = JSON.parse(data);
  res.json(movies);
});
app.get("/data/create", (req, res) => {
  const data = fs.readFileSync("data/datas.json");
  const movies = JSON.parse(data);

  movies.push({ id: Date.now(), name: "tired" });
  const movieString = JSON.stringify(movies);
  fs.writeFileSync("data/datas.json", movieString);
  res.json(movieString);
});
app.get("/data/delete", (req, res) => {
  const data = fs.readFileSync("data/datas.json");
  const movies = JSON.parse(data);
  movies.pop();
  const movieString = JSON.stringify(movies);
  fs.writeFileSync("data/datas.json", movieString);
  res.json(movieString);
});

const findById = (req, res) => {
  const movieId = req.params.id;
  const data = fs.readFileSync("data/datas.json");
  const movies = JSON.parse(data);

  const movie = movies.find((movie) => Number(movieId) === movie.id);
  res.json(movie);
};

app.get("/data/delete/:id", findById);
app.delete("/data/delete/:id", (req, res) => {
  const movieId = req.params.id;
  const data = fs.readFileSync("data/datas.json");
  const movies = JSON.parse(data);
  const movie = movies.filter((movie) => Number(movieId) !== movie.id);
  const movieString = JSON.stringify(movie, null, 7);
  fs.writeFileSync("data/datas.json", movieString);
  res.json(movieString);
});
app.put("/data/update/:id", (req, res) => {
  let movieId = req.params.id;
  let name = req.body;
  let data = fs.readFileSync("data/datas.json");
  let movies = JSON.parse(data);
  let movie = movies.find((e) => Number(movieId) === e.id);
  let newarr = movies.filter((movie) => Number(movieId) !== movie.id);
  movie = { id: Date.now(), name: name };
  newarr.push(movie);
  let movieString = JSON.stringify(newarr);
  fs.writeFileSync("data/datas.json", movieString);
  res.json(newarr);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${3002}`);
});
