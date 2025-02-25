import React, { useEffect, useState } from 'react';
import { Button, Form } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import api from '../../../store/api-service';

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

const IUIMultiAssign = (props) => {
    const module = "user"
    const [value, setValue] = useState("")
    const [dataSet, setDataSet] = useState([])
    // State to track checked users
    const [checkedUsers, setCheckedUsers] = useState({});
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const pageOptions = { recordPerPage: 0 }
            const response = await api.getData({ module: module, options: pageOptions });
            setDataSet(response?.data)
        }

        fetchData();
    }, []);

    // Handle checkbox change
    const handleCheckboxChange = (id) => {
        setCheckedUsers(prevState => ({
            ...prevState,
            [id]: !prevState[id]  // Toggle checked state for this user
        }));
    };

    // Add checked users to the selected list
    const handleAddUsers = (e) => {
        const selected = dataSet?.items?.filter(user => checkedUsers[user.id]);
        setSelectedUsers(selected);
        props?.onClick(e, selected);
    };

    return (
        <>
            <Dropdown className='float-right'>
                <Dropdown.Toggle variant="contained" id="dropdown-users" className='btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-md mr-2'>
                    Share With...
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Search</Dropdown.Item>
                    <Dropdown.Divider />
                    {dataSet?.items?.map((item, i) => (
                        <Dropdown.Item key={i}>
                            <Form.Check
                                type="checkbox"
                                className="d-flex align-items-center mr-2"
                                checked={checkedUsers[item.id] || false}
                                onChange={() => handleCheckboxChange(item.id)}
                            />
                            {item.name}
                        </Dropdown.Item>
                    ))}
                    <Dropdown.Divider />
                    <Button
                        variant="contained"
                        className='btn-wide btn-pill btn-shadow btn-hover-shine btn-sm btn btn-primary mr-2'
                        onClick={e => handleAddUsers(e)}
                    >
                        Add Checked Users
                    </Button>
                </Dropdown.Menu>
            </Dropdown>
        </>
    );
}

export default IUIMultiAssign;