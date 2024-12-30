import { configureStore } from "@reduxjs/toolkit";
import loggedInreducer from "./Slices/LoginSlice";
import Departmentreducer from "./Slices/UserManagement/DepartmentSlice";
import Designationreducer from './Slices/UserManagement/DesignationSlice';
import Userreducer from './Slices/UserManagement/UserSlice';
import StatusReducer from './Slices/Foundation/Status';

const store = configureStore({
    reducer: {
        isLoggedIn :loggedInreducer,
        departmentList:Departmentreducer,
        designationList:Designationreducer,
        userList : Userreducer,
        statusList:StatusReducer,
    },
});

export default store;