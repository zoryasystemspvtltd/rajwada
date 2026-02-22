import { useEffect, useState } from 'react';
import { Button, Col, Row } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import api from '../../../store/api-service';
import { formatStringDate } from '../../../store/datetime-formatter';
import IUILookUp from '../../common/shared/IUILookUp';
import IUIResetPasswordElement from '../../ResetUserPassword';
import IUIPageElement from '../../common/shared/IUIPageElement';

const ActivityListByStatus = (props) => {
    // Properties
    const setupSchema = props?.setupSchema;
    const schema = props?.listSchema;
    const module = "activity";
    const initialParams = { projectId: null, towerId: null, floorId: null, flatId: null, roomId: null };

    // Global State
    const loggedInUser = useSelector((state) => state.api.loggedInUser)
    const [dirty, setDirty] = useState(false);
    const [isSetupComplete, setIsSetupComplete] = useState(false)
    // Local State
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});
    const [privileges, setPrivileges] = useState({});
    const [dependencySelectParams, setDependencySelectParams] = useState(initialParams);
    const [activities, setActivities] = useState([]);
    console.log(props)
    const selectedOption = props?.status?.key;

    // Usage
    const navigate = useNavigate();

    useEffect(() => {
        const modulePrivileges = loggedInUser?.privileges?.filter(p => p.module === module)?.map(p => p.name);
        let access = {};
        modulePrivileges.forEach(p => {
            access = { ...access, ...{ [p]: true } }
        })
        setPrivileges(access);
        if (module !== 'workflow') {
            localStorage.removeItem("dependency-flow");
        }
    }, [loggedInUser, module]);

    useEffect(() => {
        async function fetchData() {
            const pageOptions = {
                recordPerPage: 0
            }

            const response = await api.getData({ module: module, options: pageOptions });
            setActivities(response?.data?.items);
        }

        fetchData();
    }, [module]);

    const handleChange = (e) => {
        e.preventDefault();
        const newData = { ...data, ...e.target.value }
        setData(newData);
        setDependencySelectParams({ ...dependencySelectParams, ...e.target.value });
    };

    const prepareActivityCreation = () => {
        const filteredActivites = activities.filter(item => {
            // Apply filter only if the corresponding filter value is not null or undefined
            const matchesA = dependencySelectParams?.projectId !== null ? item.projectId === parseInt(dependencySelectParams.projectId) : true;
            const matchesB = dependencySelectParams?.towerId !== null ? item.towerId === parseInt(dependencySelectParams.towerId) : true;
            const matchesC = dependencySelectParams?.floorId !== null ? item.floorId === parseInt(dependencySelectParams.floorId) : true;
            const matchesD = dependencySelectParams?.flatId !== null ? item.flatId === parseInt(dependencySelectParams.flatId) : true;
            // Return item if it matches all non-null filter conditions
            return matchesA && matchesB && matchesC && matchesD;
        });

        setActivities(filteredActivites);
    }

    return (
        <>
            <div className="tab-content">
                <div className="tabs-animation">
                    <div className={isSetupComplete ? "d-none" : "row my-3"}>
                        <div className="col-md-4">
                            <div className="main-card mb-3 card">
                                <div className="card-body">
                                    <div>

                                        <div>
                                            <Row>
                                                {/* LEFT COLUMN */}
                                                <Col>
                                                    {setupSchema?.fields?.map((fld, f) => (
                                                        <Row className={isSetupComplete ? "d-none" : ""} key={f}>
                                                            <Col>
                                                                {fld.type === 'area' &&
                                                                    <>
                                                                        <IUIPageElement
                                                                            id={setupSchema.module}
                                                                            schema={fld.fields}
                                                                            value={data}
                                                                            errors={errors}
                                                                            readonly={setupSchema.readonly}
                                                                            onChange={handleChange}
                                                                            dirty={dirty}
                                                                        />
                                                                        {/* <br /> */}
                                                                    </>
                                                                }
                                                                {fld.type !== 'area' &&
                                                                    <>
                                                                        <IUIPageElement
                                                                            id={setupSchema.module}
                                                                            schema={[fld]}
                                                                            value={data}
                                                                            errors={errors}
                                                                            onChange={handleChange}
                                                                            readonly={setupSchema.readonly}
                                                                        />
                                                                        {/* <br /> */}
                                                                    </>
                                                                }
                                                            </Col>
                                                        </Row>
                                                    ))}

                                                    <>
                                                        {
                                                            (selectedOption && !isSetupComplete) ? <Button variant="contained"
                                                                disabled={!isSetupComplete}
                                                                className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-md mr-2"
                                                                onClick={prepareActivityCreation}>Proceed</Button> : null
                                                        }
                                                    </>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-md-8">
                            {
                                (selectedOption && !isSetupComplete) ?
                                    <div className="main-card mb-3 card">
                                        <div className="card-body">
                                            <Row>
                                                <Col>
                                                    {
                                                        (activities.length > 0) && (
                                                            <>
                                                                <Row>
                                                                    <Col>
                                                                        <Table responsive>
                                                                            <thead>
                                                                                <tr>
                                                                                    {schema?.editing &&
                                                                                        <>
                                                                                            <th>
                                                                                                {privileges.edit &&
                                                                                                    <button type="submit" className="btn btn-link text-white p-0">#</button>
                                                                                                }
                                                                                            </th>
                                                                                        </>
                                                                                    }
                                                                                    {schema?.fields?.map((fld, f) => (
                                                                                        <th key={f} width={fld.width}>
                                                                                            {/* {fld.sorting &&
                                                                                                <button
                                                                                                    type="submit"
                                                                                                    className="btn btn-link text-white p-0"
                                                                                                    onClick={(e) => sortData(e, fld.field)}
                                                                                                >
                                                                                                    {activities?.options && fld.field === activities?.options.sortColumnName && activities?.options?.sortDirection ? <Icon.SortUp /> : <Icon.SortDown />} {activities?.options?.sortDirection}
                                                                                                    {fld.text}
                                                                                                </button>
                                                                                            } */}
                                                                                            
                                                                                                <button
                                                                                                    type="submit"
                                                                                                    className="btn btn-link text-white p-0"
                                                                                                >
                                                                                                    {fld.text}
                                                                                                </button>
                                                                                        </th>
                                                                                    ))}
                                                                                </tr>
                                                                            </thead>
                                                                            {
                                                                                <tbody>

                                                                                    {
                                                                                        activities?.map((item, i) => (
                                                                                            <tr key={i}>
                                                                                                {schema?.editing &&
                                                                                                    <>
                                                                                                        <td width={10}>
                                                                                                            {privileges.edit &&
                                                                                                                <Link to={`${item.id}/edit`} title='Edit'><i className="fa-solid fa-pencil"></i></Link>
                                                                                                            }
                                                                                                        </td>
                                                                                                    </>
                                                                                                }
                                                                                                {schema?.fields?.map((fld, f) => (
                                                                                                    <td key={f}>
                                                                                                        {fld.type === 'link' &&
                                                                                                            <Link to={`${item.id}`}>{item[fld.field]}</Link>
                                                                                                        }
                                                                                                        {(!fld.type || fld.type === 'text') && item[fld.field]}
                                                                                                        {fld.type === 'date' && item[fld.field] && formatStringDate(item[fld.field])}
                                                                                                        {fld.type === 'date' && !item[fld.field] && 'Not Provided'}
                                                                                                        {(fld.type === 'lookup') &&
                                                                                                            <IUILookUp
                                                                                                                value={item[fld.field]}
                                                                                                                schema={fld.schema}
                                                                                                                readonly={true}
                                                                                                                textonly={true}
                                                                                                            />
                                                                                                        }
                                                                                                       
                                                                                                        {(fld.type === 'reset-password') &&
                                                                                                            <IUIResetPasswordElement value={item[fld.field] || []}
                                                                                                                id={`reset-password-${item.id}`}
                                                                                                                text={fld.text}
                                                                                                                disabled={!privileges.edit}
                                                                                                            />
                                                                                                        }
                                                                                                    </td>
                                                                                                ))}
                                                                                            </tr>
                                                                                        ))
                                                                                    }
                                                                                </tbody>
                                                                            }
                                                                            {/* {schema.paging &&
                                                                                <tfoot>
                                                                                    <tr>
                                                                                        <td colSpan={schema?.fields.length}>
                                                                                            <Pagination size="sm" onClick={pageChanges}>
                                                                                                {[...Array(activities?.totalPages)].map((e, i) => {
                                                                                                    return <Pagination.Item key={i}
                                                                                                        className="paginate_button"
                                                                                                        active={(`${activities?.options?.currentPage}` === `${i + 1}`)}
                                                                                                    >{i + 1}</Pagination.Item>
                                                                                                })}
                                                                                            </Pagination>
                                                                                        </td>
                                                                                        {schema?.editing &&
                                                                                            <td>
                                                                                            </td>
                                                                                        }
                                                                                    </tr>
                                                                                </tfoot>
                                                                            } */}
                                                                        </Table>
                                                                    </Col>
                                                                </Row>
                                                            </>
                                                        )
                                                    }
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                    : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default ActivityListByStatus;
