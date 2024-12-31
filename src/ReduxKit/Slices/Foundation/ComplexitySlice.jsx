import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { ComplexityApi } from "../../../Apis/FoundationApiService";

const userDetail = JSON.parse(localStorage.getItem('user'));

export const fetchComplexity = createAsyncThunk('complexity/fetchComplexity',async()=>{
    const data = await ComplexityApi.get();
    return data;
})

export const createComplexity = createAsyncThunk('complexity/createComplexity',async(payload)=>{
    payload.created_by = userDetail?.id;
    const data = await ComplexityApi.post(payload);
    return data;
})

export const editComplexity = createAsyncThunk('complexity/editComplexity',async(payload)=>{
    payload.updated_by = userDetail?.id;
    const data = await ComplexityApi.put(payload);
    return data;
})

export const deleteComplexity = createAsyncThunk('complexity/deleteComplexity',async(payload)=>{
    const data = await ComplexityApi.delete(payload);
    return data;
})

const initialState ={
    complexity:[],
    loading:false,
    error:null
}

export const ComplexitySlice = createSlice({
    name:'complexity',
    initialState,
    reducers:{},
    extraReducers:(boiler)=>{
        boiler
        // get 
        .addCase(fetchComplexity.pending,(state)=>{
            state.loading = true;
        })
        .addCase(fetchComplexity.fulfilled,(state,action)=>{
            state.loading = false;
            state.complexity = action?.payload?.data;
        })
        .addCase(fetchComplexity.rejected,(state,action)=>{
            state.loading = false;
            state.error = action?.error?.message;
        })
        // [post] 
        .addCase(createComplexity.pending,(state)=>{
            state.loading = true;
        })
        .addCase(createComplexity.fulfilled,(state,action)=>{
            state.loading = false;
            state.complexity.push(action?.payload?.data);
        })
        .addCase(createComplexity.rejected,(state,action)=>{
            state.loading = false;
            state.error = action?.error?.message;
        })
        // edit
        .addCase(editComplexity.pending,(state)=>{
            state.loading = true;
        })
        .addCase(editComplexity.fulfilled,(state,action)=>{
            state.loading = false;
            const index = state?.complexity?.findIndex((_c)=>_c?.id === action?.payload?.data?.id);
            if(index !== -1){
                state.complexity[index]=action?.payload?.data;
            }
        })
        .addCase(editComplexity.rejected,(state,action)=>{
            state.loading = false;
            state.error = action?.error?.message;
        })
        // delete
        .addCase(deleteComplexity.pending,(state)=>{
            state.loading = true;
        })
        .addCase(deleteComplexity.fulfilled,(state,action)=>{
            state.loading = false;
            state.complexity = state?.complexity?.filter((_c)=> _c?.id !== action?.payload?.data);
        })
        .addCase(deleteComplexity.rejected,(state,action)=>{
            state.loading = false;
            state.error = action?.error?.message;
        })
    }
})

export default ComplexitySlice.reducer;