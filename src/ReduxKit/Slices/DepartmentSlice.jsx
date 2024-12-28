import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { DepartmentApi } from "../../Apis/UserManagementApiService";

export const fetchDepartment = createAsyncThunk("departments/fetchDepartment",async ()=>{
    const data = await DepartmentApi?.getDepartmentList();
    return data;
});

export const createDepartment = createAsyncThunk("departments/createDepartment",async(department)=>{
    const data = await DepartmentApi?.postDepartment(department);
    return data;
})

const initialState ={
    departments: [],
    loading: false,
    error: null,
}

export const DepartmentSlice = createSlice({
    name:'departments',
    initialState,
    reducers:{ },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchDepartment.pending,(state)=>{
            state.loading = true;
        })
        .addCase(fetchDepartment?.fulfilled,(state,action)=>{
            state.loading = false;
            state.departments = action.payload;
        })
        .addCase(fetchDepartment.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        })

        .addCase(createDepartment.pending,(state)=>{
            state.loading = true;
        })
        .addCase(createDepartment.fulfilled,(state,action)=>{
            state.loading = false;
            let requiredData ={
                id:action.payload?.data?.id,
                department_name:action.payload?.data?.department_name
            }
            state.departments?.data?.push(requiredData);
        })
        .addCase(createDepartment.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        })
    }
})


export default DepartmentSlice.reducer;