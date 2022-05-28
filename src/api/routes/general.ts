import express from "express";
import {
  country
} from "../controllers";

const router = express.Router();

/**
 * @swagger
 * /general/country:
 *  get:
 *    tags: [General]
 *    description: Get Country
 *    responses:
 *      200:
 *        description: Success
 *        content: {}
 *
 */
router.get("/country", country.controller);

export default router;