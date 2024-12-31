import axiosInstance from "./AxiosService";
import { ProjectManagementEnPoint } from "../Utils/endPoints";

// PROJECT 
const Project_EnPoint = `${ProjectManagementEnPoint?.module}/${ProjectManagementEnPoint?.project}/${ProjectManagementEnPoint?.project_crud}`;

export const ProjectApi = {
    get: async () => {
        try {
            const response = await axiosInstance.get(Project_EnPoint);
            return response?.data;
        } catch (error) {
            throw error;
        }
    },
    post : async (payLoad) =>{
        try {
            const response = await axiosInstance.post(Project_EnPoint,payLoad);
            return response?.data;
        } catch (error) {
        throw error;
        }
    },
    put : async (payLoad)=>{
        try {
            const response = await axiosInstance.put(`${Project_EnPoint}${payLoad?.id}/`,payLoad);
            return response.data;
        } catch (error) {
            throw error;
            
        }
    },
    delete : async (data)=>{
        try {
            const response = await axiosInstance.delete(`${Project_EnPoint}${data?.id}/`);
            return response.data; 
        } catch (error) {
           throw error; 
        }
    }
}
// SOLUTION 
const Solution_EnPoint = `${ProjectManagementEnPoint?.module}/${ProjectManagementEnPoint?.solution}/${ProjectManagementEnPoint?.solution_crud}`;

export const SolutionApi = {
    get: async () => {
        try {
            const response = await axiosInstance.get(Solution_EnPoint);
            return response?.data;
        } catch (error) {
            throw error;
        }
    },
    post : async (payLoad) =>{
        try {
            const response = await axiosInstance.post(Solution_EnPoint,payLoad);
            return response?.data;
        } catch (error) {
        throw error;
        }
    },
    put : async (payLoad)=>{
        try {
            const response = await axiosInstance.put(`${Solution_EnPoint}${payLoad?.id}/`,payLoad);
            return response.data;
        } catch (error) {
            throw error;
            
        }
    },
    delete : async (data)=>{
        try {
            const response = await axiosInstance.delete(`${Solution_EnPoint}${data?.id}/`);
            return response.data; 
        } catch (error) {
           throw error; 
        }
    }
}
// FEATURE 
const Feature_EnPoint = `${ProjectManagementEnPoint?.module}/${ProjectManagementEnPoint?.feature}/${ProjectManagementEnPoint?.feature_crud}`;

export const FeatureApi = {
    get: async () => {
        try {
            const response = await axiosInstance.get(Feature_EnPoint);
            return response?.data;
        } catch (error) {
            throw error;
        }
    },
    post : async (payLoad) =>{
        try {
            const response = await axiosInstance.post(Feature_EnPoint,payLoad);
            return response?.data;
        } catch (error) {
        throw error;
        }
    },
    put : async (payLoad)=>{
        try {
            const response = await axiosInstance.put(`${Feature_EnPoint}${payLoad?.id}/`,payLoad);
            return response.data;
        } catch (error) {
            throw error;
            
        }
    },
    delete : async (data)=>{
        try {
            const response = await axiosInstance.delete(`${Feature_EnPoint}${data?.id}/`);
            return response.data; 
        } catch (error) {
           throw error; 
        }
    }
}
// USECASE 
const Usecase_EnPoint = `${ProjectManagementEnPoint?.module}/${ProjectManagementEnPoint?.usecase}/${ProjectManagementEnPoint?.usecase_crud}`;

export const UseCaseApi = {
    get: async () => {
        try {
            const response = await axiosInstance.get(Usecase_EnPoint);
            return response?.data;
        } catch (error) {
            throw error;
        }
    },
    post : async (payLoad) =>{
        try {
            const response = await axiosInstance.post(Usecase_EnPoint,payLoad);
            return response?.data;
        } catch (error) {
        throw error;
        }
    },
    put : async (payLoad)=>{
        try {
            const response = await axiosInstance.put(`${Usecase_EnPoint}${payLoad?.id}/`,payLoad);
            return response.data;
        } catch (error) {
            throw error;
            
        }
    },
    delete : async (data)=>{
        try {
            const response = await axiosInstance.delete(`${Usecase_EnPoint}${data?.id}/`);
            return response.data; 
        } catch (error) {
           throw error; 
        }
    }
}
// TASK 
const Task_EndPoint = `${ProjectManagementEnPoint?.module}/${ProjectManagementEnPoint?.task}/${ProjectManagementEnPoint?.task_crud}`;

export const TaskApi = {
    get: async () => {
        try {
            const response = await axiosInstance.get(Task_EndPoint);
            return response?.data;
        } catch (error) {
            throw error;
        }
    },
    post : async (payLoad) =>{
        try {
            const response = await axiosInstance.post(Task_EndPoint,payLoad);
            return response?.data;
        } catch (error) {
        throw error;
        }
    },
    put : async (payLoad)=>{
        try {
            const response = await axiosInstance.put(`${Task_EndPoint}${payLoad?.id}/`,payLoad);
            return response.data;
        } catch (error) {
            throw error;
            
        }
    },
    delete : async (data)=>{
        try {
            const response = await axiosInstance.delete(`${Task_EndPoint}${data?.id}/`);
            return response.data; 
        } catch (error) {
           throw error; 
        }
    }
}
// TASK HISTORY 
const Task_History_EnPoint = `${ProjectManagementEnPoint?.module}/${ProjectManagementEnPoint?.task_history}/${ProjectManagementEnPoint?.task_history}`;

export const TaskHistoryApi = {
    get: async () => {
        try {
            const response = await axiosInstance.get(Task_History_EnPoint);
            return response?.data;
        } catch (error) {
            throw error;
        }
    },
    post : async (payLoad) =>{
        try {
            const response = await axiosInstance.post(Task_History_EnPoint,payLoad);
            return response?.data;
        } catch (error) {
        throw error;
        }
    },
    put : async (payLoad)=>{
        try {
            const response = await axiosInstance.put(`${Task_History_EnPoint}${payLoad?.id}/`,payLoad);
            return response.data;
        } catch (error) {
            throw error;
            
        }
    },
    delete : async (data)=>{
        try {
            const response = await axiosInstance.delete(`${Task_History_EnPoint}${data?.id}/`);
            return response.data; 
        } catch (error) {
           throw error; 
        }
    }
}
