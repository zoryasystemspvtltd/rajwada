import axios from 'axios';

const apiBaseUrl = "https://localhost:7018/api"; // TODO Environment

const api = axios.create({ baseURL: apiBaseUrl });

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        const loggedInUser = JSON.parse(token);
        if (loggedInUser) {
            config.headers.Authorization = `Bearer ${loggedInUser.accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If the error status is 401 and there is no originalRequest._retry flag,
        // it means the token has expired and we need to refresh it
        if (error.response?.status === 401 
            && !originalRequest._retry
            && originalRequest.url !== '/identity/login') {
            originalRequest._retry = true;

            try {
                const token = localStorage.getItem("token");
                const loggedInUser = JSON.parse(token);
                if (!loggedInUser) {
                    throw new error("Invalid User") ;
                }
                const refreshToken = loggedInUser?.refreshToken;
                const response = await axios.post(`${apiBaseUrl}/identity/refresh`, { refreshToken });
                const newToken = response.data;
                localStorage.setItem("token", JSON.stringify(newToken));

                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${newToken.accessToken}`;
                return axios(originalRequest);
            } catch (error) {
                window.location.href = './login';
                //this.props.history.push('./login')
            }
        }

        return Promise.reject(error);
    }
);

api.loginUser = async (action) =>{
    const user = await api.post(`/identity/login`, action.data);

    api.defaults.headers.common["Authorization"] = "Bearer " + user?.data?.accessToken;
    const privileges = await api.get(`/identity/GetUserPrivileges`)

    return { ...user.data, ...privileges.data };
}

api.registerUser = async(action) => {
    const response = await api.post(`/identity/register`, action.data);
    return response;
}

api.deleteData = async(action) => {
    const url = `${action.module}/${action.id}`;
    return await api.delete(url);
}

api.editData = async(action) => {
    const url = `${action.module}/${action.data.id}`;
    return await api.put(url, action.data);
}

api.addData = async(action) => {
    return await api.post(action.module, action.data);
}

api.getData = async(action) => {
    //api.defaults.headers.common["Authorization"] = "Bearer " + loggedInUser?.accessToken;
    api.defaults.headers.get["ApiOption"] = JSON.stringify(action.option);

    return await api.get(action.module);
}
api.getSingleData = async(action) => {
    //api.defaults.headers.common["Authorization"] = "Bearer " + loggedInUser?.accessToken;
    const url = `${action.module}/${action.id}`;
    return await api.get(url);
}

export default api;