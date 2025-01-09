import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "./DefaultLayout";
import { GetUserInfo } from "../apicalls/users";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/usersSlice";

function ProtectedRoute(props) {
    // const [userData, setUserData] = useState(null);
    const { user } = useSelector(state => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const getData = async () => {
        try {
            const response = await GetUserInfo();
            if (response.success) {
                dispatch(setUser(response.data));
                // setUserData(response.data);
            } else {
                message.error(response.message);
                navigate("/login");
            }
        }
        catch (error) {
            navigate("/login");
            message.error(error.message);
        }
    };


    useEffect(() => {
        if (localStorage.getItem("token")) {
            if (!user) {
                getData();
            }

        } else {
            navigate("/login")
        }
    }, []);
    return (
        user && <div>

      
            <DefaultLayout>
                {props.children}
            </DefaultLayout>


        </div>
    )
}

export default ProtectedRoute;