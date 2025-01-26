import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Col, Row } from "react-bootstrap";
import { useSelector } from 'react-redux';
import Calendar from './Calender';


const IUIList = (props) => {
    const schema = props?.schema;
    const module = schema?.module;
    const loggedInUser = useSelector((state) => state.api.loggedInUser)
    const [privileges, setPrivileges] = useState({});

    // useEffect(() => {
    //     async function fetchData() {
    //         const pageOptions = {
    //             recordPerPage: 0
    //         }

    //         const response = await api.getData({ module: module, options: pageOptions });

    //         setTasks(response.data.items.map(task => ({
    //             ...task,
    //             extendedDates: []
    //         })));

    //     }

    //     fetchData();
    // }, [module]);

    useEffect(() => {
        const modulePrivileges = loggedInUser?.privileges?.filter(p => p.module === module)?.map(p => p.name);
        let access = {};
        modulePrivileges.forEach(p => {
            access = { ...access, ...{ [p]: true } }
        })

        setPrivileges(access)
    }, [loggedInUser, module]);

    // const pageChanges = async (e) => {
    //     e.preventDefault();
    //     const pageOptions = {
    //         currentPage: e.target.text
    //     }
    //     dispatch(getData({ module: module, options: pageOptions }));
    // };
    // const sortData = async (e, field) => {
    //     e.preventDefault();
    //     const sortOptions = {
    //         sortColumnName: field,
    //         sortDirection: !dataSet?.options?.sortDirection
    //     }

    //     dispatch(getData({ module: module, options: sortOptions }));
    // }
    return (
        <>
            <div className="app-page-title">
                <div className="page-title-heading"> {schema?.title}</div>

            </div>
            <div className="tab-content">
                <div className="tabs-animation">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="main-card mb-3 card">
                                <div className="card-body">
                                    <Row>
                                        <Col>
                                            <Calendar />
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>

    )
}

export default IUIList;