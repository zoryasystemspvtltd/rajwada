import { useEffect, useState } from "react";
import { Col, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/images/logo.png';
import api from '../store/api-service';
import ICarousel from "./common/ICarousel";

const ForgotPassword = () => {
    const module = 'identity'
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [notice, setNotice] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = '/static/theme/red/theme.css'; // Red theme CSS
        link.id = 'theme-link';

        const existingLink = document.getElementById('theme-link');
        if (existingLink) {
            existingLink.parentNode.removeChild(existingLink); // Remove previous theme
        }

        document.head.appendChild(link); // Append the light theme

        return () => {
            // Clean up theme on component unmount (when navigating away from login)
            const existingLink = document.getElementById('theme-link');
            if (existingLink) {
                existingLink.parentNode.removeChild(existingLink);
            }
        };
    }, []); // Run only on mount

    const handlePasswordReset = async () => {
        if (email === "") {
            setNotice("Invalid email.");
        }
        await api.forgotPassword({ module: module, data: { email: email } });
    };

    const resetPassword = async (e) => {
        e.preventDefault();
        handlePasswordReset();
    }

    return (
        <div className="app-login app-container app-theme-login-bg">
            <div className="app-container">
                <div className="mx-auto app-login-box">
                    <div className="app-logo">
                        <img src={logo} alt='logo' />
                    </div>

                    <Row>
                        <Col md={12} className="my-2 text-center">
                            <h4>
                                <p className="d-block">Forgot your Password ?</p>
                                {/* <span>Provide following information to recover it.</span> */}
                            </h4>

                        </Col>
                        <Col md={12} className="my-2 text-center">
                            <h5>
                                <p>Communicate with System Administrator to reset your password.</p>
                            </h5>
                        </Col>
                        <Col md={12} className="mt-2">
                            <Form>
                                {/* <Row>
                                            <Col md={12}>
                                                <Form.Group className="position-relative">
                                                    <Form.Label htmlFor='email'>Email</Form.Label>
                                                    <Form.Control type="email"
                                                        name="email"
                                                        id="email"
                                                        placeholder="Email here..."
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)} />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        {"" !== notice &&
                                            <Alert variant="warning" className="mt-2">
                                                {notice}
                                            </Alert>
                                        } */}
                                <Col md={12} className="mt-2 text-center">
                                    <Link to="/login" className="text-primary">Sign in with existing account</Link>
                                </Col>
                                {/* <div className="mt-4 d-flex align-items-center">
                                    <Link to="/login" className="text-primary">Sign in with existing account</Link>
                                    <div className="ml-auto">

                                        <Button
                                            variant="contained"
                                            size="sm"
                                            className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-lg"
                                            onClick={(e) => resetPassword(e)}
                                        >
                                            Reset Password
                                        </Button>
                                    </div>
                                </div> */}
                            </Form>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;