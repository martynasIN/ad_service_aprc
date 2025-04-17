import express from 'express';
import { getAllAds, createAd, updateAd, deleteAd } from '../controllers/adController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/v1/ads:
 *  get:
 *    summary: Gauti skelbimus arba atlikti paieska ir filtravima
 *    tags: [Skelbimai]
 *    parameters:
 *      - in: query
 *        name: categoryId
 *        schema:
 *          type: integer
 *        description: Filtruoti pagal kategorijos id
 *      - in: query
 *        name: search
 *        schema: 
 *          type: string
 *        description: Ieškoti pagal pavadinimą arba aprašymą
 *    responses:
 *      200:
 *        description: Skelbimų sąrašas gražintas
 *  post:
 *    summary: Sukurti skelbimą
 *    tags: [Skelbimai]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      content:
 *        application/json:
 *          schema: 
 *            type: object
 *            required: [title, content, categoryId]
 *            properties:
 *              title:
 *                type: string
 *              content: 
 *                type: string
 *              categoryId:
 *                type: integer
 *    responses:
 *      201:
 *        description: Skelbimas sukurtas
 */

router
    .route('/')
    .get(getAllAds)
    .post(authenticate, createAd)


/**
 * @swagger
 * /api/v1/ads/{id}:
 *  put:
 *    summary: Atnaujinti skelbimą
 *    tags: [Skelbimai]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Skelbimas atnaujintas
 *  delete:
 *    summary: Ištrinti skelbimą
 *    tags: [Skelbimai]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Skelbimas ištrintas
 */


router
    .route('/:id')
    .put(authenticate, updateAd)
    .delete(authenticate, deleteAd)


export default router