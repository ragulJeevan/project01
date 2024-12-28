import axiosInstance from "./AxiosService";
import { USerManagementEnPoint } from "../Utils/endPoints";



const Department_EnPoint = `${USerManagementEnPoint?.module}/${USerManagementEnPoint?.department}/${USerManagementEnPoint?.dep_crud}`;

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
    editDepartment : async (data,payLoad)=>{
        try {
            const response = await axiosInstance.put(`${Department_EnPoint}/${data}/`,payLoad);
            return response.data;
        } catch (error) {
            throw error;
            
        }
    },
    deleteDepartment : async (data)=>{
        try {
            const response = await axiosInstance.delete(`${Department_EnPoint}/${data}/`);
            return response.data; 
        } catch (error) {
           throw error; 
        }
    }
}
