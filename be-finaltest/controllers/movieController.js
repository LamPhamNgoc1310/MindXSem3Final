import MovieModel from "../models/movie.schema.js";

const movieController = {
    getMovies: async(req, res) => {
        try {
            const movie = await MovieModel.find();
            res.status(200).send(movie)
        } catch (error) {
            res.status(500).json({message: error.message})
        } 
    },

    createMovies: async(req, res) => {
        try {
            const newMovie = req.body;
            const result = await MovieModel.create(newMovie);
            res.status(200).send(newMovie)
        } catch(error) {
            res.status(500).json({message: error.message})
        }
    },

    login: async(req,res) => {
        try{

        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}

export default movieController;