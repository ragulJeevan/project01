import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { TaskApi } from "../../../Apis/ProjectManagement";


const userDetail = JSON.parse(localStorage.getItem('user'));

export const fetchTask = createAsyncThunk("Task/fetchTask",async ()=>{
    const data = await TaskApi?.get()
    return data;
});

export const createTask = createAsyncThunk("Task/createTask",async(payload)=>{
    payload.created_by = userDetail?.id;
    const data = await TaskApi?.post(payload);
    return data;
})

export const editTask = createAsyncThunk("Task/editTask",async(payload)=>{
    payload.updated_by = userDetail?.id;
    const data = await TaskApi?.put(payload);
    return data;
})

export const deleteTask = createAsyncThunk("Task/deleteTask",async(payload)=>{
    const data = await TaskApi.delete(payload);
    return data;
})

const initialState ={
    Task: [],
    loading: false,
    error: null,
}

export const TaskSlice = createSlice({
    name:'Task',
    initialState,
    reducers:{ },
    extraReducers:(builder)=>{
        builder
        // get 
        .addCase(fetchTask.pending,(state)=>{
            state.loading = true;
        })
        .addCase(fetchTask?.fulfilled,(state,action)=>{
            state.loading = false;
            state.Task = action.payload?.data;
        })
        .addCase(fetchTask.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error;
        })
        // add 
        .addCase(createTask.pending,(state)=>{
            state.loading = true;
        })
        .addCase(createTask.fulfilled,(state,action)=>{
            state.loading = false;
            state.Task?.push(action?.payload?.data);
        })
        .addCase(createTask.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        })
        // edit 
        .addCase(editTask.pending,(state)=>{
            state.loading = true;
        })
        .addCase(editTask.fulfilled,(state,action)=>{
            state.loading = false;
            const index = state?.Task?.findIndex((x)=>x.id === action?.payload?.data?.id);
            if(index !== -1){
                state.Task[index] = action.payload.data;
            }
        })
        .addCase(editTask.rejected,(state,action)=>{
            state.loading= false;
            state.error = action.error.message;
        })
        // delete 
        .addCase(deleteTask.pending,(state)=>{
            state.loading = true;
        })
        .addCase(deleteTask.fulfilled,(state,action)=>{
            state.loading = false;
            state.Task =  state.Task?.filter((x)=> x.id !== action?.payload?.data);
        })
        .addCase(deleteTask.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.error.message;
        })
    }
})

export default TaskSlice.reducer;