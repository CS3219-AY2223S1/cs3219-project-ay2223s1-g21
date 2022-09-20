import express from 'express';
import cors from 'cors';

import { getRandomQuestion } from './controller/question-controller.js';

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use(cors()) // this line would enable cors for all cors requests
// app.options('http://127.0.0.1:3000', cors())
app.use(cors({
  origin: process.env.CLIENT_DOMAIN,
  credentials: true
}));

app.use((req, res, next) => {
    res.setHeader('content-type', 'application/json');
    next();
});

// Controller will contain all the question-defined Routes
app.get('/', (_, res) => res.send('Hello World from question-service'))
app.get('/question', getRandomQuestion)

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => console.log(`question-service listening on port ${PORT}`));

export default app;