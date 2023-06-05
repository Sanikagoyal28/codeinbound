const { Errorhandler } = require("../middleware/errorHandler")
const Question = require("../models/quesModel")
const User = require("../models/userModel")

const addQuestion = async (req, res, next) => {
    try {
        const { question, rating, text } = req.body

        const new_note = await Question.create({
            question,
            rating,
            text
        })

        return res.status(200).json({ success: true, msg: "Sign in successfully" })
    }
    catch (err) {
        return next(new Errorhandler(err))
    }
}

const Survey = async (req, res, next) => {
    try {
        const { email } = req.body

        if (!email)
            return next(new Errorhandler("Email is required", 400))

        const find_user = await User.findOne({ email: email.toLowerCase() })

        if (find_user && find_user.isCompleted)
            return next(new Errorhandler("You've already responded", 400))

        if (!find_user)
            await User.create({
                email: email.toLowerCase()
            })

        const questions = await Question.find({})

        return res.status(201).json({ success: true, msg: "Sign in successfully", questions })
    }
    catch (err) {
        return next(new Errorhandler(err))
    }
}

const submit = async (req, res, next) => {
    try {
        const { email, answers } = req.body

        if (!email)
            return next(new Errorhandler("Email is required", 400))

        const find_user = await User.findOne({ email: email.toLowerCase() })

        if (!find_user)
            return next(new Errorhandler("User not found", 400))

        const x = await User.updateOne({ email: email.toLowerCase() }, {
            "answers.$.rating": answers[0].rating,
            'answers.text': answers[0].text,
            'answers.question': answers[0].ques_id
        })

        console.log(x)

        // for (var i = 0; i < answers.length; i++) {
        //     console.log(answers[i])
        //     await User.updateOne({ email: email.toLowerCase() }, {
        //         // 'answers.question': answers[i].ques_id,
        //         "answers.$.rating": answers[i].rating,
        //         'answers.text':answers[i].text
        //     })
        // }
        return res.status(201).json({ success: true })

    }
    catch (err) {
        return next(new Errorhandler(err))
    }
}


module.exports = {
    Survey,
    addQuestion,
    submit
}
