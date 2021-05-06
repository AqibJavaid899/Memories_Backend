import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import postRoutes from './routes/Post.js'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

// MIDDLEWARES
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

// ROUTES MIDDLEWARE
app.use('/posts', postRoutes)

app.get('/', (req, res) => {
    res.send("Hello to our Memories API")
})

// CONNECTING TO MONGODB ATLAS
const PORT = process.env.PORT || 5000
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server is up and running on PORT ${PORT}`)))
    .catch((error) => console.log(error.message))

mongoose.set('useFindAndModify', false)