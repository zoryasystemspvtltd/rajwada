import { useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import api from '../../../store/api-service';
import IUIPageElement from './IUIPageElement';

const IUIMultiCopyFilter = (props) => {
    // Properties
    const schema = props?.schema;
    const module = schema?.module;
    const initialParams = { projectId: null, towerId: null, floorId: null, flatId: null, workflowId: null, dependencyId: null, photoUrl: null };
    // Parameter
    const { id } = useParams();

    // Global State
    const loggedInUser = useSelector((state) => state.api.loggedInUser);
    const [isCopy, setIsCopy] = useState(false);
    const [dirty, setDirty] = useState(false);
    // Local State
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});
    const [privileges, setPrivileges] = useState({});
    const [dependencySelectParams, setDependencySelectParams] = useState(initialParams);
    const [allDependencies, setAllDependencies] = useState([]); // API should be in backend to filter and fetch dependencies
    const [selectedValues, setSelectedValues] = useState([])
    const [disabled, setDisabled] = useState(false);

    const filteredDependencies = allDependencies.filter(item => {
        // Apply filter only if the corresponding filter value is not null or undefined
        const matchesA = dependencySelectParams?.projectId !== null ? item.projectId === parseInt(dependencySelectParams.projectId) : true;
        const matchesB = dependencySelectParams?.towerId !== null ? item.towerId === parseInt(dependencySelectParams.towerId) : true;
        const matchesC = dependencySelectParams?.floorId !== null ? item.floorId === parseInt(dependencySelectParams.floorId) : true;
        const matchesD = dependencySelectParams?.flatId !== null ? item.flatId === parseInt(dependencySelectParams.flatId) : true;


        // Return item if it matches all non-null filter conditions
        return matchesA && matchesB && matchesC && matchesD;
    });

    // Usage
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const pageOptions = {
                recordPerPage: 0
            }

            const response = await api.getData({ module: module, options: pageOptions });
            setAllDependencies(response?.data?.items);
        }

        fetchData();
    }, [module]);

    useEffect(() => {
        async function fetchData() {
            if (id) {
                const item = await api.getSingleData({ module: module, id: id });
                setData(item.data);
            }
        }

        fetchData();
    }, [id, module]);

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

    const handleCheckBoxChange = (e) => {
        setIsCopy(e.target.checked);
    }

    const handleChange = (e) => {
        e.preventDefault();
        const newData = { ...data, ...e.target.value }
        setData(newData);
        setDependencySelectParams({ ...dependencySelectParams, ...e.target.value });
    };

    const handleDependencySelection = (event) => {
        setDependencySelectParams({ ...dependencySelectParams, workflowId: event.target.value });

        const { value, checked } = event.target;
        if (!props?.readonly) {
            if (checked) {
                setSelectedValues([...selectedValues, parseInt(value)]);


            } else {
                let newValues = selectedValues.filter((v) => v !== parseInt(value));
                setSelectedValues(newValues);
            }
            // props.onChange(event);
        }
    };

    const handleAllDependencySelection = (event) => {
        const { checked } = event.target;
        if (!props?.readonly) {
            if (checked) {
                setSelectedValues([...(filteredDependencies?.map(x => x?.id))]);

            } else {
                setSelectedValues([]);
            }
            // props.onChange(event);
        }
    };

    const prepareDependencyCopy = async (e) => {
        e.preventDefault();
        const selectedDependencies = allDependencies?.filter((dependency) => selectedValues.includes(dependency.id));
        const customEvent = { target: { id: 'multicopy', value: selectedDependencies }, preventDefault: function () { } };
        props.onChange(customEvent);
    };

    return (
        <>
            <Form.Group className="position-relative form-group">
                <InputGroup>
                    <Form.Check
                        type="checkbox"
                        label={`Copy From Existing ${schema?.copyLabel}`}
                        className="d-flex align-items-center mr-2"
                        checked={isCopy}
                        onChange={(e) => handleCheckBoxChange(e)}
                    />
                </InputGroup>
            </Form.Group>
            {
                (isCopy) && (
                    <div className="tab-content">
                        <div className="tabs-animation">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="main-card mb-3 card">
                                        <div className="card-body">
                                            <div>
                                                <Row>
                                                    {schema?.fields?.map((fld, f) => (
                                                        <Col md={fld.width || 6} key={f}>
                                                            {fld.type === 'area' &&
                                                                <>
                                                                    <IUIPageElement
                                                                        id={schema.module}
                                                                        schema={fld.fields}
                                                                        value={data}
                                                                        errors={errors}
                                                                        readonly={schema.readonly}
                                                                        onChange={handleChange}
                                                                        dirty={dirty}
                                                                    />
                                                                    {/* <br /> */}
                                                                </>
                                                            }
                                                            {fld.type !== 'area' &&
                                                                <>
                                                                    <IUIPageElement
                                                                        id={schema.module}
                                                                        schema={[fld]}
                                                                        value={data}
                                                                        errors={errors}
                                                                        onChange={handleChange}
                                                                        readonly={schema.readonly}
                                                                    />
                                                                    {/* <br /> */}
                                                                </>
                                                            }
                                                        </Col>
                                                    ))}
                                                </Row>

                                                <Row>
                                                    {
                                                        (dependencySelectParams.projectId !== null && filteredDependencies.length > 0) && (
                                                            <Form.Group className="position-relative form-group">
                                                                <Form.Label className='text-uppercase mb-2'>
                                                                    Select a Dependency Label Setting
                                                                </Form.Label>

                                                                <div>
                                                                    <Form.Check className='text-capitalize'
                                                                        type="checkbox"
                                                                        id={"All"}
                                                                        value={"All"}
                                                                        checked={selectedValues?.length === filteredDependencies?.length}
                                                                        onChange={(e) => handleAllDependencySelection(e)}
                                                                        disabled={props.readonly}
                                                                        label={"Select All"}
                                                                    />
                                                                </div>


                                                                {
                                                                    filteredDependencies?.map((x, i) =>
                                                                        <div key={i}>
                                                                            <Form.Check className='text-capitalize'
                                                                                type="checkbox"
                                                                                id={x?.id}
                                                                                value={x?.id}
                                                                                checked={selectedValues.includes(x?.id)}
                                                                                onChange={(e) => handleDependencySelection(e)}
                                                                                disabled={props.readonly}
                                                                                label={x?.name}
                                                                            />
                                                                        </div>
                                                                    )
                                                                }


                                                            </Form.Group>
                                                        )
                                                    }


                                                    {
                                                        (dependencySelectParams.projectId !== null && filteredDependencies.length === 0) && (
                                                            <Form.Group className="position-relative form-group">
                                                                <Form.Label className='text-uppercase mb-2'>
                                                                    No Matching Dependencies Found
                                                                </Form.Label>
                                                            </Form.Group>
                                                        )
                                                    }
                                                </Row>

                                                {(!schema?.readonly && (privileges?.add || privileges?.edit)) &&
                                                    <hr />
                                                }
                                                <Row>
                                                    <Col>
                                                        {!schema?.readonly &&
                                                            <>
                                                                {(privileges?.add || privileges?.edit) &&
                                                                    <>
                                                                        {
                                                                            (selectedValues.length > 0) ? <Button variant="contained"
                                                                                disabled={disabled}
                                                                                className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-md mr-2"
                                                                                onClick={prepareDependencyCopy}>Copy Selected</Button> : null
                                                                        }

                                                                        {/* <Button variant="contained"
                                                                            className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-secondary btn-md mr-2"
                                                                            onClick={() => navigate(-1)}> Cancel</Button> */}
                                                                    </>
                                                                }
                                                            </>
                                                        }
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>

    )
}

export default IUIMultiCopyFilter;
