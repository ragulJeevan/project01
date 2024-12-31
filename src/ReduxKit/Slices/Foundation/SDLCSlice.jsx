import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { SDLCApi } from "../../../Apis/FoundationApiService";

const userDetail = JSON.parse(localStorage.getItem('user'));

export const fetchSdlc = createAsyncThunk('Sdlc/fetchSdlc',async()=>{
    const data = await SDLCApi.get();
    return data;
})

export const createSdlc = createAsyncThunk('Sdlc/createSdlc',async(payload)=>{
    payload.created_by = userDetail?.id;
    const data = await SDLCApi.post(payload);
    return data;
})

export const editSdlc = createAsyncThunk('Sdlc/editSdlc',async(payload)=>{
    payload.updated_by = userDetail?.id;
    const data = await SDLCApi.put(payload);
    return data;
})

export const deleteSdlc = createAsyncThunk('Sdlc/deleteSdlc',async(payload)=>{
    const data = await SDLCApi.delete(payload);
    return data;
})

const initialState ={
    Sdlc:[],
    loading:false,
    error:null
}

export const SdlcSlice = createSlice({
    name:'Sdlc',
    initialState,
    reducers:{},
    extraReducers:(boiler)=>{
        boiler
        // get 
        .addCase(fetchSdlc.pending,(state)=>{
            state.loading = true;
        })
        .addCase(fetchSdlc.fulfilled,(state,action)=>{
            state.loading = false;
            state.Sdlc = action?.payload?.data;
        })
        .addCase(fetchSdlc.rejected,(state,action)=>{
            state.loading = false;
            state.error = action?.error?.message;
        })
        // [post] 
        .addCase(createSdlc.pending,(state)=>{
            state.loading = true;
        })
        .addCase(createSdlc.fulfilled,(state,action)=>{
            state.loading = false;
            state.Sdlc.push(action?.payload?.data);
        })
        .addCase(createSdlc.rejected,(state,action)=>{
            state.loading = false;
            state.error = action?.error?.message;
        })
        // edit
        .addCase(editSdlc.pending,(state)=>{
            state.loading = true;
        })
        .addCase(editSdlc.fulfilled,(state,action)=>{
            state.loading = false;
            const index = state?.Sdlc?.findIndex((_c)=>_c?.id === action?.payload?.data?.id);
            if(index !== -1){
                state.Sdlc[index]=action?.payload?.data;
            }
        })
        .addCase(editSdlc.rejected,(state,action)=>{
            state.loading = false;
            state.error = action?.error?.message;
        })
        // delete
        .addCase(deleteSdlc.pending,(state)=>{
            state.loading = true;
        })
        .addCase(deleteSdlc.fulfilled,(state,action)=>{
            state.loading = false;
            state.Sdlc = state?.Sdlc?.filter((_c)=> _c?.id !== action?.payload?.data);
        })
        .addCase(deleteSdlc.rejected,(state,action)=>{
            state.loading = false;
            state.error = action?.error?.message;
        })
    }
})

export default SdlcSlice.reducer;