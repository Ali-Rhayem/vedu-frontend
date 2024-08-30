import axios from "axios";
import { RequestMethods } from "./request_methods";

axios.defaults.baseURL = "http://127.0.0.1:8000";

export const requestApi = async ({
    includeToken = true,
    route,
    requestMethod = RequestMethods.GET,
    body,
    navigationFunction,
}) => {
    try {
        const headers = includeToken
            ? {
                Authorization: `Bearer ${localStorage.token}`,
            }
            : {};

        const { data } = await axios.request({
            url: route,
            method: requestMethod,
            data: body,
            headers: headers,
        });

        return data;
    } catch (error) {
        if (error.response.status === 401) {
            localStorage.clear();

            navigationFunction("/login");
        }
    }
};
