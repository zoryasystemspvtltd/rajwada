import Dropdown from 'react-bootstrap/Dropdown';
import api from '../../../store/api-service'
import React, { useState, useEffect } from 'react';

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

const IUIApprover = (props) => {
    const module = "user"    
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
                <Dropdown.Toggle variant="contained" id="dropdown-users" className='btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-md mr-2'>
                    Assign for Approval...
                </Dropdown.Toggle>

                <Dropdown.Menu>                    
                    {dataSet?.items?.map((item, i) => (
                        <Dropdown.Item key={i} onClick={e => props?.onClick(e, item.email)}>{item.name}</Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </>
    );
}

export default IUIApprover;