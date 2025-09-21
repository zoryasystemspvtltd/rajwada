import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';


const IUIJsonTable = (props) => {
    const schema = props?.schema;
    const excludeKeys = schema?.excludeKeys || [];
    const maxLength = schema?.maxLength || 200;
    const [data, setData] = useState({});
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
                        <p>No valid data provided</p>
                    </>
                    : <div className="row">
                        <div className="col-md-12">
                            <Table responsive>
                                <thead className="table-dark">
                                    <tr>
                                        <th>Property</th>
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
