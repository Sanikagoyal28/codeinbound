import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Baseurl from "./Baseurl";

const initialState = {
    loading: false,
    questions: [],
    msg: '',
    count: 0,
    answers: []
}

const JoinThunk = createAsyncThunk("survey", async (email) => {
    return await Baseurl.post("start_survey", { email })
        .then((res) => {
            return res
        })
        .catch((Err) => {
            return Err.response
        })
})

const SubmitThunk = createAsyncThunk("submit_survey", async (data) => {
    return await Baseurl.post("submit", data)
        .then((res) => {
            return res
        })
        .catch((Err) => {
            return Err.response
        })
})


const RateSlice = createSlice({
    name: "questions",
    initialState: initialState,
    reducers: {
        reset:(state, action) => {
            state.count = 0;
        },
        increment: (state, action) => {
            state.count = state.count + 1;
        },
        decrement: (state, action) => {
            state.count = state.count - 1;
        },
        addAns: (state, action) => {
            console.log(action.payload)
            const ques = state.answers.findIndex((n) => n.ques_id == action.payload.ques_id)
            if (ques > 0 || ques === 0)
                state.answers[ques] = action.payload
            if (ques === -1)
                state.answers = [action.payload, ...state.answers]
        }
    },
    extraReducers: (builder) => {

        builder.addCase(JoinThunk.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(JoinThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.msg = action.payload.data.msg
            state.questions = action.payload.data.questions
        })
        builder.addCase(JoinThunk.rejected, (state, action) => {
            state.loading = false;
        })

        builder.addCase(SubmitThunk.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(SubmitThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.msg = action.payload.data.msg
        })
        builder.addCase(SubmitThunk.rejected, (state, action) => {
            state.loading = false;
        })
    }
})

export default RateSlice

export { JoinThunk, SubmitThunk }

export const { increment, decrement, addAns, reset } = RateSlice.actions
