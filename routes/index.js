import express from 'express';
const router = express.Router();
import { userController, newsFeedController } from '../controller';

router.post('/add-user', userController.addUser);
router.get('/list_newsfeed',newsFeedController.listNewsFeed);
router.get('/generate_newsfeed',newsFeedController.generateNewsFeed);

export default router;