import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PublicRoute(props) {
    const navigate = useNavigate();
    useEffect(() => {

        if (localStorage.getItem("token")) {
            navigate("/");
        }
    }, []);

    return (
    <div className="bg-primary">{props.children}</div>
)
}

export default PublicRoute;