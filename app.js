require("dotenv").config()
const express = require('express')
const app = express();
const port = 5500;
const authMiddleware = require("./middleware/authmiddleware")
const dbConnection = require("./db/dbconfig");
const cors = require("cors")
app.use(cors())


async function start() {
    try {
    const result = await dbConnection.execute("select 'test' ")
    await app.listen(port);
    console.log('database connection is successful')
    console.log(`listening on port ${port}`)
} catch (error) {
    console.log(error.message)
}
}
start();


app.use(express.json())


const userRoute = require("./routes/userRoute")
app.use("/api/users", userRoute)

const questionRoute = require("./routes/questionRoute")
app.use("/api/questions", authMiddleware, questionRoute)

const answerRoute = require("./routes/answerRoute")
app.use("/api/answers", authMiddleware, answerRoute)