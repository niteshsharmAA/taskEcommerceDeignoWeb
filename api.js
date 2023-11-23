require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors');
const connectDB = require('./src/libs/dbConnection')

const { API_PREFIX, API_PORT } = process.env

const routesAPI = require('./src/api')
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(API_PREFIX, routesAPI)


//errors
app.use((req, res) => res.status(404).json({ status: false, message: "Route Not Found", data: [] }))
app.use((err, req, res, next) => {
    console.log("request error: ", err)
    return res.status(400).json({ status: false, message: "Error In Request", data: [] })
})


const status = `| Server Started [API] - ${Date()} - [PORT:${API_PORT}] |`
connectDB(status.length)

app.listen(API_PORT, () => {
    console.log(`${"".padStart(status.length, "-")}\n${status}`)
})