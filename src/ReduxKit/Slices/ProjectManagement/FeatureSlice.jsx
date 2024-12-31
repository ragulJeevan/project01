import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { FeatureApi } from "../../../Apis/ProjectManagement";


const userDetail = JSON.parse(localStorage.getItem('user'));

export const fetchFeature = createAsyncThunk("Feature/fetchFeature",async ()=>{
    const data = await FeatureApi?.get()
    return data;
});

export const createFeature = createAsyncThunk("Feature/createFeature",async(payload)=>{
    payload.created_by = userDetail?.id;
    const data = await FeatureApi?.post(payload);
    return data;
})

export const editFeature = createAsyncThunk("Feature/editFeature",async(payload)=>{
    payload.updated_by = userDetail?.id;
    const data = await FeatureApi?.put(payload);
    return data;
})

export const deleteFeature = createAsyncThunk("Feature/deleteFeature",async(payload)=>{
    const data = await FeatureApi.delete(payload);
    return data;
})

const initialState ={
    Feature: [],
    loading: false,
    error: null,
}

export const FeatureSlice = createSlice({
    name:'Feature',
    initialState,
    reducers:{ },
    extraReducers:(builder)=>{
        builder
        // get 
        .addCase(fetchFeature.pending,(state)=>{
            state.loading = true;
        })
        .addCase(fetchFeature?.fulfilled,(state,action)=>{
            state.loading = false;
            state.Feature = action.payload?.data;
        })
        .addCase(fetchFeature.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error;
        })
        // add 
        .addCase(createFeature.pending,(state)=>{
            state.loading = true;
        })
        .addCase(createFeature.fulfilled,(state,action)=>{
            state.loading = false;
            state.Feature?.push(action?.payload?.data);
        })
        .addCase(createFeature.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        })
        // edit 
        .addCase(editFeature.pending,(state)=>{
            state.loading = true;
        })
        .addCase(editFeature.fulfilled,(state,action)=>{
            state.loading = false;
            const index = state?.Feature?.findIndex((x)=>x.id === action?.payload?.data?.id);
            if(index !== -1){
                state.Feature[index] = action.payload.data;
            }
        })
        .addCase(editFeature.rejected,(state,action)=>{
            state.loading= false;
            state.error = action.error.message;
        })
        // delete 
        .addCase(deleteFeature.pending,(state)=>{
            state.loading = true;
        })
        .addCase(deleteFeature.fulfilled,(state,action)=>{
            state.loading = false;
            state.Feature =  state.Feature?.filter((x)=> x.id !== action?.payload?.data);
        })
        .addCase(deleteFeature.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.error.message;
        })
    }
})

export default FeatureSlice.reducer;