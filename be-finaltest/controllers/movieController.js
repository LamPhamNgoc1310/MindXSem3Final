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
        const {name, newName, newID, newTime, newYear,newImage,newIntroduce} = req.body

        try {
            const movie = await MovieModel.findOne({name})
            if(!movie) {
                res.status(404).send({message: 'movie not found'})
            }
            
            if (newName) {
                const existingMovie = await MovieModel.findOne({name: newName});
                if(existingMovie) {
                    res.status(400).send({message: 'movie name in use'})
                }
                movie.name = newName;
            }
            if(newID) movie.ID = newID;
            if(newTime) movie.ID = newTime;
            if(newYear) movie.ID = newYear;
            if(newImage) movie.ID = newImage;
            if(newIntroduce) movie.ID = newIntroduce;

            const updatedMovie = await movie.save();

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
    }

}

export default movieController;