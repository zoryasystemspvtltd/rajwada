import React, { useEffect, useState, useRef } from 'react';
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
    const module = "user";
    const schema = props?.schema;
    const dropdownRef = useRef(null);
    const [dataSet, setDataSet] = useState([]);
    const [alreadyChecked, setAlreadyChecked] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    // State to track checked users
    const [checkedUsers, setCheckedUsers] = useState({});
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        async function fetchData() {
            const pageOptions = { recordPerPage: 0 }
            const response = await api.getData({ module: module, options: pageOptions });
            setDataSet(response?.data);
            
            let allAssignedUsersResponse = await api.assignedUsers({ module: schema?.module, id: schema?.id });
            let allAssignedUsers = allAssignedUsersResponse?.data;

            const assignedUserIds = allAssignedUsers?.map((item) => {
                return response?.data?.items?.find(user => user.email === item?.member)?.id
            })?.filter(value => value !== undefined) || [];

            // Set already checked users
            setAlreadyChecked(assignedUserIds);
            assignedUserIds?.forEach((id) => {
                setCheckedUsers(prevState => ({
                    ...prevState,
                    [id]: !prevState[id]
                }));
            })
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
        setDropdownOpen(false);
        props?.onClick(e, selected);
        setDataSet([]);
    };

    return (
        <>
            <Dropdown ref={dropdownRef} show={dropdownOpen} className='float-right' autoClose="outside">
                <Dropdown.Toggle
                    variant="primary"
                    id="dropdown-users"
                    className='btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-md mr-2'
                    onClick={() => setDropdownOpen(true)}>
                    Share With
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Search</Dropdown.Item>
                    <Dropdown.Divider />
                    {dataSet?.items?.map((item, i) => (
                        <Dropdown.ItemText key={i}>
                            <Form.Check
                                type="checkbox"
                                className=""
                                label={item.name}
                                checked={checkedUsers[item.id] || false}
                                onChange={() => handleCheckboxChange(item.id)}
                                disabled={alreadyChecked?.includes(item.id)}
                            />
                        </Dropdown.ItemText>
                    ))}
                    <Dropdown.Divider />
                    <Button
                        variant="contained"
                        className='btn-wide btn-pill btn-shadow btn-hover-shine btn-sm btn btn-primary ml-2'
                        onClick={e => handleAddUsers(e)}
                    >
                        Assign To Checked Users
                    </Button>
                </Dropdown.Menu>
            </Dropdown>
        </>
    );
}

export default IUIMultiAssign;