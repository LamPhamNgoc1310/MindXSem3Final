import express from 'express'
import multer from 'multer'
import movieController from '../controllers/movieController.js'

const movieRouter = express.Router();

const storage = multer.memoryStorage();

movieRouter.get('/', movieController.getMovies);
movieRouter.post('/', movieController.getMovies);

export default movieRouter
