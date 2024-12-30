import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { DesignationApi } from "../../../Apis/UserManagementApiService";

const userDetail = JSON.parse(localStorage.getItem('user'));

export const fetchDesignation = createAsyncThunk("designations/fetchDesignation",async ()=>{
    const data = await DesignationApi?.getDesignation()
    return data;
});

export const createDesignation = createAsyncThunk("designations/createDesignation",async(department)=>{
    department.created_by = userDetail?.user_name;
    const data = await DesignationApi?.postDesignation(department);
    return data;
})

export const editDesignation = createAsyncThunk("designations/editDesignation",async(department)=>{
    department.updated_by = userDetail?.user_name;
    const data = await DesignationApi?.putDesignation(department);
    return data;
})

export const deleteDesignation = createAsyncThunk("designations/deleteDesignation",async(payLoad)=>{
    const data = await DesignationApi.deleteDesignation(payLoad);
    return data;
})

const initialState ={
    designations: [],
    loading: false,
    error: null,
}

export const DesignationSlice = createSlice({
    name:'designations',
    initialState,
    reducers:{ },
    extraReducers:(builder)=>{
        builder
        // get 
        .addCase(fetchDesignation.pending,(state)=>{
            state.loading = true;
        })
        .addCase(fetchDesignation?.fulfilled,(state,action)=>{
            state.loading = false;
            state.designations = action.payload;
        })
        .addCase(fetchDesignation.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error;
        })
        // add 
        .addCase(createDesignation.pending,(state)=>{
            state.loading = true;
        })
        .addCase(createDesignation.fulfilled,(state,action)=>{
            state.loading = false;
            let requiredData ={
                id:action.payload?.data?.id,
                designation_name:action.payload?.data?.designation_name
            }
            state.designations?.data?.push(requiredData);
        })
        .addCase(createDesignation.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        })
        // edit 
        .addCase(editDesignation.pending,(state)=>{
            state.loading = true;
        })
        .addCase(editDesignation.fulfilled,(state,action)=>{
            state.loading = false;
            const index = state?.designations?.data?.findIndex((x)=>x.id === action?.payload?.data?.id);
            if(index !== -1){
                state.designations.data[index] = action.payload.data;
            }
        })
        .addCase(editDesignation.rejected,(state,action)=>{
            state.loading= false;
            state.error = action.error.message;
        })
        // delete 
        .addCase(deleteDesignation.pending,(state)=>{
            state.loading = true;
        })
        .addCase(deleteDesignation.fulfilled,(state,action)=>{
            state.loading = false;
            state.designations.data =  state.designations?.data?.filter((x)=> x.id !== action?.payload?.data);
        })
        .addCase(deleteDesignation.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.error.message;
        })
    }
})


export default DesignationSlice.reducer;