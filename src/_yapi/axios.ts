import axios from "axios";

const Axios = axios.create({});

Axios.interceptors.request.use((config) => {
    return config;
});

Axios.interceptors.response.use(async (response) => {
    if ([20228, 20201].includes(response.data?.code)) {
      console.log('login error');
    }
    return response;
});

export default Axios;
