import Dialog from '@mui/material/Dialog';
import { useEffect, useState } from 'react';
import "./styles.css"
import { useNavigate } from 'react-router';
import thankyou from "./Assets/thankyou.svg"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as ReactBootstrap from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux"
import { SubmitThunk, addAns, decrement, increment } from '../redux/rateSlice';

function Rating() {

    const [open, setOpen] = useState(false)
    const [thanku, setThanku] = useState(false)
    const [rating, setRating] = useState(0)
    const [rate, setRate] = useState()
    const [ques, setQues] = useState(1)
    const [text, setText] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const loading = useSelector((r) => r.loading)
    const count = useSelector((r) => r.count)
    const questions = useSelector((r) => r.questions)
    const answers = useSelector((r) => r.answers)

    useEffect(() => {
        if (thanku) {
            setTimeout(() => {
                navigate("/")
            }, 5000)
        }
    }, [thanku])

    useEffect(() => {
        if (count > 0 || count === 0) {
            for (var i = 0; i < questions.length; i++) {
                if (i === count) {
                    setQues(questions[i].question)
                    setRating(questions[i].rating)
                    setRate('')
                    setText('')
                }
            }
        }
    }, [count])

    var circles = document.getElementsByClassName("circle")

    useEffect(() => {
        var rate;
        for (var i = 0; i < answers.length; i++) {
            if (answers[i].ques_id === questions[count]._id) {
                rate = answers[i].rating
            }
        }

        handleRating(rate)
    }, [answers, count])

    function handleRating(rate) {

        for (var i = 0; i < circles.length; i++) {
            if (i === rate - 1) {
                circles[i].style.backgroundColor = "rgb(250, 52, 52)";
                circles[i].style.color = "#fff";
                circles[i].style.borderColor = "#fff";
                setRate(rate)
            }
            else {
                circles[i].style.backgroundColor = "#fff";
                circles[i].style.color = "#000";
                circles[i].style.borderColor = "#000";
            }
        }
    }

    function handleNext() {
        if (rate != '' || text != '') {
            const data = {
                'ques_id': questions[count]._id,
                'rating': rate,
                "text": text
            }

            dispatch(addAns(data))
        }
        
        handleRating(circles.length + 1)
        if (count + 1 === questions.length)
            setOpen(true)
        else {
            dispatch(increment())
            setRate('')
        }
    }

    function handlePrev() {
        dispatch(decrement())
    }

    function handleSubmit() {
        const data = {
            email: localStorage.getItem("email"),
            answers
        }

        if (answers.length < questions.length - 1) {
            toast.error("You can only skip 1 question", {
                position: "top-right",
                theme: "light",
                autoClose: 5000,
            });
        }
        else {
            dispatch(SubmitThunk(data))
                .then((res) => {
                    if (res.payload.data.success) {
                        toast.success(res.payload.data.msg, {
                            position: "top-right",
                            theme: "light",
                            autoClose: 5000,
                        });
                        setThanku(true)
                        localStorage.clear()
                    }
                    if (res.payload.status === 400) {
                        toast.error(res.payload.data.msg, {
                            position: "top-right",
                            theme: "light",
                            autoClose: 5000,
                        });
                    }
                })
        }
    }

    useEffect(() => {
        if (loading) {
            document.body.style.opacity = 0.5;
        }
        else {
            document.body.style.opacity = 1;
        }
    }, [loading])

    useEffect(() => {
        if (count === 0) {
            document.getElementsByClassName("prev")[0].style.visibility = "hidden"
        }
        else {
            document.getElementsByClassName("prev")[0].style.visibility = "visible"
        }
    }, [count])

    return <>

        <div className="rating">
            <p className="head">Customer Survey</p>
            <p className="count">{count + 1}/{questions.length}</p>
            <p className="question">{count + 1}. {ques}</p>
            <div className="ratingFlex">
                {rating === 5 ? <>
                    <div className="circle" onClick={() => { handleRating(1) }} >1</div>
                    <div className="circle" onClick={() => { handleRating(2) }} >2</div>
                    <div className="circle" onClick={() => { handleRating(3) }} >3</div>
                    <div className="circle" onClick={() => { handleRating(4) }} >4</div>
                    <div className="circle" onClick={() => { handleRating(5) }} >5</div>
                </> :
                    rating === 10 ? <>
                        <div className="circle" onClick={() => { handleRating(1) }} >1</div>
                        <div className="circle" onClick={() => { handleRating(2) }} >2</div>
                        <div className="circle" onClick={() => { handleRating(3) }} >3</div>
                        <div className="circle" onClick={() => { handleRating(4) }} >4</div>
                        <div className="circle" onClick={() => { handleRating(5) }} >5</div>
                        <div className="circle" onClick={() => { handleRating(6) }} >6</div>
                        <div className="circle" onClick={() => { handleRating(7) }} >7</div>
                        <div className="circle" onClick={() => { handleRating(8) }} >8</div>
                        <div className="circle" onClick={() => { handleRating(9) }} >9</div>
                        <div className="circle" onClick={() => { handleRating(10) }} >10</div>
                    </> : null
                }
                {rating === 0 ? <textarea placeholder='Enter text' id="textarea" value={text} onChange={(e) => setText(e.target.value)} /> : null}
            </div>
            <div className='buttons'>
                <button type="button" className="prev" onClick={() => { handlePrev() }}>Prev</button>
                <button type="button" className="next" onClick={() => { handleNext() }}>Next</button>
            </div>
        </div >

        {/* confirmation dialog */}
        < Dialog open={open} onClose={() => { setOpen(false) }
        } PaperProps={{
            sx: {
                maxWidth: 600,
                maxHeight: 500,
                marginTop: 0
            }
        }}
            keepMounted >
            <div className="dialog">
                <p className="dialogHead">Submit the Survey</p>
                <p className="dialogContent">You can fill out the survey form only once. So, are you ready to submit the survey.</p>
                <button className="submit dialogBtn" type="button" onClick={() => { handleSubmit() }}>Submit</button>
            </div>
        </Dialog >

        {/* thankyou dialog */}
        < Dialog open={thanku} onClose={() => { setThanku(false) }} PaperProps={{
            sx: {
                maxWidth: 600,
                maxHeight: 500,
                marginTop: 0
            }
        }}
            keepMounted >
            <div className="dialog">
                <p className="dialogHead">You have already responded.</p>
                <p className="dialogContent">Thanks for your time for submitting the survey.</p>
                <img src={thankyou} className='tqImg' />
            </div>
        </Dialog >

        <ToastContainer />
        {loading ? <ReactBootstrap.Spinner animation="border" variant="light" id="Spinner" /> : null}
    </>
}

export default Rating