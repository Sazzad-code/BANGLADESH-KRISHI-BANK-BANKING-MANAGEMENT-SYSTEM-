import { message, Modal, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import PageTitle from "../../components/PageTitle";
import { UpdateUserDetails } from "../../apicalls/users";

function Profile() {
    const { user } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const [showEditModal, setShowEditModal] = useState(false);
    const [editUser, setEditUser] = useState({ ...user });

    const handleSaveUser = async () => {

        try {
            const response = await UpdateUserDetails({
                userId: editUser._id,
                firstName: editUser.firstName,
                lastName: editUser.lastName,
                email: editUser.email,
                phoneNumber: editUser.phoneNumber,
                identificationType: editUser.identificationType,
                identificationNumber: editUser.identificationNumber,
            });

            // console.log('im here')

            if (response.success) {
                message.success(response.message);
                setShowEditModal(false);
            } else {
                message.error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    return (
        <div className="profile-container">
            {/* Swiper Banner (Bank Image) */}
            <div className="swiper-container">
                <img className="w-full" src="https://ib.krishibank.org.bd/assets/images/bkb_left_logo.png" alt="Bank Image" />
            </div>

            {/* Welcome Section */}
            <PageTitle title={`Hello ${user.firstName} ${user.lastName}, Welcome to Bangladesh Krishi Bank`} />

            {/* Account Information Section */}
            <div className="flex items-center  justify-center min-h-screen" style={{ marginTop: "80px" }}>
                <div className="bg-secondary p-4 mt-4 w-50 rounded-lg shadow-lg flex flex-col gap-2 uppercase " style={{padding:'20px',borderRadius: '5px'}}>
                    <div className="flex justify-between">
                        <h1 className="text-md text-white">Account Number</h1>
                        <h1 className="text-md text-white">{user._id}</h1>
                    </div>
                    <div className="flex justify-between">
                        <h1 className="text-md text-white">Balance</h1>
                        <h1 className="text-md text-white">BDT {user.balance || 0}</h1>
                    </div>
                </div>
            </div>

            {/* User Profile Details Section */}
            <div className="flex items-center justify-center min-h-screen" style={{ marginTop: "20px" }}>
                <div className="card p-4 mt-4 w-50 rounded-lg shadow-lg flex flex-col text-black gap-2 uppercase">
                    <div className="flex justify-between">
                        <h1 className="text-md">First Name</h1>
                        <h1 className="text-md">{user.firstName}</h1>
                    </div>
                    <div className="flex justify-between">
                        <h1 className="text-md">Last Name</h1>
                        <h1 className="text-md">{user.lastName}</h1>
                    </div>
                    <div className="flex justify-between">
                        <h1 className="text-md">Email</h1>
                        <h1 className="text-md">{user.email}</h1>
                    </div>
                    <div className="flex justify-between">
                        <h1 className="text-md">Mobile</h1>
                        <h1 className="text-md">{user.phoneNumber}</h1>
                    </div>
                    <div className="flex justify-between">
                        <h1 className="text-md">Identification Type</h1>
                        <h1 className="text-md">{user.identificationType}</h1>
                    </div>
                    <div className="flex justify-between">
                        <h1 className="text-md">Identification Number</h1>
                        <h1 className="text-md">{user.identificationNumber}</h1>
                    </div>
                    <Button type="primary" className="mt-4" onClick={() => setShowEditModal(true)}>Edit Profile</Button>
                </div>
            </div>

            {/* Edit Profile Modal */}
            <Modal title="Edit Profile" open={showEditModal} onCancel={() => setShowEditModal(false)} onOk={handleSaveUser}>
                <Input placeholder="First Name" value={editUser.firstName} onChange={(e) => setEditUser({ ...editUser, firstName: e.target.value })} className="mb-2" />
                <Input placeholder="Last Name" value={editUser.lastName} onChange={(e) => setEditUser({ ...editUser, lastName: e.target.value })} className="mb-2" />
                <Input placeholder="Email" value={editUser.email} onChange={(e) => setEditUser({ ...editUser, email: e.target.value })} className="mb-2" />
                <Input placeholder="Phone Number" value={editUser.phoneNumber} onChange={(e) => setEditUser({ ...editUser, phoneNumber: e.target.value })} className="mb-2" />
                <Input placeholder="Identification Type" value={editUser.identificationType} onChange={(e) => setEditUser({ ...editUser, identificationType: e.target.value })} className="mb-2" />
                <Input placeholder="Identification Number" value={editUser.identificationNumber} onChange={(e) => setEditUser({ ...editUser, identificationNumber: e.target.value })} className="mb-2" />
            </Modal>
        </div>
    );
}

export default Profile;
