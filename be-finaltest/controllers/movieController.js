import MovieModel from "../models/movie.schema.js";
import UserModel from "../models/user.schema.js";

const movieController = {
    getMovies: async(req, res) => {
        try {
            const movie = await MovieModel.find();
            res.status(200).send(movie)
        } catch (error) {
            res.status(500).json({message: error.message})
        } 
    },

    createMovie: async(req, res) => {
        try {
            const newMovie = req.body;
            const result = await MovieModel.create(newMovie);
            res.status(200).send(newMovie)
        } catch(error) {
            res.status(500).json({message: error.message})
        }
    },

    updateMovie: async(req, res) => {
        const {name} = req.params;
        const {time, year, image, introduce} = req.body

        try {
            const updatedMovie = await MovieModel.findOneAndUpdate({name}, {time, year, image, introduce}, {new: true})

            if(!updatedMovie){
                res.status(400).send('Movie not found')
            }
            res.status(200).send(updatedMovie)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },

    deleteMovie: async(req, res) => {
        const name = req.body;
        try {
            const movie = await MovieModel.findOneAndDelete({name})
            
            if (!movie) {
                res.status(404).send({message: "movie not found"})
            }

            res.status(200).send("delete",movie)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },

    findByname: async(req, res) => {
        const {name} = req.query;
        if (!name) {
            return res.status(400).send({ message: 'Requires query' }); // Handle missing name
        }

        try {
            const movie = await MovieModel.find({name});
            if(!movie) {
                return res.status(404).send({message: 'Movie not found'});
            }
            res.status(200).send(movie);
        } catch(error) {
            res.status(500).json({ message: error.message });
        }
    }

}

export default movieController;