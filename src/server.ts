import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './handlers/user';
import productRouter from './handlers/product';
import orderRoutes from './handlers/order';
const app: express.Application = express()
const address: string = "0.0.0.0:3000"
let port = 3000;
app.use(bodyParser.json())
const corsOption = {
    origin: '',
    optionsSuccessStatus: 200
}

app.use(cors(corsOption))
app.get('/', function (req: Request, res: Response) {
    res.send('Hello World! 1');
})

userRoutes(app);
productRouter(app);
orderRoutes(app);

if (process.env.ENV === 'test') {
    console.log('asdasdasda', process.env.ENV);
    port = 3001;
}

app.listen(port, function () {
    console.log(`starting app on: ${address}`)
})

export default app;
