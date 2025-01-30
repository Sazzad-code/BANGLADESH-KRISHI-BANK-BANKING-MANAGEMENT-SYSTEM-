import { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import NewRequestModal from "./NewRequestModal";
import { GetAllLoansByUser } from "../../apicalls/loan";
import { useSelector } from "react-redux";
import { Table, message } from "antd";
import moment from "moment";

function Loan() {
    const [data, setData] = useState([]);
    const [showNewRequestModal, setShowNewRequestModal] = useState(false);
    const { user } = useSelector(state => state.users);

    const columns = [
        {
            title: "Request ID",
            dataIndex: "_id",
        },
        {
            title: "Sender",
            dataIndex: "sender",
            render(sender) {
                return sender?.firstName + " " + sender?.lastName || "N/A";
            }
        },
        {
            title: "Date",
            dataIndex: "date",
            render: (text, record) => {
                return moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss A");
            }
        },
        {
            title: "Description",
            dataIndex: "description",
        },
        {
            title: "Status",
            dataIndex: "status",
        }
    ];

    const getData = async () => {
        try {
            const response = await GetAllLoansByUser();
            if (response.success) {
                setData(response.data); // Populate data with loan requests
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <div className="flex justify-between">
                <PageTitle title={"Loan"} />
                {user && !user.isAdmin && (
                    <button className="primary-outlined-btn"
                        onClick={() => setShowNewRequestModal(true)}>
                        Apply Loan
                    </button>
                )}
            </div>

            <Table columns={columns} dataSource={data} rowKey="_id" />

            {showNewRequestModal && <NewRequestModal
                showNewRequestModal={showNewRequestModal}
                setShowNewRequestModal={setShowNewRequestModal}
                reloadData={getData}
            />}
        </div>
    );
}

export default Loan;
