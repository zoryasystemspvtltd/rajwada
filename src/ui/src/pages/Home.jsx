import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { useEffect } from "react";

const Home = () => {
    const { token ,setToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (token && token.logout) {
            setToken();
            navigate("/", { replace: true });
        }
    }, [token]);

    return (
        <>
            {token && !token.logout ?
                <Navigate to="./home" />
                :
                <Navigate to="./logout" />
            }
        </>
    )
}

export default Home