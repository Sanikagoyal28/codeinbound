import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import welcome from "./Assets/welcome.svg"
import "./styles.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as ReactBootstrap from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux"
import { JoinThunk, reset } from "../redux/rateSlice";

function Welcome() {

    const [email, setEmail] = useState('')
    const loading = useSelector((r)=>r.loading)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleStart(e) {
        e.preventDefault()
        dispatch(JoinThunk(email))
            .then((res) => {
                if (res.payload.data.success) {
                    localStorage.setItem("email", email)
                    toast.success(res.payload.data.msg, {
                        position: "top-right",
                        theme: "light",
                        autoClose: 5000,
                    });
                    dispatch(reset())
                    navigate("/rating")
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

    useEffect(() => {
        if (loading) {
            document.body.style.opacity = 0.5;
        }
        else {
            document.body.style.opacity = 1;
        }
    }, [loading])

    return <>
        <div className="welcome">
            <p className="head">Welcome Back</p>
            <p className="text">It is a rating application to record the survey of each customer for the Shop <b>Kiosk</b></p>
            <form onSubmit={handleStart}>
                <label className="email">Email Address</label><br />
                <input type="text" className="emailInput" required placeholder="Enter your email" value={email} onChange={(e) => { setEmail(e.target.value) }} /><br />
                <button type="submit" className="submit">Start</button>
            </form>
            <img src={welcome} className="welcomeImg" />
        </div>
        <ToastContainer />
        {loading ? <ReactBootstrap.Spinner animation="border" variant="light" id="Spinner" /> : null}
    </>
}

export default Welcome