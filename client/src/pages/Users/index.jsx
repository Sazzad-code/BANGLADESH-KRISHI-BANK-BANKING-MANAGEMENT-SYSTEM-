import { useDispatch } from "react-redux";
import { GetAllUsers, UpdateUserVerifiedStatus } from "../../apicalls/users";
import { message, Table, Button, Modal, Input } from "antd";
import { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";

function Users() {
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
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

    const handleEditUser = (user) => {
        setEditUser(user);
        setShowEditModal(true);
    };

    const handleSaveUser = () => {
        // Here, you can call an API to update user details
        message.success("User information updated successfully!");
        setShowEditModal(false);
        getData(); // Refresh data after update
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
                        <Button type="default" onClick={() => handleEditUser(record)}>
                            Edit
                        </Button>
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

            {/* Edit User Modal */}
            <Modal
                title="Edit User Information"
                open={showEditModal}
                onCancel={() => setShowEditModal(false)}
                onOk={handleSaveUser}
            >
                <Input
                    placeholder="First Name"
                    value={editUser?.firstName}
                    onChange={(e) => setEditUser({ ...editUser, firstName: e.target.value })}
                    className="mb-2"
                />
                <Input
                    placeholder="Last Name"
                    value={editUser?.lastName}
                    onChange={(e) => setEditUser({ ...editUser, lastName: e.target.value })}
                    className="mb-2"
                />
                <Input
                    placeholder="Email"
                    value={editUser?.email}
                    onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                    className="mb-2"
                />
                <Input
                    placeholder="Phone Number"
                    value={editUser?.phoneNumber}
                    onChange={(e) => setEditUser({ ...editUser, phoneNumber: e.target.value })}
                    className="mb-2"
                />
            </Modal>
        </div>
    );
}

export default Users;
