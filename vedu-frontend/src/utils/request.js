import axios from "axios";
import { RequestMethods } from "./request_methods";

const baseURL =
    process.env.REACT_APP_API_BASE_URL_PRODUCTION || process.env.REACT_APP_API_BASE_URL_LOCAL;

axios.defaults.baseURL = baseURL;

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
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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
            // localStorage.clear();

            if (navigationFunction) {
                navigationFunction("/login");
            }
        }
        throw error;
    }
};
