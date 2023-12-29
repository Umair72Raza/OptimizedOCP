import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    questions:[],
    error:null
}

export const postQuestion = createAsyncThunk('questions/postQuestions',async(data,rejectWithValue)=>{
    const response = await fetch("http://localhost:4000/questionsSystem/createAQues",
    {
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

const quesSlice = createSlice({
    name:"questions",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(postQuestion.pending,(state)=>{
            state.loading = true;
        })
        .addCase(postQuestion.fulfilled,(state,action)=>{
            state.loading = false;
            state.questions = action.payload;
        })
        .addCase(postQuestion.rejected,(state,action)=>{
            state.loading= false;
            state.questions = action.payload;
        })
    }
})

export default quesSlice.reducer;