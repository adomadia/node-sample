import express from 'express';
import bodyParser from 'body-parser';
import dfsummaryRoutes from './routes/df-summary.route';
import cors from 'cors';
import morgan from 'morgan';
const PORT = 4020;
const app = express();

app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms')
);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
//enable cors
app.use(cors());

app.use('/xyz', dfsummaryRoutes);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
