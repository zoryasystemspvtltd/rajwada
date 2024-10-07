import React, { useState, useEffect } from 'react';
import { Button, Col, Row, Container } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux'
import Form from 'react-bootstrap/Form';
import api from '../../../store/api-service'
import { Link } from 'react-router-dom';
const IUILookUpLink = (props) => {
    const schema = props?.schema;
    const [item, setItem] = useState()

    useEffect(() => {
        if (props?.value) {
            async function fetchData() {
                const response = await api.getSingleData({ module: schema?.module, id: props?.value });
                setItem(response.data);
            }

            if (!schema?.module) {
                setItem({ id: 0, name: props?.value })
            } else {
                fetchData();
            }

        }
    }, [props?.value]);

    if (!item) {
        return null;
    }

    return (
        <>
            
                {schema?.module &&
                    <>
                        <span>
                            <Link className="stretched-link" to={`/${schema?.path}/${item?.id}`}> {item?.name}</Link>
                        </span>
                    </>
                }
                {!schema?.module &&
                    <>
                        <span> {item?.name}</span>
                    </>
                }
           
        </>
    );
}

export default IUILookUpLink