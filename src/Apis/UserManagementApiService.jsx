import axiosInstance from "./AxiosService";
import { USerManagementEnPoint } from "../Utils/endPoints";

const Department_EnPoint = `${USerManagementEnPoint?.module}/${USerManagementEnPoint?.department}/${USerManagementEnPoint?.dep_crud}`;

const Designation_End_Point = `${USerManagementEnPoint?.module}/${USerManagementEnPoint?.designation}/${USerManagementEnPoint?.desg_crud}`;

const User_End_Point = `${USerManagementEnPoint?.module}/${USerManagementEnPoint?.user}/${USerManagementEnPoint?.user_crud}`;

export const DepartmentApi = {
    getDepartmentList: async () => {
        try {
            const response = await axiosInstance.get(Department_EnPoint);
            return response?.data;
        } catch (error) {
            throw error;
        }
    },
    postDepartment : async (payLoad) =>{
        try {
            const response = await axiosInstance.post(Department_EnPoint,payLoad);
            return response?.data;
        } catch (error) {
        throw error;
        }
    },
    editDepartment : async (payLoad)=>{
        try {
            const response = await axiosInstance.put(`${Department_EnPoint}${payLoad?.id}/`,payLoad);
            return response.data;
        } catch (error) {
            throw error;
            
        }
    },
    deleteDepartment : async (data)=>{
        try {
            const response = await axiosInstance.delete(`${Department_EnPoint}${data}/`);
            return response.data; 
        } catch (error) {
           throw error; 
        }
    }
}

export const DesignationApi = {
    getDesignation : async()=>{
        try {
            const response = await axiosInstance.get(Designation_End_Point);
            return response?.data;
        } catch (error) {
            throw error
        }
    },
    postDesignation : async(payLoad)=>{
        try {
            const response = await axiosInstance.post(Designation_End_Point,payLoad);
            return response?.data;            
        } catch (error) {
            throw error;
        }
    },
    putDesignation : async(payLoad)=>{
        try {
            const response = await axiosInstance.put(`${Designation_End_Point}${payLoad?.id}/`,payLoad);
            return response?.data;
        } catch (error) {
           throw error; 
        }
    },
    deleteDesignation : async(payLoad)=>{
     try {
        const response = await axiosInstance.delete(`${Designation_End_Point}${payLoad?.id}/`);
        return response?.data;
     } catch (error) {
        throw error;
     }   
    }
}

export const UserApi={
    getUsers : async()=>{
        try {
            const response = await axiosInstance.get(User_End_Point);
            return response?.data;
        } catch (error) {
            throw error;
        }
    },
    postUser : async(payLoad)=>{
        try {
            const response = await axiosInstance.post(User_End_Point,payLoad);
            return response?.data
        } catch (error) {
            throw error;
        }
    },
    putUser:async(payLoad)=>{
        try {
            const response = await axiosInstance.put(`${User_End_Point}${payLoad?.id}/`,payLoad);
            return response?.data;
        } catch (error) {
            throw error;
        }
    },
    deleteUser:async(payLoad)=>{
        try {
            const response = await axiosInstance.delete(`${User_End_Point}${payLoad?.id}/`);
            return response?.data;
        } catch (error) {
            throw error;
        }
    }
}
