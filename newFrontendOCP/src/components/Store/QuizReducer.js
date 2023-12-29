import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    quiz:[],
    error:null,
    marks:0
}

export const postAQuiz = createAsyncThunk('quiz/postEmptyQuiz',async(data,rejectWithValue)=>{
    const response = await fetch('http://localhost:4000/quizSystem/addQuiz',{
        method: "POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(data),
    });
    try {
        const result = await response.json();
        console.log("response from api",result);
        return result;
    } catch (error) {
        return rejectWithValue(error.response);
    }
})


const quizSlice = createSlice({
    name:"Quiz",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(postAQuiz.pending,(state)=>{
            state.loading = true;
        })
        .addCase(postAQuiz.fulfilled,(state,action)=>{
            state.loading = false;
            state.quiz = action.payload;
        })
        .addCase(postAQuiz.rejected,(state,action)=>{
            state.loading= false;
            state.quiz = action.payload;
        })
    }
})

export default quizSlice.reducer;