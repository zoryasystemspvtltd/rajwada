import { useState, useEffect } from "react";
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/images/logo.png';
import ICarousel from "./common/ICarousel";
import { useDispatch } from 'react-redux'
import Modal from 'react-bootstrap/Modal';
import api from '../store/api-service'

const IUIResetPasswordElement = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setNotice("");
        setShow(true);
    }

    const navigate = useNavigate();
    const [email, setEmail] = useState(props?.value);
    const [isDisabled, setIsDisabled] = useState(props?.disabled);
    const [notice, setNotice] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        setEmail(props?.value)
    }, [props?.value]);

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        await api.resetPassword({ module: module, data: { email: email } });
        setNotice("Reset Password Success.");
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow} disabled={isDisabled}>
                {props?.text}
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Reset Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        You are going to reset password for the user {email} with default password
                        : Admin@123
                    </p>
                    {"" !== notice &&
                        <Alert variant="warning" className="mt-2">
                            {notice}
                        </Alert>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handlePasswordReset}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default IUIResetPasswordElement;