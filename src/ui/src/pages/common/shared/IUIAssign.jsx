import Dropdown from 'react-bootstrap/Dropdown';
import api from '../../../store/api-service'
import React, { useState, useEffect } from 'react';
import { Button, Col, Row, Container } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux'
import Form from 'react-bootstrap/Form';

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
        href=""
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children}
        &#x25bc;
    </a>
));

const IUIAssign = (props) => {
    const module = "user"
    const [value, setValue] = useState("")
    const [dataSet, setDataSet] = useState([])

    useEffect(() => {
        async function fetchData() {
            const pageOptions = { recordPerPage: 0 }
            const response = await api.getData({ module: module, options: pageOptions });
            setDataSet(response?.data)
        }

        fetchData();
    }, []);

    return (
        <>
            <Dropdown className='float-right'>
                <Dropdown.Toggle variant="success" id="dropdown-users" className='btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-md mr-2'>
                    Share With...
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Search</Dropdown.Item>
                    <Dropdown.Divider />
                    {dataSet?.items?.map((item, i) => (
                        <Dropdown.Item key={i} onClick={e => props?.onClick(e, item.email)}>{item.name}</Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </>
    );
}

export default IUIAssign;