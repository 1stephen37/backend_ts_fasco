import express, {Request, Response, Router} from 'express';
import usersRouter from "./routes/users/index";
import categoriesRouter from "./routes/categories/index";
import productsRouter from "./routes/products/index";
import ordersRouter from "./routes/orders/index";
import order_detailRouter from "./routes/order_details/index";
import wrapRouter from "./routes/wrap/index";
import shopRouter from "./routes/shop/index";
import vouchersRouter from './routes/vouchers/index'
import deliveriesRouter from './routes/deliveries/index'
import reviewsRouter from './routes/reviews/index'
import sequelize from "./sequelize";
import bodyParser from 'body-parser';
import cors from "cors";
import path from "path";

const app = express();
const port = 3000;

app.use(cors());

app.use(express.static(path.join(path.resolve(__dirname, '../'), 'public')));

app.use(bodyParser.json());

sequelize.authenticate()
    .then(() => console.log('Connected to the database.'))
    .catch((err) => console.log(err.message))

app.get('/', (req : Request, res : Response) => {
  res.send('Hello this is my website api of stephen Nguyen (aka37)');
});

const apiRouter: Router = express.Router();

apiRouter.use('/users', usersRouter);
apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/products', productsRouter);
apiRouter.use('/orders', ordersRouter);
apiRouter.use('/order_details', order_detailRouter);
apiRouter.use('/wrap', wrapRouter);
apiRouter.use('/shop', shopRouter);
apiRouter.use('/vouchers', vouchersRouter);
apiRouter.use('/deliveries', deliveriesRouter);
apiRouter.use('/reviews', reviewsRouter);

app.use('/api/v1', apiRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
