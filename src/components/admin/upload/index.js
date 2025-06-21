import axios from "axios";
import { fileUpload, multiUpload } from "../../../ApiConfigs/ApiConfig";


export const uploadImage = async (payload) => {
    try {
        const { data } = await axios.post(fileUpload, payload);
        return data;
    } catch (error) {
        throw error;
    }
};

export const multiImageUpload = async (payload) => {
    try {
        const { data } = await axios.post(multiUpload, payload);
        return data;
    } catch (error) {
        return error;
    }
}