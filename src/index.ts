import express, { Request, Response} from 'express';
import usersRouter from "./routes/users/index";
import categoriesRouter from "./routes/categories/index";
import sequelize from "./sequelize";

const app = express();
const port = 3000;

sequelize.authenticate()
    .then(() => console.log('Connected to the database.'))
    .catch((err) => console.log(err.message))

app.get('/', (req : Request, res : Response) => {
  res.send('Hello World 1 123 dadkljasjlkdqeqw3!');
});

app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});