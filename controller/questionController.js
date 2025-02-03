const dbConnection = require("../db/dbconfig");
const {StatusCodes} = require("http-status-codes")

// get all questions

const questions = async (req, res)=>{
    try {
        const [result] = await dbConnection.query(
        `SELECT 
            questions.questionid, 
            questions.title, 
            questions.description, 
            users.username
        FROM  questions
        JOIN users 
        ON questions.userid = users.userid
        ORDER BY 
            questions.id DESC;
        `
    )
        res.status(StatusCodes.OK).json({msg:"Success",result})
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.BAD_REQUEST).json({msg:"error when getting question"})
    }
} 

// add question
const addQuestion = async (req, res) =>{
    const {userid}=req.user
    const questionid = Math.floor(100000 + Math.random()*900000).toString();
    const {title, description} = req.body
    if(!title || !description || !userid || !questionid){
        return res.status(StatusCodes.BAD_REQUEST).json({msg: "Please provide all required fields"})
    }
    try {
        await dbConnection.query("INSERT INTO questions (questionid, userid, title, description) VALUES (?, ?,  ?, ?)", [questionid, userid, title, description])
        return res.status(StatusCodes.CREATED).json({msg: "Question posted successfully"})
    } catch (error) {
        console.log(error.message)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"something went wrong, try again later!"})
    }

}

// get a single question
async function querySingleQuestions({questionid}) {
    const [result] = await dbConnection.query(
        `SELECT 
            title,description
        FROM 
            questions
        where questionid=?`,
        [questionid]
    )
    return result
}

async function getSingleQuestions(req,res) {
    const {questionid} = req.params;
    try {
        const response = await querySingleQuestions({questionid})
        res.status(StatusCodes.OK).json({msg:"Success",response})
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.BAD_REQUEST).json({msg:"error when geting question"})
    }
}

module.exports = {questions, addQuestion, getSingleQuestions}