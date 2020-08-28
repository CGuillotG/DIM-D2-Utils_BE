require('dotenv').config({ path: '.env' }) //Import Env Variables

const express = require('express') //The Web Framework
const mongoose = require('mongoose') //MongoDB ODM for Node
const cors = require('cors') //CORS middleware
const logger = require('morgan') //Http Requests Logger
const chalk = require('chalk')

mongoose.connect(process.env.DB || "mongodb://localhost/dimd2utils", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(x => {
    console.log(chalk`{green Connected to Mongo!} Database name: {magenta ${x.connections[0].db.databaseName}}`)
})
.catch(err => console.error('Error connecting to mongo', err))

const app = express()

//CORS config
app.use(
    cors({
        origin: true, // [process.env.FRONTEND_ENDPOINT],
        credentials: true // Passes the Access-Control-Allow-Credentials header
    })
)

// Middleware Setup
app.use(logger('dev')) // dev: concise output colored by response status for development use


module.exports = app