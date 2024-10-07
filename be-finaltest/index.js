import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import movieRouter from './routers/movieRouter.js'
import userRouter from './routers/userRouter.js'

await mongoose.connect('mongodb+srv://phamngoclam1310:Abc123@finaltest.orhi4.mongodb.net/mongo?retryWrites=true&w=majority');

const app = express()
app.use(cors())
app.use(express.json())

app.use('/movies', movieRouter)
app.use('/users', userRouter)

app.listen(8080, ()=> {
    console.log('server is running at port 8080');
    
})