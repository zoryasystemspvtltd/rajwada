import React, { useEffect, useState } from 'react';
import api from '../../../store/api-service'
import Form from 'react-bootstrap/Form';

const IUIPictureUpload = (props) => {
    const schema = props?.schema;
    const shape = props?.shape;
    const [file, setFile] = useState([]);
    const [baseFilter, setBaseFilter] = useState({});
    const [parentData, setParentData] = useState([]);
    const fileRef = React.createRef()
    const cardBodyStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '300px',
        overflow: 'hidden',
        position: 'relative'
    };

    useEffect(() => {
        async function fetchData() {
            // Prepare the filter object based on schema
            const newBaseFilter = {
                name: schema?.filter,
                value: schema?.value,
                // operator: 'likelihood' // Default value is equal
            };

            setBaseFilter(newBaseFilter);  // Update the base filter state

            // Define pageOptions based on schema type
            let pageOptions = { recordPerPage: 0 };
            if (schema?.type === "lookup-filter") {
                pageOptions = {
                    ...pageOptions,
                    searchCondition: newBaseFilter,
                };
            }

            if(schema){
                const response = await api.getData({ module: schema?.module, options: pageOptions });
                setParentData(response?.data?.items);
            }
        }

        fetchData();
    }, [schema?.filter, schema?.value, schema?.module, schema?.type]);

    useEffect(() => {
        async function fetchPictureData() {
            try {
                // if (file.length > 0) return;

                const parent = parentData?.find(data => data?.id === parseInt(props?.parentId));

                if (parent) {
                    setFile(parent[schema?.relationKey]);
                    props.onChange({
                        target: {
                            id: props?.id,
                            value: parent[schema?.relationKey],
                        },
                        preventDefault: () => { },
                    });
                }
            } catch (error) {
                console.error("Error fetching picture data:", error);
            }
        }

        if (schema && props?.parentId) {
            fetchPictureData();
        }
    }, [props?.parentId, file]);

    useEffect(() => {
        if (props?.value)
            setFile(props?.value);
    }, [props?.value]);

    const handleChange = async (e) => {
        e.preventDefault();
        const imageContent = await convertBase64(e.target.files[0])
        setFile(imageContent);

        const event = { target: { id: e.target.id, value: imageContent }, preventDefault: function () { } }

        if (props.onChange) {
            props.onChange(event);
        }

    }

    const triggerClick = (e) => {
        e.preventDefault();
        fileRef.current.click()
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    return (
        <>
            {
                (shape === "circle") && (
                    <div className="card position-relative" style={{ width: "10rem", height: "10rem", margin: "auto", borderRadius: "150px" }}>
                        <div className={`card-body form-control ${props.className}`} style={cardBodyStyle}>
                            <button className="btn top-0 end-0" onClick={triggerClick}>
                                {/* <i className="metismenu-icon fa-solid fa-cogs"></i> */}
                                {
                                    (file.length > 0) && <img src={file} style={{ width: "10rem", height: "10rem", margin: "auto", borderRadius: "150px" }} title={props?.placeholder} alt={props?.placeholder} />
                                }
                                {
                                    (file.length === 0) && <span className="profile-pic-upload-text">
                                        <i className="fa-solid fa-cloud-arrow-up" title="Upload Image"></i> {`Upload ${props?.text}`}
                                    </span>
                                }
                            </button>


                            <Form.Control
                                className='d-none'
                                id={props?.id}
                                type="file"
                                onChange={handleChange}
                                disabled={props.readonly || false}
                                ref={fileRef}
                                accept="image/gif, image/jpeg, image/png"
                            ></Form.Control>
                        </div>
                    </div>
                )
            }
            {
                (shape === "rect") && (
                    <div className="card position-relative" style={{ width: "50rem", height: "30rem", margin: "auto" }}>
                        <div className={`card-body form-control ${props.className}`} style={cardBodyStyle}>
                            <button className="btn top-0 end-0 btn-info" onClick={triggerClick}>
                                {/* <i className="metismenu-icon fa-solid fa-cogs"></i> */}
                                {
                                    (file.length > 0) && <img src={file} style={{ width: "50rem", height: "30rem", margin: "auto" }} title={props?.placeholder} alt={props?.placeholder} />
                                }
                                {
                                    (file.length === 0) && <span className="profile-pic-upload-text">
                                        <i className="fa-solid fa-cloud-arrow-up" title="Upload Image"></i> {`Upload ${props?.text}`}
                                    </span>
                                }
                            </button>


                            <Form.Control
                                className='d-none'
                                id={props?.id}
                                type="file"
                                onChange={handleChange}
                                disabled={props.readonly || false}
                                ref={fileRef}
                                accept="image/gif, image/jpeg, image/png"
                            ></Form.Control>
                        </div>
                    </div>
                )
            }
        </>
    );
}


export default IUIPictureUpload