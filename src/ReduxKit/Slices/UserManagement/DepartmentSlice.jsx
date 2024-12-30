import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { DepartmentApi } from "../../../Apis/UserManagementApiService";


const userDetail = JSON.parse(localStorage.getItem('user'));

export const fetchDepartment = createAsyncThunk("departments/fetchDepartment",async ()=>{
    const data = await DepartmentApi?.getDepartmentList();
    return data;
});

export const createDepartment = createAsyncThunk("departments/createDepartment",async(department)=>{
    department.created_by = userDetail?.user_name;
    const data = await DepartmentApi?.postDepartment(department);
    return data;
})

export const editDepartment = createAsyncThunk("departments/editDepartment",async(department)=>{
    department.updated_by = userDetail?.user_name;
    const data = await DepartmentApi?.editDepartment(department);
    return data;
})

export const deleteDepartment = createAsyncThunk("departments/deleteDepartment",async(id)=>{
    const data = await DepartmentApi.deleteDepartment(id);
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
        // get 
        .addCase(fetchDepartment.pending,(state)=>{
            state.loading = true;
        })
        .addCase(fetchDepartment?.fulfilled,(state,action)=>{
            state.loading = false;
            state.departments = action.payload;
        })
        .addCase(fetchDepartment.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error;
        })
        // add 
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
        // edit 
        .addCase(editDepartment.pending,(state)=>{
            state.loading = true;
        })
        .addCase(editDepartment.fulfilled,(state,action)=>{
            state.loading = false;
            const index = state?.departments?.data?.findIndex((x)=>x.id === action?.payload?.data?.id);
            if(index !== -1){
                state.departments.data[index] = action.payload.data;
            }
        })
        .addCase(editDepartment.rejected,(state,action)=>{
            state.loading= false;
            state.error = action.error.message;
        })
        // delete 
        .addCase(deleteDepartment.pending,(state)=>{
            state.loading = true;
        })
        .addCase(deleteDepartment.fulfilled,(state,action)=>{
            state.loading = false;
            state.departments.data =  state.departments?.data?.filter((x)=> x.id !== action?.payload?.data);
        })
        .addCase(deleteDepartment.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.error.message;
        })
    }
})


export default DepartmentSlice.reducer;