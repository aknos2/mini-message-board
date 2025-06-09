import express from 'express';
import { indexRouter } from './routes/indexRouter.js';
import path from "path";
import { fileURLToPath } from 'url';
import { formRouter } from './routes/formRouter.js';
import { logRouter } from './routes/logRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

// Routes
app.use('/', indexRouter);
app.use('/new', formRouter);
app.use('/log', logRouter);

const PORT = 3000;
app.listen(PORT, (req, res) => {
  console.log(`Listening on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});