import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    loggedIn:false
}
export const LoggedInSlice = createSlice({
    name:"loggedIn",
    initialState,
    reducers:{
        setLoggedIn :(state,action)=>{
            state.loggedIn =  action.payload
        }
    }
})

export const {setLoggedIn} = LoggedInSlice.actions;    
export default LoggedInSlice.reducer;