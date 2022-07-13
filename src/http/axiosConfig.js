import axios from "axios";

const instance = axios.create({
    baseURL: process.env.VUE_APP_HALKHATA_BASE_API,
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
});

export default instance;
