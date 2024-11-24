import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import api from '../../store/api-service'
import Form from 'react-bootstrap/Form';
const IUIDocUpload = (props) => {
    //const schema = props?.schema;
    //const module = schema?.module;
    const [file, setFile] = useState([]);
    const fileRef = React.createRef()
    // const { id } = useParams();
    // const columnName = props?.field;
    // const [dfile, setData] = useState({});

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

    const handleClick = () => {
        // async function fetchData() {
        //     if (id) {
        //         const item = await api.downloadFIle({ module: module, id: id, columnName:columnName });
        //         setData(item.data);
        //     }
        // }
        // fetchData();
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
            <div className="card position-relative" >
                <div>
                    {props?.readonly && (file.length > 0) &&
                        <button
                            className='btn btn-sm btn-pill btn-success'
                            onClick={handleClick}
                        >Download</button>}

                    {props?.readonly && (file.length === 0) && <span className="profile-pic-upload-text">No File Uploaded</span>}

                    {!props?.readonly &&
                        <Form.Control
                            id={props?.id}
                            type="file"
                            onChange={handleChange}
                            disabled={props.readonly || false}
                            ref={fileRef}
                        ></Form.Control>
                    }
                </div>
            </div>
        </>
    );
}


export default IUIDocUpload