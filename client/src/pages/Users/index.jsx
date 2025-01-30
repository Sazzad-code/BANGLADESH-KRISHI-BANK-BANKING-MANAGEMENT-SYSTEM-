import { useDispatch } from "react-redux";
import { GetAllUsers, UpdateUserVerifiedStatus } from "../../apicalls/users";
import { message, Table } from "antd";
import { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";

function Users() {
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();

    const getData = async () => {
        try {
            const response = await GetAllUsers();
            if (response.success) {
                setUsers(response.data)
            } else {
                message.error(response.message)
            }
        } catch (error) {
            message.error(error.message)
        }
    }
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
                message.error(response.message)
            }
        } catch (error) {
            message.error(error.message)

        }
    }
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
            render: (text, record) => {
                return text ? "yes" : "No"
            }
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => {
                {  if(record.isAdmin){
                    return
                }}
                return <div className="flex gap-1">
                   
                        {  record.isverified? (
                            <button className="primary-outlined-btn"
                                onClick={() => updateStatus(record, false)}>Suspend</button>
                        ) : (
                            <button className="primary-outlined-btn" 
                            onClick={() => updateStatus(record, true)}>Activate</button>
                        )

                     
                    }
              
                </div>
            }
        }
    ]

    useEffect(() => {
        getData()
    }, [])
    return (
        <div>
            <PageTitle title="Users" />
            <Table dataSource={users} columns={columns} className="mt-2" />

        </div>
    )
}

export default Users;