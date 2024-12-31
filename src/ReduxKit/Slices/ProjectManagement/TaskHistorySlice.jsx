import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { TaskHistoryApi } from "../../../Apis/ProjectManagement";


const userDetail = JSON.parse(localStorage.getItem('user'));

export const fetchTaskHistory = createAsyncThunk("TaskHistory/fetchTaskHistory",async ()=>{
    const data = await TaskHistoryApi?.get()
    return data;
});

export const createTaskHistory = createAsyncThunk("TaskHistory/createTaskHistory",async(payload)=>{
    payload.created_by = userDetail?.id;
    const data = await TaskHistoryApi?.post(payload);
    return data;
})

export const editTaskHistory = createAsyncThunk("TaskHistory/editTaskHistory",async(payload)=>{
    payload.updated_by = userDetail?.id;
    const data = await TaskHistoryApi?.put(payload);
    return data;
})

export const deleteTaskHistory = createAsyncThunk("TaskHistory/deleteTaskHistory",async(payload)=>{
    const data = await TaskHistoryApi.delete(payload);
    return data;
})

const initialState ={
    TaskHistory: [],
    loading: false,
    error: null,
}

export const TaskHistorySlice = createSlice({
    name:'TaskHistory',
    initialState,
    reducers:{ },
    extraReducers:(builder)=>{
        builder
        // get 
        .addCase(fetchTaskHistory.pending,(state)=>{
            state.loading = true;
        })
        .addCase(fetchTaskHistory?.fulfilled,(state,action)=>{
            state.loading = false;
            state.TaskHistory = action.payload?.data;
        })
        .addCase(fetchTaskHistory.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error;
        })
        // add 
        .addCase(createTaskHistory.pending,(state)=>{
            state.loading = true;
        })
        .addCase(createTaskHistory.fulfilled,(state,action)=>{
            state.loading = false;
            state.TaskHistory?.push(action?.payload?.data);
        })
        .addCase(createTaskHistory.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        })
        // edit 
        .addCase(editTaskHistory.pending,(state)=>{
            state.loading = true;
        })
        .addCase(editTaskHistory.fulfilled,(state,action)=>{
            state.loading = false;
            const index = state?.TaskHistory?.findIndex((x)=>x.id === action?.payload?.data?.id);
            if(index !== -1){
                state.TaskHistory[index] = action.payload.data;
            }
        })
        .addCase(editTaskHistory.rejected,(state,action)=>{
            state.loading= false;
            state.error = action.error.message;
        })
        // delete 
        .addCase(deleteTaskHistory.pending,(state)=>{
            state.loading = true;
        })
        .addCase(deleteTaskHistory.fulfilled,(state,action)=>{
            state.loading = false;
            state.TaskHistory =  state.TaskHistory?.filter((x)=> x.id !== action?.payload?.data);
        })
        .addCase(deleteTaskHistory.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.error.message;
        })
    }
})

export default TaskHistorySlice.reducer;