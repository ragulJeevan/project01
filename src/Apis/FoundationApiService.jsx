import axiosInstance from "./AxiosService";
import { FoundationEnPoint } from "../Utils/endPoints";

// status 
const statusEndPoint = `${FoundationEnPoint?.module}/${FoundationEnPoint?.status}/${FoundationEnPoint?.status_crud}`;
export const StatusApi = {
    get: async () => {
        const response = await axiosInstance.get(statusEndPoint);
        return response?.data;
    },
    post: async (payLoad) => {
        const response = await axiosInstance.post(statusEndPoint, payLoad);
        return response?.data;
    },
    put: async (payLoad) => {
        const response = await axiosInstance.put(`${statusEndPoint}${payLoad?.id}/`, payLoad);
        return response?.data;
    },
    delete: async (payLoad) => {
        const response = await axiosInstance.delete(`${statusEndPoint}${payLoad?.id}/`);
        return response?.data;
    },
}
// type 
const typeEndPoint = `${FoundationEnPoint?.module}/${FoundationEnPoint?.type}/${FoundationEnPoint?.type_crud}`;
export const TypeApi = {
    get: async () => {
        const response = await axiosInstance.get(typeEndPoint);
        return response?.data;
    },
    post: async (payLoad) => {
        const response = await axiosInstance.post(typeEndPoint, payLoad);
        return response?.data;
    },
    put: async (payLoad) => {
        const response = await axiosInstance.put(`${typeEndPoint}${payLoad?.id}/`, payLoad);
        return response?.data;
    },
    delete: async (payLoad) => {
        const response = await axiosInstance.delete(`${typeEndPoint}${payLoad?.id}/`);
        return response?.data;
    },
}
// stage
const stageEndPoint = `${FoundationEnPoint?.module}/${FoundationEnPoint?.stage}/${FoundationEnPoint?.stage_crud}`;
export const StageApi = {
    get: async () => {
        const response = await axiosInstance.get(stageEndPoint);
        return response?.data;
    },
    post: async (payLoad) => {
        const response = await axiosInstance.post(stageEndPoint, payLoad);
        return response?.data;
    },
    put: async (payLoad) => {
        const response = await axiosInstance.put(`${stageEndPoint}${payLoad?.id}/`, payLoad);
        return response?.data;
    },
    delete: async (payLoad) => {
        const response = await axiosInstance.delete(`${stageEndPoint}${payLoad?.id}/`);
        return response?.data;
    },
}
// sdlc 
const sdlcEndPoint = `${FoundationEnPoint?.module}/${FoundationEnPoint?.sdlc}/${FoundationEnPoint?.sdlc_crud}`;
export const SDLCApi = {
    get: async () => {
        const response = await axiosInstance.get(sdlcEndPoint);
        return response?.data;
    },
    post: async (payLoad) => {
        const response = await axiosInstance.post(sdlcEndPoint, payLoad);
        return response?.data;
    },
    put: async (payLoad) => {
        const response = await axiosInstance.put(`${sdlcEndPoint}${payLoad?.id}/`, payLoad);
        return response?.data;
    },
    delete: async (payLoad) => {
        const response = await axiosInstance.delete(`${sdlcEndPoint}${payLoad?.id}/`);
        return response?.data;
    },
}
// complexity 
const complexityEndPoint = `${FoundationEnPoint?.module}/${FoundationEnPoint?.complexity}/${FoundationEnPoint?.complexity_crud}`;
export const ComplexityApi = {
    get: async () => {
        const response = await axiosInstance.get(complexityEndPoint);
        return response?.data;
    },
    post: async (payLoad) => {
        const response = await axiosInstance.post(complexityEndPoint, payLoad);
        return response?.data;
    },
    put: async (payLoad) => {
        const response = await axiosInstance.put(`${complexityEndPoint}${payLoad?.id}/`, payLoad);
        return response?.data;
    },
    delete: async (payLoad) => {
        const response = await axiosInstance.delete(`${complexityEndPoint}${payLoad?.id}/`);
        return response?.data;
    },
}
// priority 
const priorityEndPoint = `${FoundationEnPoint?.module}/${FoundationEnPoint?.priority}/${FoundationEnPoint?.priority_crud}`;
export const PriorityApi = {
    get: async () => {
        const response = await axiosInstance.get(priorityEndPoint);
        return response?.data;
    },
    post: async (payLoad) => {
        const response = await axiosInstance.post(priorityEndPoint, payLoad);
        return response?.data;
    },
    put: async (payLoad) => {
        const response = await axiosInstance.put(`${priorityEndPoint}${payLoad?.id}/`, payLoad);
        return response?.data;
    },
    delete: async (payLoad) => {
        const response = await axiosInstance.delete(`${priorityEndPoint}${payLoad?.id}/`);
        return response?.data;
    },
}