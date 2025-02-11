import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import PageTitle from "../../components/PageTitle";

function Profile() {
    const { user } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const images = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXByOdoEflY5nM_kNl_E53Px5v5DVO7H2VFQ&s",
        "https://ib.krishibank.org.bd/assets/images/bkb_left_logo.png",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxP6N7jWsi-XuQnKpr1JMdEAPPpylBP15hAg&s",
    ];

    return (
        <div className="profile-container">
            {/* Swiper Banner (Bank Image) */}
            <div className="swiper-container">
                <img className="w-full" src={images[1]} alt="Bank Image" />
            </div>

            {/* Welcome Section */}
            <PageTitle title={`Hello ${user.firstName} ${user.lastName}, Welcome to Bangladesh Krishi Bank`} />

            {/* Account Information Section */}
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-secondary p-4 mt-4 w-96 rounded-lg shadow-lg flex flex-col gap-2 uppercase">
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
            <div className="flex items-center justify-center min-h-screen">
                <div className="card p-4 mt-4 w-96 rounded-lg shadow-lg flex flex-col text-black gap-2 uppercase">
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
                </div>
            </div>
        </div>
    );
}

export default Profile;
