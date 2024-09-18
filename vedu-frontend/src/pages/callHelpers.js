export const getUserFromLocalStorage = () => {
    const userString = localStorage.getItem("user");
    if (userString) {
        try {
            return JSON.parse(userString);
        } catch (error) {
            console.error("Error parsing user data:", error);
        }
    }
    return null;
};

export const getStreamToken = () => localStorage.getItem("stream_token");
