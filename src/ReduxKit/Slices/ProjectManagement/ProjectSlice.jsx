import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { ProjectApi } from "../../../Apis/ProjectManagement";


const userDetail = JSON.parse(localStorage.getItem('user'));

export const fetchProject = createAsyncThunk("project/fetchProject",async ()=>{
    const data = await ProjectApi?.get()
    return data;
});

export const createProject = createAsyncThunk("project/createProject",async(payload)=>{
    payload.created_by = userDetail?.id;
    const data = await ProjectApi?.post(payload);
    return data;
})

export const editProject = createAsyncThunk("project/editProject",async(payload)=>{
    payload.updated_by = userDetail?.id;
    const data = await ProjectApi?.put(payload);
    return data;
})

export const deleteProject = createAsyncThunk("project/deleteProject",async(payload)=>{
    const data = await ProjectApi.delete(payload);
    return data;
})

const initialState ={
    project: [],
    loading: false,
    error: null,
}

export const ProjectSlice = createSlice({
    name:'project',
    initialState,
    reducers:{ },
    extraReducers:(builder)=>{
        builder
        // get 
        .addCase(fetchProject.pending,(state)=>{
            state.loading = true;
        })
        .addCase(fetchProject?.fulfilled,(state,action)=>{
            state.loading = false;
            state.project = action.payload?.data;
        })
        .addCase(fetchProject.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error;
        })
        // add 
        .addCase(createProject.pending,(state)=>{
            state.loading = true;
        })
        .addCase(createProject.fulfilled,(state,action)=>{
            state.loading = false;
            state.project?.push(action.payload?.data);
        })
        .addCase(createProject.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        })
        // edit 
        .addCase(editProject.pending,(state)=>{
            state.loading = true;
        })
        .addCase(editProject.fulfilled,(state,action)=>{
            state.loading = false;
            const index = state?.project?.findIndex((x)=>x.id === action?.payload?.data?.id);
            if(index !== -1){
                state.project[index] = action.payload.data;
            }
        })
        .addCase(editProject.rejected,(state,action)=>{
            state.loading= false;
            state.error = action.error.message;
        })
        // delete 
        .addCase(deleteProject.pending,(state)=>{
            state.loading = true;
        })
        .addCase(deleteProject.fulfilled,(state,action)=>{
            state.loading = false;
            state.project =  state.project?.filter((x)=> x.id !== action?.payload?.data);
        })
        .addCase(deleteProject.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.error.message;
        })
    }
})

export default ProjectSlice.reducer;