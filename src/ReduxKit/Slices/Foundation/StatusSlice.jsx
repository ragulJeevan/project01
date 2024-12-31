import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { StatusApi } from "../../../Apis/FoundationApiService";

const userDetail = JSON.parse(localStorage.getItem('user'));

export const fetchStatus = createAsyncThunk('status/fetchStatus',async()=>{
    const data = await StatusApi.get();
    return data;
})

export const createStatus = createAsyncThunk('status/createStatus',async(payload)=>{
    payload.created_by = userDetail?.id;
    const data = await StatusApi.post(payload);
    return data;
})

export const editStatus = createAsyncThunk('status/editStatus',async(payload)=>{
    payload.updated_by = userDetail?.id;
    payload.percentage = 0;
    const data = await StatusApi.put(payload);
    return data;
})

export const deleteStatus = createAsyncThunk('status/deleteStatus',async(payload)=>{
    const data = await StatusApi.delete(payload);
    return data;
})

const initialState={
    status : [],
    loading:false,
    error:null
}

export const StatusSLice = createSlice({
    name:'status',
    initialState,
    reducers:{},
    extraReducers:(boiler)=>{
        boiler
        // get  
        .addCase(fetchStatus.pending,(state)=>{
            state.loading = true;
        })
        .addCase(fetchStatus.fulfilled,(state,action)=>{
            state.loading = false;
            state.status = action?.payload?.data;
        })
        .addCase(fetchStatus.rejected,(state,action)=>{
            state.loading = false;
            state.error = action?.error?.message;
        })
        // create 
        .addCase(createStatus.pending,(state)=>{
            state.loading = true;
        })
        .addCase(createStatus.fulfilled,(state,action)=>{
            state.loading = false;
            state.status.push(action?.payload?.data);
        })
        .addCase(createStatus.rejected,(state,action)=>{
            state.loading = false;
            state.error = action?.error?.message;
        })
        // edit 
        .addCase(editStatus.pending,(state)=>{
            state.loading = true;
        })
        .addCase(editStatus.fulfilled,(state,action)=>{
            state.loading = false;
            const index = state?.status?.findIndex((_s)=> _s?.id === action?.payload?.data?.id);
            if(index !== -1){
                state.status[index]=action?.payload?.data;
            }
        })
        .addCase(editStatus.rejected,(state,action)=>{
            state.loading = false;
            state.error = action?.error?.message;
        })
        // delete
        .addCase(deleteStatus.pending,(state)=>{
            state.loading = true;
        })
        .addCase(deleteStatus.fulfilled,(state,action)=>{
            state.loading = false;
            state.status = state?.status?.filter((_s)=>_s?.id !== action?.payload?.data);
        })
        .addCase(deleteStatus.rejected,(state,action)=>{
            state.loading = false;
            state.error = action?.error?.message;
        })
    }
})

export default StatusSLice.reducer;
