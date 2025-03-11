import { axiosInstance } from './'; 

//verify receiver account

export const verifyAccount = async (payload) => {
    try {
        const {data} = await axiosInstance.post(
            "/api/transactions/verify-account",
            payload
        );
        return data;
    } catch (error) {
        return error.response.data;
    }
};

// transfer funds
export const TransferFunds = async (payload) => {
    try {
        const {data} = await axiosInstance.post(
            "/api/transactions/transfer-fund",
            payload
        );
        return data;

    } catch (error) {
        return error.response.data;
    }
};

//get all transactions for a user
export const GetTransactionsOfUser = async () =>{
    try {
        const {data} = await axiosInstance.post("/api/transactions/get-all-transactions-by-user");
        return data;
    } catch (error) {
        return error.response.data;
        
    }
}

//get all transactions for a user
export const GetAllTransactionCount = async () =>{
    try {
        const {data} = await axiosInstance.post("/api/transactions/get-all-transactions");
        return data;
    } catch (error) {
        return error.response.data;
        
    }
}

// Get all transactions for admin
export const GetAllTransactions = async () => {
    try {
        const { data } = await axiosInstance.post(
            "/api/transactions/get-all-transactions"
        );
        return data;
    } catch (error) {
        return error.response.data;
    }
};

// deposit funds using stripe

export const DepositFuncds = async (payload)=>{
    try {
        const {data} = await axiosInstance.post("api/transactions/deposit-funds", payload);
        return data;
    } catch (error) {
        return error.response.data
    }
}




export const fetchTotalDeposits = async (userId) => {
    try {
        const response = await axios.get("/api/transactions/total-deposits", {
            params: { userId },
        });

        return { success: true, totalDeposits: response.data.totalDeposits || 0 };
    } catch (error) {
        console.error("Error fetching total deposits:", error);
        return { success: false, totalDeposits: 0 };
    }
};