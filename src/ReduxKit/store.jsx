import { configureStore } from "@reduxjs/toolkit";
import loggedInreducer from "./Slices/LoginSlice";
import Departmentreducer from "./Slices/DepartmentSlice"

const store = configureStore({
    reducer: {
        isLoggedIn :loggedInreducer,
        departmentList:Departmentreducer
    },
});

export default store;