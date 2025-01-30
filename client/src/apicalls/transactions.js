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

// deposit funds using stripe

export const DepositFuncds = async (payload)=>{
    try {
        const {data} = await axiosInstance.post("api/transactions/deposit-funds", payload);
        return data;
    } catch (error) {
        return error.response.data
    }
}