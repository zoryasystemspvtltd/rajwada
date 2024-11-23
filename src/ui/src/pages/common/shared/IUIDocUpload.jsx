import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
const IUIDocUpload = (props) => {
    const schema = props?.schema;
    const [file, setFile] = useState([]);
    const fileRef = React.createRef()
    const cardBodyStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '10px',
        overflow: 'hidden',
        position: 'relative'
    };

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
            <div className="card position-relative" >
                <div>
                    <Form.Control
                        id={props?.id}
                        type="file"
                        onChange={handleChange}
                        disabled={props.readonly || false}
                        ref={fileRef}
                    ></Form.Control>

                </div>
            </div>
        </>
    );
}


export default IUIDocUpload