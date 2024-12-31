import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { UseCaseApi } from "../../../Apis/ProjectManagement";


const userDetail = JSON.parse(localStorage.getItem('user'));

export const fetchUseCase = createAsyncThunk("UseCase/fetchUseCase",async ()=>{
    const data = await UseCaseApi?.get()
    return data;
});

export const createUseCase = createAsyncThunk("UseCase/createUseCase",async(payload)=>{
    payload.created_by = userDetail?.id;
    const data = await UseCaseApi?.post(payload);
    return data;
})

export const editUseCase = createAsyncThunk("UseCase/editUseCase",async(payload)=>{
    payload.updated_by = userDetail?.id;
    const data = await UseCaseApi?.put(payload);
    return data;
})

export const deleteUseCase = createAsyncThunk("UseCase/deleteUseCase",async(payload)=>{
    const data = await UseCaseApi.delete(payload);
    return data;
})

const initialState ={
    UseCase: [],
    loading: false,
    error: null,
}

export const UseCaseSlice = createSlice({
    name:'UseCase',
    initialState,
    reducers:{ },
    extraReducers:(builder)=>{
        builder
        // get 
        .addCase(fetchUseCase.pending,(state)=>{
            state.loading = true;
        })
        .addCase(fetchUseCase?.fulfilled,(state,action)=>{
            state.loading = false;
            state.UseCase = action.payload?.data;
        })
        .addCase(fetchUseCase.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error;
        })
        // add 
        .addCase(createUseCase.pending,(state)=>{
            state.loading = true;
        })
        .addCase(createUseCase.fulfilled,(state,action)=>{
            state.loading = false;
            state.UseCase?.push(action?.payload?.data);
        })
        .addCase(createUseCase.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        })
        // edit 
        .addCase(editUseCase.pending,(state)=>{
            state.loading = true;
        })
        .addCase(editUseCase.fulfilled,(state,action)=>{
            state.loading = false;
            const index = state?.UseCase?.findIndex((x)=>x.id === action?.payload?.data?.id);
            if(index !== -1){
                state.UseCase[index] = action.payload.data;
            }
        })
        .addCase(editUseCase.rejected,(state,action)=>{
            state.loading= false;
            state.error = action.error.message;
        })
        // delete 
        .addCase(deleteUseCase.pending,(state)=>{
            state.loading = true;
        })
        .addCase(deleteUseCase.fulfilled,(state,action)=>{
            state.loading = false;
            state.UseCase =  state.UseCase?.filter((x)=> x.id !== action?.payload?.data);
        })
        .addCase(deleteUseCase.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.error.message;
        })
    }
})

export default UseCaseSlice.reducer;