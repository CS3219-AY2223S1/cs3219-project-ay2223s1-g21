import express from 'express';
import cors from 'cors';
import { submitCompileRequest, getCompileResult } from './controller/compile-controller.js';

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use(cors()) // this line would enable cors for all cors requests
// app.options('http://127.0.0.1:3000', cors())
app.use(cors({
  origin: process.env.CLIENT_DOMAIN,
}));


const router = express.Router();


router.get('/', (_, res) => res.send('Hello World from compile-service'))
app.use("/api", router).all((_, res) => {
  res.setHeader('content-type', 'application/json');
})

router.post("/send_compile_request", submitCompileRequest)
router.post("/get_result", getCompileResult)


const PORT = process.env.PORT || 5555;

app.listen(PORT, () => console.log(`compile-service listening on port ${PORT}`));

export default app;