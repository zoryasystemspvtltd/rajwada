import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

const IUIJsonTable = (props) => {
    const excludeKeys = props?.excludeKeys || [];
    const nestedTableKeys = props?.nestedTableKeys || [];
    const maxLength = props?.maxLength || 200;
    const [data, setData] = useState(null);
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        if (props?.value) {
            let value = JSON.parse(props?.value);
            setData(value);
            setEntries(Object.entries(value));
        }
    }, [props?.value]);


    return (
        <>
            {
                (!data || typeof data !== "object") ?
                    <>
                        <p>No data provided</p>
                    </>
                    :
                    <div className="row">
                        <div className="col-md-12">
                            <Table responsive>
                                <thead className="table-dark">
                                    <tr>
                                        <th>Key</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {entries.map(([key, value]) => {
                                        // Skip excluded keys or very large values
                                        const stringValue = String(value);
                                        if (
                                            excludeKeys.includes(key) ||
                                            stringValue.length > maxLength
                                        ) {
                                            return null;
                                        }
                                        else if (nestedTableKeys.includes(key)) {
                                            const jsonValue = JSON.parse(stringValue);
                                            const subKeys = Object.keys(jsonValue[0]);

                                            return (
                                                <tr key={key}>
                                                    <td>{key}</td>
                                                    <td>
                                                        <Table responsive>
                                                            <thead>
                                                                <tr>
                                                                    {
                                                                        subKeys.map((key, index) => (
                                                                            <th key={`${key}-${index}`} className='text-capitalize'>{key}</th>
                                                                        ))
                                                                    }
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {jsonValue.map((detail, index) => (
                                                                    <tr key={index}>
                                                                        {
                                                                            subKeys.map((key, index) => (
                                                                                <th key={`${key}-${index}-val`}>{detail[key]}</th>
                                                                            ))
                                                                        }
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </Table>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                        return (
                                            <tr key={key}>
                                                <td>{key}</td>
                                                <td>{stringValue}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </div>
                    </div>
            }
        </>
    );
};

export default IUIJsonTable;
