import { useEffect, useState } from 'react';
import { Dropdown } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '../../../store/api-service';

const IUILookUpMultiColumn = (props) => {
    const schema = props?.schema;
    const columns = schema?.columns;
    const [show, setShow] = useState(false);
    const [value, setValue] = useState("");
    const [text, setText] = useState("");
    const [selected, setSelected] = useState(null);

    const [dataSet, setDataSet] = useState(useSelector((state) => state.api[schema?.module]))

    useEffect(() => {
        async function fetchData() {
            const pageOptions = { recordPerPage: 0 }
            const response = await api.getData({ module: schema?.module, options: pageOptions });
            setDataSet(response?.data)
        }


        if (!schema?.module) {
            setDataSet({ items: schema?.items });
        } else {
            fetchData();
        }
    }, [schema?.module]);

    useEffect(() => {
        const newValue = schema?.module
            ? dataSet?.items?.find(item => item.id === parseInt(value))?.name
            : value
        if (newValue) {
            setText(newValue);
        }
    }, [dataSet?.items, value]);

    useEffect(() => {
        if (props?.clearFields) {
            setValue("");
            setText("");
        }
    }, [props?.clearFields]);

    useEffect(() => {
        if (props?.value) {
            setValue(props?.value);
        }
    }, [props?.value]);

    useEffect(() => {
        async function fetchSelectedData(id) {
            const item = await api.getSingleData({ module: schema?.module, id: id });
            setSelected(item.data);
        }

        if (props?.value) {
            fetchSelectedData(props?.value);
        }
    }, [props?.value]);

    const handleChange = (e, item) => {
        e.preventDefault();
        setSelected(item);
        if (!props?.readonly) {
            setValue({ ...value, [props?.id]: item?.id });
            let modifiedEvent = { ...e, target: { id: props?.id, value: item?.id }, preventDefault: function () { } };
            props.onChange(modifiedEvent);
        }
        setShow(false);
    };

    return (
        <>
            {props?.readonly &&
                <>
                    {!props?.textonly &&
                        <Form.Control type="text"
                            aria-label={props.placeholder}
                            id={props.id}
                            value={text}
                            disabled={true}
                            readOnly={true}
                            className={`${props.className}`} />
                    }
                    {props?.textonly &&
                        <>
                            {schema?.path &&
                                <Link to={`/${schema.path}/${value}`}>{text}</Link>
                            }
                            {!schema?.path &&
                                <>
                                    {text}
                                </>
                            }
                        </>
                    }
                </>
            }
            {!props?.readonly &&
                <>
                    <Dropdown show={show} onToggle={(isOpen) => setShow(isOpen)}>
                        <Dropdown.Toggle variant="contained" className='btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-md mr-2'>
                            {selected ? `${selected?.name}` : `Select ${schema?.selectLabel}`}
                        </Dropdown.Toggle>


                        <Dropdown.Menu className="p-2" style={{ minWidth: "400px" }}>
                            <table className="table table-sm mb-0 table-hover">
                                <thead>
                                    <tr>
                                        {
                                            columns?.map((col, i) => (
                                                <th key={col.name} style={{ width: col.width }} className="text-capitalize">{col.name}</th>
                                            ))
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataSet?.items?.map((item, i) => (
                                        <tr
                                            key={i}
                                            onClick={(e) => handleChange(e, item)}
                                            style={{ cursor: "pointer" }}
                                        >
                                            {
                                                columns?.map((col, i) => (
                                                    <td key={`data-${i}`}>{item?.[col.name]}</td>
                                                ))
                                            }
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Dropdown.Menu>
                    </Dropdown>
                </>
            }
        </>
    );
}

export default IUILookUpMultiColumn;
