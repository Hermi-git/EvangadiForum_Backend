require("dotenv").config()
const express = require('express')
const app = express();
const port = 5500;
const authMiddleware = require("./middleware/authmiddleware")
//db connection
const dbConnection = require("./db/dbconfig");
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

//json middleware to extract json data
app.use(express.json())

//user routes middleware
const userRoute = require("./routes/userRoute")
app.use("/api/users", userRoute)

//question routes middleware
const questionRoute = require("./routes/questionRoute")
app.use("/api/questions", authMiddleware, questionRoute)
//answer routes middleware
const answerRoute = require("./routes/answerRoute")
app.use("/api/answers", authMiddleware, answerRoute)


