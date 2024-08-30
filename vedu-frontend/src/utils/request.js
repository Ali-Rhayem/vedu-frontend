import axios from "axios";
import { RequestMethods } from "./request_methods";

axios.defaults.baseURL = "http://127.0.0.1:8000";

export const requestApi = async ({
    includeToken = true,
    route,
    requestMethod = RequestMethods.GET,
    body,
    headers = {},
    navigationFunction,
}) => {
    try {
        const authHeaders = includeToken
            ? {
                Authorization: `Bearer ${localStorage.token}`,
            }
            : {};

        const combinedHeaders = {
            ...authHeaders,
            ...headers, 
        };

        const { data } = await axios.request({
            url: route,
            method: requestMethod,
            data: body,
            headers: combinedHeaders,
        });

        return data;
    } catch (error) {
        if (error.response.status === 401) {
            localStorage.clear();

            if (navigationFunction) {
                navigationFunction("/login");
            }
        }
        throw error;
    }
};
