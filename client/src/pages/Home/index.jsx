import { useEffect, useState } from "react";
import { message } from "antd";
import PageTitle from "../../components/PageTitle";
import { useSelector, useDispatch } from "react-redux";
import { GetTransactionsOfUser, GetAllTransactionCount, fetchTotalDeposits } from "../../apicalls/transactions";
import { GetAllUsers } from "../../apicalls/users";

function Home() {
    const [transactionsCount, setTransactionsCount] = useState(0); // State to hold transaction count
    const [userTransactionsCount, setUserTransactionsCount] = useState(0); // State to hold transaction count
    const [userDepositCount, setUserDepositCount] = useState(0); // State to hold transaction count
    const [usersCount, setUsersCount] = useState(0); // State to hold transaction count
    const { user } = useSelector((state) => state.users);

    const images = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXByOdoEflY5nM_kNl_E53Px5v5DVO7H2VFQ&s",
        "https://ib.krishibank.org.bd/assets/images/bkb_left_logo.png",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxP6N7jWsi-XuQnKpr1JMdEAPPpylBP15hAg&s",
    ];

    // Fetch transactions and count them
    const getTransactionsCount = async () => {
        try {
            const response = await GetAllTransactionCount(); // API call to get transactions
            if (response.success) {
                setTransactionsCount(response.data.length); // Set the count based on the fetched data
            } else {
                message.error("Failed to fetch transactions.");
            }
        } catch (error) {
            message.error("Error fetching transactions: " + error.message);
        }
    };

    const getUserTransactionsCount = async () => {
        try {
            const response = await GetTransactionsOfUser(); // API call to get transactions
            if (response.success) {
                setUserTransactionsCount(response.data.length); // Set the count based on the fetched data
            } else {
                message.error("Failed to fetch transactions.");
            }
        } catch (error) {
            message.error("Error fetching transactions: " + error.message);
        }
    };



    
    
    

    // Fetch transactions and count them
    const getUsersCount = async () => {
        try {
            const response = await GetAllUsers(); // API call to get transactions
            if (response.success) {
                setUsersCount(response.data.length); // Set the count based on the fetched data
            } else {
                message.error("Failed to fetch users.");
            }
        } catch (error) {
            message.error("Error fetching users: " + error.message);
        }
    };

    useEffect(() => {
        if (user) {
            getTransactionsCount(); // Fetch transactions count when user is available
            getUsersCount(); // Fetch users count when user is available
            getUserTransactionsCount();
        
        }
    }, [user]);

    return (
        <div className="home-container">
            {/* Swiper Banner */}
            <div className="swiper-container">
                <img className="w-full" src={`${images[1]}`} alt="Bank Image" />
            </div>

            {/* Welcome Section */}
            <div className="welcome" style={{ marginBottom: "120px" }}>
                <PageTitle title={`Hello ${user.firstName} ${user.lastName}, Welcome to Bangladesh Krishi Bank`} />
            </div>



            {/* Conditional Rendering: Hide Dashboard for Admin */}
            {user.isAdmin ? (
    <div className="admin-dashboard">
        
        <div className="card account-card">
                        <h2>Users</h2>
                        <p>{usersCount}</p>
                    </div>

                    
                   

                    {/* Help Line Card */}
                    <div className="card help-card">
                        <h2>Help Line</h2>
                        <p>{Number} 01862484807 bkb@gmail.com</p>
                    </div>

                    {/* Transactions Card */}
                    <div className="card transactions-card">
                        <h2>Recent Transactions</h2>
                        <p>{transactionsCount} transactions</p>
                    </div>
    </div>
) : (
    <div className="dashboard-container">
                    {/* Account Number Card */}
                    <div className="card account-card">
                        <h2>Account Number</h2>
                        <p>{user._id}</p>
                    </div>

                    {/* Balance Card */}
                    <div className="card balance-card">
                        <h2>Balance</h2>
                        <p>BDT {user.balance || 0}</p>
                    </div>

                    {/* Help Line Card */}
                    <div className="card help-card">
                        <h2>Help Line</h2>
                        <p>{Number} 01862484807 bkb@gmail.com</p>
                    </div>

                    {/* Transactions Card */}
                    <div className="card transactions-card">
                        <h2>Recent Transactions</h2>
                        <p>{userTransactionsCount} transactions</p>
                    </div>
          
    </div>
      
            )}

            {/* Bank Introduction Section */}
        </div>
    );
}

export default Home;
