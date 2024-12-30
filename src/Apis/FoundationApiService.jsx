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
        const response = await axiosInstance.get(statusEndPoint, payLoad);
        return response?.data;
    },
    put: async (payLoad) => {
        const response = await axiosInstance.get(`${statusEndPoint}${payLoad?.id}/`, payLoad);
        return response?.data;
    },
    delete: async (payLoad) => {
        const response = await axiosInstance.get(`${statusEndPoint}${payLoad?.id}/`);
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
        const response = await axiosInstance.get(typeEndPoint, payLoad);
        return response?.data;
    },
    put: async (payLoad) => {
        const response = await axiosInstance.get(`${typeEndPoint}${payLoad?.id}/`, payLoad);
        return response?.data;
    },
    delete: async (payLoad) => {
        const response = await axiosInstance.get(`${typeEndPoint}${payLoad?.id}/`);
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
        const response = await axiosInstance.get(stageEndPoint, payLoad);
        return response?.data;
    },
    put: async (payLoad) => {
        const response = await axiosInstance.get(`${stageEndPoint}${payLoad?.id}/`, payLoad);
        return response?.data;
    },
    delete: async (payLoad) => {
        const response = await axiosInstance.get(`${stageEndPoint}${payLoad?.id}/`);
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
        const response = await axiosInstance.get(sdlcEndPoint, payLoad);
        return response?.data;
    },
    put: async (payLoad) => {
        const response = await axiosInstance.get(`${sdlcEndPoint}${payLoad?.id}/`, payLoad);
        return response?.data;
    },
    delete: async (payLoad) => {
        const response = await axiosInstance.get(`${sdlcEndPoint}${payLoad?.id}/`);
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
        const response = await axiosInstance.get(complexityEndPoint, payLoad);
        return response?.data;
    },
    put: async (payLoad) => {
        const response = await axiosInstance.get(`${complexityEndPoint}${payLoad?.id}/`, payLoad);
        return response?.data;
    },
    delete: async (payLoad) => {
        const response = await axiosInstance.get(`${complexityEndPoint}${payLoad?.id}/`);
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
        const response = await axiosInstance.get(priorityEndPoint, payLoad);
        return response?.data;
    },
    put: async (payLoad) => {
        const response = await axiosInstance.get(`${priorityEndPoint}${payLoad?.id}/`, payLoad);
        return response?.data;
    },
    delete: async (payLoad) => {
        const response = await axiosInstance.get(`${priorityEndPoint}${payLoad?.id}/`);
        return response?.data;
    },
}