import { useDispatch } from "react-redux";
import { GetAllUsers, UpdateUserVerifiedStatus } from "../../apicalls/users";
import { message, Table, Button } from "antd";
import { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";

function Users() {
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();

    const getData = async () => {
        try {
            const response = await GetAllUsers();
            if (response.success) {
                setUsers(response.data);
            } else {
                message.error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    const updateStatus = async (record, isverified) => {
        try {
            const response = await UpdateUserVerifiedStatus({
                selectedUser: record._id,
                isverified,
            });
            if (response.success) {
                message.success(response.message);
                getData();
            } else {
                message.error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    const columns = [
        {
            title: "First Name",
            dataIndex: "firstName",
        },
        {
            title: "Last Name",
            dataIndex: "lastName",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Phone",
            dataIndex: "phoneNumber",
        },
        {
            title: "Verified",
            dataIndex: "isverified",
            render: (text) => (text ? "Yes" : "No"),
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => {
                if (record.isAdmin) return null;

                return (
                    <div className="flex gap-2">
                        {record.isverified ? (
                            <Button type="primary" danger onClick={() => updateStatus(record, false)}>
                                Suspend
                            </Button>
                        ) : (
                            <Button type="primary" onClick={() => updateStatus(record, true)}>
                                Activate
                            </Button>
                        )}
                    </div>
                );
            },
        },
    ];

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <PageTitle title="Users" />
            <Table dataSource={users} columns={columns} className="mt-2" rowKey="_id" />
        </div>
    );
}

export default Users;
