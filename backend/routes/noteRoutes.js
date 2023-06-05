const express = require("express")
const router = express.Router();

const RateController = require("../controller/rateController")

router.post("/add_ques", RateController.addQuestion)
router.post("/start_survey", RateController.Survey)
router.post("/submit", RateController.submit)

module.exports = router