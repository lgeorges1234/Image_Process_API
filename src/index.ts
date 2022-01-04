import express from 'express';

const app = express();
const port = 3000;

// static files
// app.use(express.static("public"));
// app.use("/css", express.static(__dirname + "public/css"));
// app.use("/img", express.static(__dirname + "public/img"));
// app.use("/js", express.static(__dirname + "public/js"));

// Listen on port 3000
app.listen(port, () => {
  console.log(`listening on port: ${port};`);
});
