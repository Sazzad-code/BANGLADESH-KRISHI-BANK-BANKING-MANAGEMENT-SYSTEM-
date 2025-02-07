import React, { useState, useEffect } from "react";
import { Table, Button, message } from "antd";
import { GetAllLoansByUser } from "../../apicalls/loan";
import { axiosInstance } from "../../apicalls";
import { useSelector } from "react-redux";
import moment from "moment";
import NewRequestModal from "./NewRequestModal";

function Loan() {
    const [data, setData] = useState([]);
    const { user } = useSelector((state) => state.users);
    const [showNewRequestModal, setShowNewRequestModal] = useState(false);

    const getData = async () => {
        try {
            const response = await GetAllLoansByUser();
            if (response.success) {
                setData(response.data);
            }
        } catch (error) {
            message.error("Failed to fetch loan requests.");
        }
    };

    useEffect(() => {
        getData();
    }, []);

    // Accept loan (Admin only)
    const handleAccept = async (requestId) => {
        try {
            const { data } = await axiosInstance.post("/api/loans/accept-loan", { requestId });
            if (data.success) {
                message.success(data.message);
                getData(); // Refresh loan list
            } else {
                message.error(data.message);
            }
        } catch (error) {
            message.error("Failed to accept loan request.");
        }
    };

    // Reject loan (Admin only)
    const handleReject = async (requestId) => {
        try {
            const { data } = await axiosInstance.post("/api/loans/reject-loan", { requestId });
            if (data.success) {
                message.success(data.message);
                getData(); // Refresh loan list
            } else {
                message.error(data.message);
            }
        } catch (error) {
            message.error("Failed to reject loan request.");
        }
    };

    const columns = [
        {
            title: "Request ID",
            dataIndex: "_id",
        },
        {
            title: "Sender",
            dataIndex: "sender",
            render: (sender) => sender?.firstName + " " + sender?.lastName || "N/A",
        },
        {
            title: "Amount",
            dataIndex: "amount",
        },
        {
            title: "Status",
            dataIndex: "status",
        },
        {
            title: "Description",
            dataIndex: "description",
        },
        {
            title: "Date",
            dataIndex: "createdAt",
            render: (date) => moment(date).format("DD-MM-YYYY hh:mm:ss A"),
        },
    ];

    // **ADMIN VIEW: Show Action Buttons**
    if (user.isAdmin) {
        columns.push({
            title: "Actions",
            render: (text, record) => (
                <div className="flex gap-2">
                    <Button
                        style={{
                            backgroundColor: "green",
                            color: "white",
                            border: "none",
                            padding: "6px 16px",
                        }}
                        onClick={() => handleAccept(record._id)}
                        disabled={record.status !== "pending"}
                    >
                        Accept
                    </Button>

                    <Button
                        style={{
                            backgroundColor: "red",
                            color: "white",
                            border: "none",
                            padding: "6px 16px",
                        }}
                        onClick={() => handleReject(record._id)}
                        disabled={record.status !== "pending"}
                    >
                        Reject
                    </Button>
                </div>
            ),
        });
    }

    return (
        <div>
            <h2>Loan Requests</h2>

            {/* Show Apply Loan Button only for users, not admins */}
            {!user.isAdmin && (
                <div className="flex justify-end my-4">
                    <Button
                    style={{
                            backgroundColor: "green",
                            color: "white",
                            border: "none",
                            padding: "6px 16px",
                        }}
                        className="bg-green-500 hover:bg-green-600 text-white border-none px-6 py-2"
                        size="large"
                        onClick={() => setShowNewRequestModal(true)}
                    >
                        Apply Loan
                    </Button>
                </div>
            )}

            <Table columns={columns} dataSource={data} rowKey="_id" pagination={false} />

            {showNewRequestModal && (
                <NewRequestModal
                    showNewRequestModal={showNewRequestModal}
                    setShowNewRequestModal={setShowNewRequestModal}
                />
            )}
        </div>
    );
}

export default Loan;
