import React, { useEffect, useState } from 'react';
import api from '../../../store/api-service'
import { Link, useLocation } from 'react-router-dom';

const IUIBreadcrumb = (props) => {
    const schema = props?.schema;
    const type = schema?.type;
    const module = schema?.module;
    const location = useLocation();
    const [item, setItem] = useState(null);
    const pathnames = location.pathname.split('/').filter(x => x);

    useEffect(() => {
        async function fetchData() {
            if (pathnames.length > 1) {
                const item = await api.getSingleData({ module: module, id: pathnames[pathnames.length - 1] });
                setItem(item.data);
            }
        }

        if (type === 'view') {
            fetchData();
        }

    }, [type, module, pathnames]);

    return (
        <nav aria-label="Breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumbTxt">
                    <Link to="/">Home</Link>
                </li>
                {pathnames.map((pathname, index) => {
                    const last = index === pathnames.length - 1;
                    const href = `/${pathnames.slice(0, index + 1).join('/')}`;

                    if (last && type === 'view') {
                        return (
                            <li key={href} className={`${last ? 'active' : 'breadcrumbTxt'}`}>
                                <span>{item ? item?.name : pathname}</span>
                            </li>
                        );
                    }
                    else {

                        return (
                            <li key={href} className={`${last ? 'active' : 'breadcrumbTxt'}`}>
                                <Link to={href}>{pathname}</Link>
                            </li>
                        );
                    }
                })}
            </ol>
        </nav>
    );
};

export default IUIBreadcrumb;
