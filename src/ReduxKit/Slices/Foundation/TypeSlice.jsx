import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { TypeApi } from "../../../Apis/FoundationApiService";

const userDetail = JSON.parse(localStorage.getItem('user'));

export const fetchType = createAsyncThunk('Type/fetchType',async()=>{
    const data = await TypeApi.get();
    return data;
})

export const createType = createAsyncThunk('Type/createType',async(payload)=>{
    payload.created_by = userDetail?.id;
    const data = await TypeApi.post(payload);
    return data;
})

export const editType = createAsyncThunk('Type/editType',async(payload)=>{
    payload.updated_by = userDetail?.id;
    const data = await TypeApi.put(payload);
    return data;
})

export const deleteType = createAsyncThunk('Type/deleteType',async(payload)=>{
    const data = await TypeApi.delete(payload);
    return data;
})

const initialState ={
    Type:[],
    loading:false,
    error:null
}

export const TypeSlice = createSlice({
    name:'Type',
    initialState,
    reducers:{},
    extraReducers:(boiler)=>{
        boiler
        // get 
        .addCase(fetchType.pending,(state)=>{
            state.loading = true;
        })
        .addCase(fetchType.fulfilled,(state,action)=>{
            state.loading = false;
            state.Type = action?.payload?.data;
        })
        .addCase(fetchType.rejected,(state,action)=>{
            state.loading = false;
            state.error = action?.error?.message;
        })
        // [post] 
        .addCase(createType.pending,(state)=>{
            state.loading = true;
        })
        .addCase(createType.fulfilled,(state,action)=>{
            state.loading = false;
            state.Type.push(action?.payload?.data);
        })
        .addCase(createType.rejected,(state,action)=>{
            state.loading = false;
            state.error = action?.error?.message;
        })
        // edit
        .addCase(editType.pending,(state)=>{
            state.loading = true;
        })
        .addCase(editType.fulfilled,(state,action)=>{
            state.loading = false;
            const index = state?.Type?.findIndex((_c)=>_c?.id === action?.payload?.data?.id);
            if(index !== -1){
                state.Type[index]=action?.payload?.data;
            }
        })
        .addCase(editType.rejected,(state,action)=>{
            state.loading = false;
            state.error = action?.error?.message;
        })
        // delete
        .addCase(deleteType.pending,(state)=>{
            state.loading = true;
        })
        .addCase(deleteType.fulfilled,(state,action)=>{
            state.loading = false;
            state.Type = state?.Type?.filter((_c)=> _c?.id !== action?.payload?.data);
        })
        .addCase(deleteType.rejected,(state,action)=>{
            state.loading = false;
            state.error = action?.error?.message;
        })
    }
})

export default TypeSlice.reducer;