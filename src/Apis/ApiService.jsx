import axiosInstance from './AxiosService';


const apisService = {

    post : async (endPoint,PayLoad) =>{
        try{
            const response = await axiosInstance.post(endPoint,PayLoad);
            return response.data;
        }
        catch(error){
            console.log(error.response.data);            
            throw error.response.data;
        }
    },
    get : async (endPoint,params={})=>{
        try {
            const repsonse = await axiosInstance.get(endPoint,{params});
            return repsonse.data;
        } catch (error) {           
            throw error.response.data;
        }
    },
    put: async (endpoint, data) => {
        try {
            const response = await axiosInstance.put(endpoint, data);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'API call failed!' };
        }
    },
    delete: async (endpoint) => {
        try {
            const response = await axiosInstance.delete(endpoint);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'API call failed!' };
        }
    }
}

export default apisService;