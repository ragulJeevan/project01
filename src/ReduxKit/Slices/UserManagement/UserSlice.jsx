import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { UserApi } from "../../../Apis/UserManagementApiService";


const userDetail = JSON.parse(localStorage.getItem('user'));

export const fetchUser = createAsyncThunk('users/fetchUser',async()=>{
    const data = UserApi?.getUsers();
    return data;
})

export const createUser = createAsyncThunk('users/createUser',async(payLoad)=>{
    payLoad.created_by = userDetail?.user_name;
    const data = await UserApi.postUser(payLoad);
    return data;

})

export const editUser = createAsyncThunk('users/editUser',async(payLoad)=>{
    payLoad.updated_by = userDetail?.user_name;
    const data = await UserApi.putUser(payLoad);
    return data;
})

export const deleteUsers = createAsyncThunk('users/deleteUsers',async(payLoad)=>{
    const data = await UserApi.deleteUser(payLoad);
    return data;
})


const initialState ={
    users:[],
    loading:false,
    error:null
}

export const UserSlice = createSlice({
    name:'users',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        // get 
        .addCase(fetchUser.pending,(state)=>{
            state.loading = true;
        })
        .addCase(fetchUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.users = action?.payload?.data;
        })
        .addCase(fetchUser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action?.error?.message;
        })
        // post
        .addCase(createUser.pending,(state)=>{
            state.loading = true;
        })
        .addCase(createUser.fulfilled,(state,action)=>{
            state.loading = false;
            let user ={
                id:action.payload?.data?.id,
                user_name:action.payload?.data?.user_name,
                designation:action.payload?.data?.designation,
                designation_name:action.payload?.data?.designation_name,
                department:action.payload?.data?.department,
                department_name:action.payload?.data?.department_name,
                email:action?.payload?.data?.email
            }
            state.users.push(user);
        })
        .addCase(createUser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action?.error?.message;
        })
        // put
        .addCase(editUser.pending,(state)=>{
            state.loading = true;
        })
        .addCase(editUser.fulfilled,(state,action)=>{
            state.loading = false;
            const index = state?.users?.findIndex((_u)=> _u?.id === action?.payload?.data?.id);
            if(index !== -1){
                state.users[index]=action?.payload?.data;
            } 
        })
        .addCase(editUser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action?.error?.message;
        })
        // delete
        .addCase(deleteUsers.pending,(state)=>{
            state.loading = true;
        })
        .addCase(deleteUsers.fulfilled,(state,action)=>{
            state.loading = false;
            state.users = state?.users?.filter((_u)=> _u?.id !== action?.payload?.data);
        })
        .addCase(deleteUsers.rejected,(state,action)=>{
            state.loading = false;
            state.error = action?.error?.message;
        })
    }
})

export default UserSlice.reducer;