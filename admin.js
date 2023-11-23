require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors');
const connectDB = require('./src/libs/dbConnection')

const { ADMIN_PREFIX, ADMIN_PORT } = process.env

const routesAPI = require('./src/admin')
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(ADMIN_PREFIX, routesAPI)


//errors
app.use((req, res) => res.status(404).json({ status: false, message: "Route Not Found", data: [] }))
app.use((err, req, res, next) => {
    console.log("request error: ", err)
    return res.status(400).json({ status: false, message: "Error In Request", data: [] })
})


const status = `| Server Started [ADMIN] - ${Date()} - [PORT:${ADMIN_PORT}] |`
connectDB(status.length)

app.listen(ADMIN_PORT, () => {
    console.log(`${"".padStart(status.length, "-")}\n${status}`)
})