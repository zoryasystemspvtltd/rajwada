import React, { useEffect, useState } from "react";
import api from '../../store/api-service'
import { useSelector } from "react-redux";
import IUILookUp from "./shared/IUILookUp";
import { FaCheck, FaTimes } from "react-icons/fa";
import { formatStringDate } from "../../store/datetime-formatter";
import { Link } from "react-router-dom";
import { Row, Table } from "react-bootstrap";

const ItemNotification = () => {
    const [data, setData] = useState({});
    const loggedInUser = useSelector((state) => state.api.loggedInUser);

    const schema = {
        module: 'activityResource',
        title: 'Work Item Availability Status',
        path: 'work-item-availabilities',
        showBreadcrumbs: true,
        back: true,
        readonly: true,
        fields: [
            {
                text: 'Work', field: 'activityId', type: 'lookup', required: true, width: 4,
                schema: { module: 'activity' }
            },
            {
                text: 'Item', field: 'assetId', type: 'lookup', required: true, width: 4,
                schema: { module: 'asset' }
            },
            {
                text: 'Availability', field: 'availabilityStatus', type: 'tick', required: true, width: 2,
            },
            { text: 'Quantity', field: 'quantity', placeholder: 'Item quantity here...', type: 'number', width: 4, required: true },
            {
                text: 'UOM', field: 'uomId', type: 'lookup', required: true, width: 4,
                schema: { module: 'uom' }
            },
        ]
    }

    useEffect(() => {
        async function fetchNotificationData() {
            const item = await api.getItemNotifications({ member: loggedInUser?.email });
            setData(item?.data);
        }

        fetchNotificationData();
    }, []);

    return (
        <>
            <div className="app-page-title mb-4">
                <div className="page-title-heading"> Work Item Availability Notifications</div>
            </div>

            <div className="tab-content">
                <div className="tabs-animation">
                    <div className="row">
                        <div className="col-md-12">
                            <div className={schema?.readonly ? "main-card card" : "main-card mb-2 card"}>
                                <div className="card-body">
                                    <div>
                                        {
                                            (data.length > 0) && (
                                                <Row className='mt-2'>
                                                    <Table size="sm" responsive>
                                                        <thead>
                                                            <tr>
                                                                {schema?.fields?.map((fld, f) => (
                                                                    <th key={f}>
                                                                        <button
                                                                            type="submit"
                                                                            className="btn btn-link text-white p-0"
                                                                        >
                                                                            {fld.text}
                                                                        </button>
                                                                    </th>
                                                                ))}
                                                            </tr>
                                                        </thead>
                                                        {
                                                            <tbody>
                                                                {data?.map((item, i) => (
                                                                    <React.Fragment key={i}>
                                                                        <tr>
                                                                            {schema?.fields?.map((fld, f) => (
                                                                                <td key={f}>
                                                                                    {fld.type === 'link' && (
                                                                                        <Link to={`${item.id}`}>{item[fld.field]}</Link>
                                                                                    )}
                                                                                    {(!fld.type || fld.type === 'text') && item[fld.field]}
                                                                                    {fld.type === 'number' && item[fld.field]}
                                                                                    {fld.type === 'date' && formatStringDate(item[fld.field])}
                                                                                    {fld.type === 'lookup' && (
                                                                                        <IUILookUp
                                                                                            value={parseInt(item[fld.field])}
                                                                                            schema={fld.schema}
                                                                                            readonly={true}
                                                                                            textonly={true}
                                                                                        />
                                                                                    )}
                                                                                    {fld.type === 'tick' && (
                                                                                        (item[fld.field] === 1) ? <FaCheck color="green" /> : <FaTimes color="red" />
                                                                                    )}
                                                                                </td>
                                                                            ))}
                                                                        </tr>
                                                                    </React.Fragment>
                                                                ))}
                                                            </tbody>

                                                        }
                                                    </Table>
                                                </Row>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ItemNotification