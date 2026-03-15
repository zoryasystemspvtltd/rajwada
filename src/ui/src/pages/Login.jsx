import { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/images/civilier_new_logo.jpeg';
import { useAuth } from "../provider/authProvider";
import { loginUser } from "../store/api-db";
import ICarousel from "./common/ICarousel";

const Login = () => {
    const module = 'user';
    const navigate = useNavigate();
    const loggedInUser = useSelector((state) => state.api.loggedInUser)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [notice, setNotice] = useState("");
    const [dirty, setDirty] = useState(false)
    const { setToken } = useAuth();
    const [formErrors, setFormErrors] = useState({});
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

    const handleLogin = async () => {
        dispatch(loginUser({ module: module, data: { email: email, password: password } }));
    };

    const loginWithUsernameAndPassword = async (e) => {
        e.preventDefault();
        setDirty(true);
        setFormErrors(validate({ email: email, password: password }));
        if (Object.keys(validate({ email: email, password: password })).length === 0) {
            handleLogin();
        }
    }

    const validate = (values) => {
        const errors = {};
        if (!values.email || values.email === "") {
            errors.email = "Email is required";
        }
        /*if (!values.email) {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values[item.field])) {
                errors.email = 'Invalid email address.'
            }
        }*/
        if (!values.password || values.password === "") {
            errors.password = "Password is required";
        }

        return errors;
    }

    useEffect(() => {
        setNotice("");
        if (loggedInUser) {

            if (loggedInUser.accessToken) {
                setToken(loggedInUser);
                if (loggedInUser.resetPassword) {
                    navigate("/change-password", { replace: true });
                } else {
                    navigate("/", { replace: true });
                }
            }
            if (dirty) {
                setNotice("Wrong email or password.");
            }
        }

    }, [loggedInUser]);


    return (
        <div className="app-login app-container">
            <div className="carousel-background">
                <ICarousel />
            </div>
            <div className="app-container">
                <div className="mx-auto app-login-box">
                    <div className="app-logo">
                        <img src={logo} alt='logo' />
                    </div>

                    <h3 className="mb-0 text-center">
                        <span className="d-block">User Login</span>
                    </h3>
                    <Form onSubmit={(e) => loginWithUsernameAndPassword(e)}>
                        <Row>
                            <Col md={12} className="mt-2">
                                <Form.Group className="position-relative">
                                    <Form.Label htmlFor='email'>Email<span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="text"
                                        name="email"
                                        id="email"
                                        placeholder="Email here..."
                                        value={email}
                                        className={dirty ? (formErrors.email ? "is-invalid" : "is-valid") : ""}
                                        onChange={(e) => setEmail(e.target.value)} />
                                    <p className="text-danger">{formErrors.email}</p>
                                </Form.Group>
                            </Col>
                            <Col md={12} className="mt-2">
                                <Form.Group className="position-relative">
                                    <Form.Label htmlFor='password'>Password<span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Password here..."
                                        className={dirty ? (formErrors.password ? "is-invalid" : "is-valid") : ""}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                    <p className="text-danger">{formErrors.password}</p>
                                </Form.Group>
                            </Col>
                            {/* <Col className="mt-2">
                            <input name="check" id="exampleCheck" type="checkbox" className="form-check-input">
                                <label for="exampleCheck" className="form-check-label">Keep me logged in</label>
                        </Col> */}
                            {"" !== notice &&
                                <Alert variant="warning">
                                    {notice}
                                </Alert>
                            }
                            <Col md={12} className="mt-2">
                                <Button
                                    variant="contained"
                                    className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-lg w-100"
                                    type="submit"
                                >
                                    Login
                                </Button>
                            </Col>
                            <Col md={12} className="mt-2">
                                <Link to={'/forgot-password'} className="btn-lg btn btn-link w-100">Recover Password</Link>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </div>
    )
};

export default Login;
