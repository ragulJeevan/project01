import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { StageApi } from "../../../Apis/FoundationApiService";

const userDetail = JSON.parse(localStorage.getItem('user'));

export const fetchStage = createAsyncThunk('stage/fetachStage',async()=>{
    const data = await StageApi.get();
    return data;
})

export const createStage = createAsyncThunk('stage/createStage',async(payload)=>{
    payload.created_by = userDetail?.id;
    const data = await StageApi.post(payload);
    return data;
})

export const editStage = createAsyncThunk('stage/editStage',async(payload)=>{
    payload.updated_by = userDetail?.id;
    const data = await StageApi.put(payload);
    return data;
})

export const deleteStage = createAsyncThunk('stage/deleteStage',async(payload)=>{
    const data = await StageApi.delete(payload);
    return data;
})

const initialState={
    stage:[],
    loading:false,
    error:null
}

export const StageSlice = createSlice({
    name:'stage',
    initialState,
    reducers:{},
    extraReducers:(boiler)=>{
        boiler
        // get 
        .addCase(fetchStage.pending,(state)=>{
            state.loading = true;
        })
        .addCase(fetchStage.fulfilled,(state,action)=>{
            state.loading = false;
            state.stage = action?.payload.data;
        })
        .addCase(fetchStage.rejected,(state,action)=>{
            state.loading = false;
            state.error = action?.error?.message;
        })
         // post 
         .addCase(createStage.pending,(state)=>{
            state.loading = true;
        })
        .addCase(createStage.fulfilled,(state,action)=>{
            state.loading = false;
            state.stage.push(action?.payload.data);
        })
        .addCase(createStage.rejected,(state,action)=>{
            state.loading = false;
            state.error = action?.error?.message;
        })
         // put 
         .addCase(editStage.pending,(state)=>{
            state.loading = true;
        })
        .addCase(editStage.fulfilled,(state,action)=>{
            state.loading = false;
            const index = state?.stage.findIndex((_s)=> _s?.id === action?.payload?.data?.id);
            if(index !== -1){
                state.stage[index]=action?.payload?.data
            }
        })
        .addCase(editStage.rejected,(state,action)=>{
            state.loading = false;
            state.error = action?.error?.message;
        })
         // delete 
         .addCase(deleteStage.pending,(state)=>{
            state.loading = true;
        })
        .addCase(deleteStage.fulfilled,(state,action)=>{
            state.loading = false;
            state.stage = state.stage.filter((_s)=>_s?.id !== action?.payload?.data);
        })
        .addCase(deleteStage.rejected,(state,action)=>{
            state.loading = false;
            state.error = action?.error?.message;
        })
    }
})

export default StageSlice.reducer;