import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_URL || "https://localhost:7018/api";
console.log(`Server is running on port ${apiBaseUrl}.`)
const api = axios.create({ baseURL: apiBaseUrl });

api.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("token");
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
                const token = sessionStorage.getItem("token");
                const loggedInUser = JSON.parse(token);
                if (!loggedInUser) {
                    throw new error("Invalid User");
                }
                const refreshToken = loggedInUser?.refreshToken;
                const response = await axios.post(`${apiBaseUrl}/identity/refresh`, { refreshToken });
                const newToken = response.data;
                sessionStorage.setItem("token", JSON.stringify(newToken));
                // For Default Menu Role
                sessionStorage.setItem("menuRole", "admin");

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

api.loginUser = async (action) => {
    if (action.data.refreshToken) {
        const response = await axios.post(`${apiBaseUrl}/identity/refresh`, { refreshToken: action.data.refreshToken });
        const newToken = response.data;

        api.defaults.headers.common["Authorization"] = "Bearer " + newToken?.accessToken;
        const privileges = await api.get(`/identity/GetUserPrivileges`)

        return { ...newToken, ...privileges.data };
    }
    const user = await api.post(`/identity/login`, action.data);

    api.defaults.headers.common["Authorization"] = "Bearer " + user?.data?.accessToken;
    const privileges = await api.get(`/identity/GetUserPrivileges`)

    return { ...user.data, ...privileges.data };
}

api.changePassword = async (action) => {
    const response = await api.post(`/identity/changePassword`, action.data);
    return response;
}

api.resetPassword = async (action) => {
    const response = await api.post(`/identity/resetUserPassword`, action.data);
    return response;
}

api.updateProfile = async (action) => {
    const response = await api.post(`/identity/updateProfile`, action.data);
    return response;
}

api.forgotPassword = async (action) => {
    const response = await api.post(`/identity/forgotPassword`, action.data);
    return response;
}

api.registerUser = async (action) => {
    const response = await api.post(`/identity/register`, action.data);
    return response;
}

api.deleteData = async (action) => {
    const url = `${action.module}/${action.id}`;
    return await api.delete(url);
}

api.editData = async (action) => {
    const url = `${action.module}/${action.data.id}`;
    return await api.put(url, action.data);
}

api.editPartialData = async (action) => {
    const url = `${action.module}/${action.data.id}`;
    return await api.patch(url, action.data);
}

api.addData = async (action) => {
    return await api.post(action.module, action.data);
}

api.getData = async (action) => {
    //api.defaults.headers.common["Authorization"] = "Bearer " + loggedInUser?.accessToken;
    api.defaults.headers.get["ApiOption"] = JSON.stringify(action.options);
    const module = action.module.split('#')[0]
    return await api.get(action.module);
}
api.getSingleData = async (action) => {
    //api.defaults.headers.common["Authorization"] = "Bearer " + loggedInUser?.accessToken;
    const url = `${action.module}/${action.id}`;
    return await api.get(url);
}
api.getEnumData = async (action) => {
    //api.defaults.headers.common["Authorization"] = "Bearer " + loggedInUser?.accessToken;
    const url = `enum/${action.module}`;
    return await api.get(url);
}

api.getModules = async () => {
    //api.defaults.headers.common["Authorization"] = "Bearer " + loggedInUser?.accessToken;
    const url = `module`;
    return await api.get(url);
}

api.uploadExcelFile = async (action) => {
    const url = `/bulkdataupload?module=${action.module}`;
    const response = await api.post(url, action.data);
    return response;
}
api.downloadTemplate = async (action) => {
    const url = `/download/${action.module}`;
    const response = await api.get(url);
    return response;
}
api.downloadReport = async (action) => {
    const url = `/download/${action.module}/${action.id}`;
    const response = await api.get(url);
    return response;
}
api.downloadAggregatedReport = async (action) => {
    const url = `/download/${action.module}/${action.startDate}/${action.endDate}`;
    const response = await api.get(url);
    return response;
}

api.workerReport = async (action) => {
    const url = `/report`;
    const response = await api.post(url, action.data);
    return response;
}
api.assignedUsers = async (action) => {
    const url = `/assigneduser/${action.module}/${action.id}`;
    const response = await api.get(url);
    return response;
}
api.taskReport = async (action) => {
    const url = `/report/${action.id}`;
    const response = await api.get(url);
    return response;
}
api.getMyProject = async (action) => {
    const url = `/assignedproject`;
    const response = await api.get(url);
    return response;
}
api.mobileReport = async (action) => {
    const url = `/report/${action.startDate}/${action.endDate}`;
    const response = await api.get(url);
    return response;
}
api.getDataCopy = async (action) => {
    //api.defaults.headers.common["Authorization"] = "Bearer " + loggedInUser?.accessToken;
    const url = `/datacopy/${action.id}/${action.type}`;
    return await api.get(url);
}
api.getAmendmentsByNullValue = async (action) => {
    const url = `/nullvalue/${action.model}`;
    const response = await api.get(url);
    return response;
}
export default api;

