import express from 'express';
import cors from 'cors';
import sequelize from './config/database';
import { User } from './models/user';
import { UserProfile } from './models/user-profile';
import userRoutes from './routes/user.routes';

const API_PORT = 4444;

const app = express();
app.use(express.json());
app.use(cors());
app.use('/users', userRoutes);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction ) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

const startServer = async () => {
  try {
    User.associate();
    UserProfile.associate();

    await sequelize.sync({ force: true });

    app.listen(API_PORT, () => console.log(`Server running on http://localhost:${API_PORT}`));
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
