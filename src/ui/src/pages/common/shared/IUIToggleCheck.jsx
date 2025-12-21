import { useEffect, useState } from 'react';
import serverDetails from "../../../data/server.json";
import { Row, Col, Form } from 'react-bootstrap';


const IUIToggleCheck = (props) => {
    const schema = props?.schema;
    const [selectedValues, setSelectedValues] = useState([]);
    const [dataSet, setDataSet] = useState([]);


    useEffect(() => {
        const fetchModuleData = async () => {
            const response = await fetch(`${serverDetails.server.url}/api/${schema?.module}/all`);
            let data = await response.json();
            setDataSet(data);
        }


        if (!schema?.module) {
            setDataSet(schema?.items);
        } else {
            fetchModuleData();
        }
    }, [schema?.module, schema?.items]);


    useEffect(() => {
        if (props?.value) {
            setSelectedValues(props?.value);
        }
    }, [props?.value]);


    const handleChange = (e) => {
        const { value, checked } = e.target;
        if (!props?.readonly) {
            let newValues = [];
            if (checked) {
                newValues = [...selectedValues, value];
                setSelectedValues(newValues);


            } else {
                newValues = selectedValues.filter((v) => v !== value);
                setSelectedValues(newValues);
            }
            const changeEvent = { target: { id: props.id, value: newValues }, preventDefault: function () { } }
            props.onChange(changeEvent);
        }
    };


    const handleRowChange = (e) => {
        e.preventDefault();
        if (e.target.checked) {
            const newValue = [...dataSet?.map(data => data?.name)];


            if (!props.readonly) {
                const e = { target: { id: props.id, value: newValue }, preventDefault: function () { } }
                if (props.onChange)
                    props.onChange(e);
            }
        }
        else {
            const newValue = [];


            if (!props.readonly) {
                const e = { target: { id: props.id, value: newValue }, preventDefault: function () { } }
                if (props.onChange)
                    props.onChange(e);
            }
        }


    };


    return (
        <>
            <div className="row" >
                <div className='col-sm-12 col-md-2 col-lg-2'>
                    <Form.Check className='text-capitalize'
                        disabled={props.readonly}
                        id={`${props.id}_Check_All`}
                        label={"Select All"}
                        checked={(selectedValues?.length === dataSet?.length) || false}
                        onChange={(e) => handleRowChange(e)}
                    />
                    {/* <Form.Label><span className="fw-bold text-capitalize"> {schema?.text} : </span></Form.Label> */}
                </div>
                <div className='col-sm-12 col-md-10 col-lg-10'>
                    <Row>
                        {dataSet?.map((x, i) => (
                            <Col md={2} key={i}>
                                <Form.Check className='text-capitalize'
                                    type="switch"
                                    id={x.name}
                                    value={x.name}
                                    checked={selectedValues.includes(x.name)}
                                    onChange={(e) => handleChange(e)}
                                    disabled={props.readonly}
                                    label={x.name}
                                />
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        </>
    );


};


export default IUIToggleCheck;
{
    fld.type === 'toggle-check' &&
        <>
            <Form.Group className="position-relative form-group">
                <Form.Label htmlFor={fld.field} >
                    {fld.text}
                    {fld.required &&
                        <span className="text-danger">*</span>
                    }
                </Form.Label>


                <div className="p-2">
                    <IUIToggleCheck
                        id={fld.field}
                        name={fld.field}
                        onChange={handleChange}
                        value={data[fld.field]}
                        options={fld.options}
                        readonly={props.readonly}
                        schema={fld.schema}
                    />
                </div>


            </Form.Group>
        </>
}
