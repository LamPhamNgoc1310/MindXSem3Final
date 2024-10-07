import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    ID: Number,
    name: String,
    time: Number,
    year: Number,
    image: String,
    introduce: String
})

const MovieModel = mongoose.model('movies', movieSchema);

export default MovieModel;