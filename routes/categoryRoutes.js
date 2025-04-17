import express from 'express';
import { getCategories, createCategory } from '../controllers/categoryController.js';
import { authenticate } from '../middlewares/authMiddleware.js'; 

const router = express.Router();
/**
 * @swagger
 * /api/v1/categories:
 *  get:
 *    summary: Gauti kategorijų sarašą
 *    tags: [Kategorijos]
 *    responses:
 *      200:
 *        description: Sąrašas gražintas
 *  post:
 *    summary: Naujos kategorijos kūrimas
 *    tags: [Kategorijos]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      content:
 *        application/json:
 *          schema: 
 *            type: object
 *            required: [name]
 *            properties:
 *              name:
 *                type: string
 *    responses:
 *      201:
 *        description: Prisijungta sekmingai
 */
router  
    .route('/')
    .get(getCategories)
    .post(authenticate, createCategory)

export default router;