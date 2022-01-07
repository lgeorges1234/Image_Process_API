import express from 'express';
import routes from './routes/index';

const app = express();
const port = 3000;

// static files
// app.use(express.static("public"));
// app.use("/css", express.static(path.join(__dirname, 'public/css'));
// app.use("/img", express.static(path.join(__dirname, 'public/image'));
// app.use("/js", express.static(path.join(__dirname, 'public/js'));

app.use('/api', routes);

// Listen on port 3000
app.listen(port, () => {
  console.log(`listening on port: ${port};`);
});

export default app;
