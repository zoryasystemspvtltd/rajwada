import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Col, Row } from "react-bootstrap";
import IUIPageInline from './IUIPageInline';
import { getData } from '../../store/api-db';
import { useDispatch, useSelector } from 'react-redux'

const IUIListInline = (props) => {
    const schema = props.schema;
    const module = `${schema.module}#${props.parentId}`;
    const dispatch = useDispatch();
    const dataSet = useSelector((state) => state.api[module])
    const [value, setValue] = useState([])
    const [data, setData] = useState([]);
    const [baseFilter, setBaseFilter] = useState({})

    useEffect(() => {
            if (props?.parentId) {
                const newBaseFilter = {
                    name: schema?.relationKey,
                    value: props?.parentId,
                    //operator: 'likelihood' // Default value is equal
                }
    
                setBaseFilter(newBaseFilter)
    
                const pageOptions = {
                    ...dataSet?.options
                    , recordPerPage: 0
                    , searchCondition: newBaseFilter
                }
                dispatch(getData({ module: module, options: pageOptions }));
            }
        }, [props]);
        
    useEffect(() => {
        if (props?.value) {
            setValue(props?.value);
        }
    }, [props?.value]);


    const handleChange = (e) => {
        e.preventDefault();
        const item = e.target.value
        if (item) {
            const index = value?.findIndex(it => `${it.id}` === `${item.id}`)

            if (index > -1) {
                if (item.deleted) { // Delete
                    const items = [
                        ...value?.slice(0, index), // everything before array
                        ...value?.slice(index + 1), // everything after array
                    ]
                    setValue(items)

                    const event = { target: { id: props?.id, value: items }, preventDefault: function () { } }
                    if (props.onChange) {
                        props.onChange(event);
                    }
                } else {// Edit 
                    const items = [
                        ...value?.slice(0, index), // everything before array
                        {
                            ...value[index],
                            ...item
                        },
                        ...value?.slice(index + 1), // everything after array
                    ]
                    setValue(items)

                    const event = { target: { id: props?.id, value: items }, preventDefault: function () { } }
                    if (props.onChange) {
                        props.onChange(event);
                    }
                }

            } else { // Add

                const items = [...value, ...[item]]
                setValue(items)
                const event = { target: { id: props?.id, value: items }, preventDefault: function () { } }
                if (props.onChange) {
                    props.onChange(event);
                }
            }
        }
    };

    return (
        <>
            <Row>
                <Col md={12}>
                    <Table responsive>
                        <thead>
                            <tr>

                                {schema?.fields?.map((fld, f) => (
                                    <React.Fragment key={f}>
                                        {fld.type !== 'hidden-filter' &&
                                            <th >
                                                <button
                                                    type="submit"
                                                    className="btn btn-link text-white p-0"
                                                >
                                                    {fld.text}
                                                </button>
                                            </th>
                                        }
                                    </React.Fragment>

                                ))}
                                {
                                    <th width={90}>
                                        <button type="submit" className="btn btn-link text-white p-0">#</button>
                                    </th>
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dataSet?.items?.map((item, i) => (
                                    <tr key={i}>
                                        <IUIPageInline
                                            id={item?.id}
                                            schema={schema}
                                            value={item}
                                            onChange={handleChange}
                                            readonly={true}
                                        />

                                    </tr>
                                ))
                            }
                            {schema.adding &&
                                <tr>
                                    <IUIPageInline
                                        id={value ? value.length + 1 : 1}
                                        schema={schema}
                                        value={{ id: value ? value.length + 1 : 1, mode: 'add' }}
                                        onChange={handleChange}
                                    />
                                </tr>
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </>
    )
}

export default IUIListInline