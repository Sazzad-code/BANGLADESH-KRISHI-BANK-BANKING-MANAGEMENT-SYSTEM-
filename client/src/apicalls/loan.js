import { axiosInstance } from './'; 
// Get all loan requests for the logged-in user (user or admin)
export const GetAllLoansByUser = async () => {
    try {
        const { data } = await axiosInstance.post("/api/loans/get-all-loans-by-user");
        return data;
    } catch (error) {
        console.error("Error fetching loan requests:", error);
        return error.response ? error.response.data : { success: false, message: "Server error" };
    }
};

// Send loan request to admin
// Send loan request to admin
export const SendRequest = async (request) => {
    try {
        const { data } = await axiosInstance.post("/api/loans/send-request", {
            ...request,
            userId: request.userId // Ensure userId is included when sending request
        });
        return data;
    } catch (error) {
        return error.response ? error.response.data : { success: false, message: "Server error" };
    }
};
