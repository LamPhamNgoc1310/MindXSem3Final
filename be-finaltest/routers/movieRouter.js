import express from 'express'
import multer from 'multer'
import movieController from '../controllers/movieController.js'

const movieRouter = express.Router();

const storage = multer.memoryStorage();

movieRouter.post('/create-movie', movieController.createMovie);
movieRouter.get('/', movieController.getMovies);
movieRouter.put('/update-movie/:name', movieController.updateMovie)
movieRouter.delete('/delete-movie', movieController.deleteMovie);
movieRouter.get('/find', movieController.findByname);

export default movieRouter
