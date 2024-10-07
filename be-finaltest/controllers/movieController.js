import MovieModel from "../models/movie.schema.js";

const movieController = {
    getMovies: async(req, res) => {
        const movie = await MovieModel.find();
        res.status(200).send(movie)
    }
}

export default movieController;