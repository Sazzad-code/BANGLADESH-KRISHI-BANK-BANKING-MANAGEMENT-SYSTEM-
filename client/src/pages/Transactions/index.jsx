import React, { useEffect, useState, useRef } from "react";
import PageTitle from "../../components/PageTitle";
import { message, Table, DatePicker, Button, Input, Spin, Tooltip } from "antd";
import { PlusOutlined, SwapOutlined, PrinterOutlined } from "@ant-design/icons";
import TransferFundsModal from "./TransferFundsModal";
import DepositeModal from "./DepositeModal";
import { useDispatch, useSelector } from "react-redux";
import { GetTransactionsOfUser } from "../../apicalls/transactions";
import moment from "moment";

const { RangePicker } = DatePicker;

function Transactions() {
    const [showTransferFundsModal, setShowTransferFundsModal] = useState(false);
    const [showDepositModal, setShowDepositModal] = useState(false);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [dateRange, setDateRange] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.users);
    const printRef = useRef();

    const columns = [
        {
            title: "Date",
            dataIndex: "date",
            render: (text, record) => moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss A"),
        },
        {
            title: "Transaction ID",
            dataIndex: "_id",
        },
        {
            title: "Amount",
            dataIndex: "amount",
        },
        {
            title: "Type",
            dataIndex: "type",
            render: (text, record) => getTransactionType(record),
        },
        {
            title: "Reference Account",
            dataIndex: "",
            render: (text, record) => (
                <div>
                    <h1 className="text-sm">
                        {record.sender._id === user._id
                            ? `${record.receiver.firstName} ${record.receiver.lastName}`
                            : `${record.sender.firstName} ${record.sender.lastName}`}
                    </h1>
                </div>
            ),
        },
        {
            title: "Reference",
            dataIndex: "reference",
        },
        {
            title: "Status",
            dataIndex: "status",
        },
    ];

    const getTransactionType = (record) => {
        if (record.sender._id === record.receiver._id) {
            return "Deposit";
        }
        return record.sender._id === user._id ? "Debit" : "Credit";
    };

    const getData = async () => {
        setLoading(true);
        try {
            const response = await GetTransactionsOfUser();
            if (response.success) {
                setData(response.data);
                setFilteredData(response.data);
            }
        } catch (error) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const filterByDate = (dates) => {
        setDateRange(dates);
        applyFilters(searchQuery, dates);
    };

    const handleSearch = (e) => {
        const value = e.target.value.trim();
        setSearchQuery(value);
        applyFilters(value, dateRange);
    };

    const applyFilters = (searchTerm, dates) => {
        let filtered = [...data];

        if (dates && dates.length === 2) {
            const [startDate, endDate] = dates.map((date) => new Date(date).setHours(0, 0, 0, 0));
            filtered = filtered.filter((transaction) => {
                const transactionDate = new Date(transaction.createdAt).setHours(0, 0, 0, 0);
                return transactionDate >= startDate && transactionDate <= endDate;
            });
        }

        if (searchTerm) {
            filtered = filtered.filter((transaction) =>
                transaction._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                transaction.sender._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                transaction.receiver._id.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredData(filtered);
    };

    const handlePrint = () => {
        const printContent = printRef.current.innerHTML;
        const originalContent = document.body.innerHTML;

        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;
        window.location.reload();
    };

    return (
        <div>
            <div className="flex justify-between items-center">
                <PageTitle title="Transactions" />
                <Tooltip title="Print Transactions">
                    <Button
                    style={{
                        backgroundColor: " #90EE90",
                        color: "white",
                        border: "none",
                        padding: "6px 16px",
                    }}
                        className="bg-gray-500 hover:bg-gray-600 border-none text-black"
                        icon={<PrinterOutlined />}
                        size="large"
                        onClick={handlePrint}
                    >
                        Print
                    </Button>
                </Tooltip>
            </div>

            {/* Centered Deposit & Transfer Buttons with More Space */}
            <div className="flex justify-center gap-8 my-6">
                <Tooltip title="Deposit Funds">
                    <Button
                        className="bg-gray-500 hover:bg-gray-600 border-none text-black px-6 py-2"
                        icon={<PlusOutlined />}
                        size="large"
                        onClick={() => setShowDepositModal(true)}
                    >
                        Deposit
                    </Button>
                </Tooltip>

                <Tooltip title="Transfer Funds">
                    <Button
                        className="bg-gray-500 hover:bg-gray-600 border-none text-black px-6 py-2"
                        icon={<SwapOutlined />}
                        size="large"
                        onClick={() => setShowTransferFundsModal(true)}
                    >
                        Transfer
                    </Button>
                </Tooltip>
            </div>

            {/* Date Range Picker (Visible to All Users) */}
            <div className="flex justify-between items-center my-4">
                <RangePicker onChange={filterByDate} />
            </div>

            {/* Search Input (Admin Only) */}
            {user.isAdmin && (
                <div className="flex justify-between items-center my-4">
                    <Input
                        placeholder="Search by Transaction ID or User ID"
                        value={searchQuery}
                        onChange={handleSearch}
                        style={{ width: 300 }}
                        allowClear
                    />
                </div>
            )}


            {/* Transactions Table */}
            <div ref={printRef} className="p-4 bg-white">
                {loading ? (
                    <div className="flex justify-center items-center">
                        <Spin size="large" />
                    </div>
                ) : (
                    <Table
                        columns={columns}
                        dataSource={filteredData}
                        className="mt-2"
                        rowKey="_id"
                        pagination={{ pageSize: 10 }}
                    />
                )}
            </div>

            {/* Modals */}
            {showTransferFundsModal && (
                <TransferFundsModal
                    showTransferFundsModal={showTransferFundsModal}
                    setShowTransferFundsModal={setShowTransferFundsModal}
                />
            )}
            {showDepositModal && (
                <DepositeModal
                    showDepositModal={showDepositModal}
                    setShowDepositModal={setShowDepositModal}
                />
            )}
        </div>
    );
}

export default Transactions;
