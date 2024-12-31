import { configureStore } from "@reduxjs/toolkit";
import loggedInreducer from "./Slices/LoginSlice";
import Departmentreducer from "./Slices/UserManagement/DepartmentSlice";
import Designationreducer from './Slices/UserManagement/DesignationSlice';
import Userreducer from './Slices/UserManagement/UserSlice';
import StatusReducer from './Slices/Foundation/StatusSlice';
import StageReducer from './Slices/Foundation/StageSlice';
import Complexityreducer from './Slices/Foundation/ComplexitySlice';
import Priorityreducer from './Slices/Foundation/PrioritySlice';
import Typereducer from './Slices/Foundation/TypeSlice';
import Sdlcreducer from './Slices/Foundation/SDLCSlice';
import Projectreducer from './Slices/ProjectManagement/ProjectSlice';
import Featurereducer from './Slices/ProjectManagement/FeatureSlice';
import Solutionreducer from './Slices/ProjectManagement/SolutionSlice';
import UseCasereducer from './Slices/ProjectManagement/Usecase';
import Taskreducer from './Slices/ProjectManagement/TaskSlice';
import TaskHistoryreducer from './Slices/ProjectManagement/TaskSlice';


const store = configureStore({
    reducer: {
        isLoggedIn :loggedInreducer,
        departmentList:Departmentreducer,
        designationList:Designationreducer,
        userList : Userreducer,
        statusList:StatusReducer,
        stageList:StageReducer,
        complexityList:Complexityreducer,
        priorityList:Priorityreducer,
        typeList:Typereducer,
        sdlcList:Sdlcreducer,
        projectList:Projectreducer,
        featureList:Featurereducer,
        solutionList:Solutionreducer,
        useCaseList:UseCasereducer,
        taskList:Taskreducer,
        taskHistoryList:TaskHistoryreducer,
    },
});

export default store;