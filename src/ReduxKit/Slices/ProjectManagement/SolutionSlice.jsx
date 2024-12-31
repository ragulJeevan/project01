import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { SolutionApi } from "../../../Apis/ProjectManagement";


const userDetail = JSON.parse(localStorage.getItem('user'));

export const fetchSolution = createAsyncThunk("Solution/fetchSolution",async ()=>{
    const data = await SolutionApi?.get()
    return data;
});

export const createSolution = createAsyncThunk("Solution/createSolution",async(payload)=>{
    payload.created_by = userDetail?.id;
    const data = await SolutionApi?.post(payload);
    return data;
})

export const editSolution = createAsyncThunk("Solution/editSolution",async(payload)=>{
    payload.updated_by = userDetail?.id;
    const data = await SolutionApi?.put(payload);
    return data;
})

export const deleteSolution = createAsyncThunk("Solution/deleteSolution",async(payload)=>{
    const data = await SolutionApi.delete(payload);
    return data;
})

const initialState ={
    Solution: [],
    Loading: false,
    error: null,
}

export const SolutionSlice = createSlice({
    name:'Solution',
    initialState,
    reducers:{ },
    extraReducers:(builder)=>{
        builder
        // get 
        .addCase(fetchSolution.pending,(state)=>{
            state.Loading = true;
        })
        .addCase(fetchSolution?.fulfilled,(state,action)=>{
            state.Loading = false;
            state.Solution = action.payload?.data;
        })
        .addCase(fetchSolution.rejected,(state,action)=>{
            state.Loading = false;
            state.error = action.error;
        })
        // add 
        .addCase(createSolution.pending,(state)=>{
            state.Loading = true;
        })
        .addCase(createSolution.fulfilled,(state,action)=>{
            state.Loading = false;
            state.Solution?.push(action?.payload?.data);
        })
        .addCase(createSolution.rejected,(state,action)=>{
            state.Loading = false;
            state.error = action.error.message;
        })
        // edit 
        .addCase(editSolution.pending,(state)=>{
            state.Loading = true;
        })
        .addCase(editSolution.fulfilled,(state,action)=>{
            state.Loading = false;
            const index = state?.Solution?.findIndex((x)=>x.id === action?.payload?.data?.id);
            if(index !== -1){
                state.Solution[index] = action.payload.data;
            }
        })
        .addCase(editSolution.rejected,(state,action)=>{
            state.loading= false;
            state.error = action.error.message;
        })
        // delete 
        .addCase(deleteSolution.pending,(state)=>{
            state.loading = true;
        })
        .addCase(deleteSolution.fulfilled,(state,action)=>{
            state.loading = false;
            state.Solution =  state.Solution?.filter((x)=> x.id !== action?.payload?.data);
        })
        .addCase(deleteSolution.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.error.message;
        })
    }
})

export default SolutionSlice.reducer;