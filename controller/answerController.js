const dbConnection = require("../db/dbconfig");
const {StatusCodes} = require("http-status-codes")

// get answers for specific question
async function queryAnswers({questionid}) {
    const [answers] = await dbConnection.query(
        "SELECT answer,username from answers join users on answers.userid=users.userid where questionid=?" ,
        [questionid]
    )

    return answers
}

async function getAllAnswers(req,res) {
    const {questionid} = req.params;
    try {
        const response = await queryAnswers({questionid});
        res.status(StatusCodes.OK).json(response)
    } catch (error) {
        console.log(error.message)
        res.status(StatusCodes.BAD_REQUEST).json({msg:"error when geting Answers"})
    }
}

// add answer
const addAnswer = async (req, res) =>{
        const answerid = Math.floor(100000 + Math.random()*900000).toString();
        const {answer} = req.body;
        const {questionid} = req.params;
        const userid = req.user.userid;
    if(!answer || !answerid || !userid || !questionid){
        return res.status(StatusCodes.BAD_REQUEST).json({msg: "Please provide all required fields"})
    }
    try {
        await dbConnection.query(
        "INSERT INTO answers (answerid, userid, questionid, answer) VALUE(?,?,?,?)",
        [answerid,userid,questionid,answer]
    )
        return res.status(StatusCodes.CREATED).json({msg:"Answer posted Successfully!"})
    } catch (error) {
        console.log(error.message)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"An error occure when posting the answer!"})
    }

}

module.exports = {getAllAnswers, addAnswer}