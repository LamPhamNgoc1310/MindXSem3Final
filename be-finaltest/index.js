import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import movieRouter from './routers/movieRouter.js'

await mongoose.connect('mongodb+srv://phamngoclam1310:Abc123@finaltest.orhi4.mongodb.net/')

const app = express()
app.use(express.json)
app.use(cors())

app.use('/movies', movieRouter)

app.listen(8080, ()=> {
    console.log('server is running at port 8080');
    
})