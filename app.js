//  to controll ur website

const express = require("express");
const app = express();
const port = 8000;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


// for auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

app.get('/', (req, res) => {
  res.render("index")
});

//  404
app.use((req, res) => {
  res.status(404).send("Sorry can't find that!");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})