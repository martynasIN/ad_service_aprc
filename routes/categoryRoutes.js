import express from 'express';
import { getCategories, createCategory } from '../controllers/categoryController.js';
import { authenticate } from '../middlewares/authMiddleware.js'; 

const router = express.Router();

router  
    .route('/')
    .get(getCategories)
    .post(authenticate, createCategory)

export default router;