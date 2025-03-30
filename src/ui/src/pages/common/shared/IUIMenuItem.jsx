import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useState, useEffect } from "react";


const IUIMenuItem = (props) => {
    const loggedInUser = useSelector((state) => state.api.loggedInUser);
    const privileges = useSelector((state) => state.api.loggedInUser?.privileges);
    const [value, setValue] = useState(props.schema);

    useEffect(() => {
        if (props.schema)
            setValue(props.schema);
    }, [props.schema]);

    const expandMenu = (e, index) => {

        const newValue = [
            ...value?.slice(0, index), // everything before array
            {
                ...value[index],
                ...{ expanded: !value[index].expanded }
            },
            ...value?.slice(index + 1), // everything after array
        ]
        setValue(newValue)
    }

    return (
        <>
            {
                value.map((item, index) => {
                    return (
                        <li key={item.name} className={item.expanded ? "mm-active" : ""}>
                            {!item.schema &&
                                <>
                                    {
                                        item?.access ? privileges?.some(p => (p.module === item.access) && (item?.role ? loggedInUser?.roles?.filter(role => item.role.includes(role))?.length > 0 : true)) ?
                                            (
                                                <Link to={item.path}>
                                                    <i className={`metismenu-icon fa-solid fa-${(item.icon || "asterisk")}`} title={item.text}></i>{item.text}
                                                </Link>
                                            )
                                            :
                                            null
                                            :
                                            (
                                                <Link to={item.path}>
                                                    <i className={`metismenu-icon fa-solid fa-${(item.icon || "asterisk")}`} title={item.text}></i>{item.text}
                                                </Link>
                                            )
                                    }

                                    {/* {item.name === 'home' &&
                                        <Link to={item.path}>
                                            <i className={`metismenu-icon fa-solid fa-${(item.icon || "asterisk")}`}></i>{item.text}
                                        </Link>
                                    }
                                    {item.name !== 'home' &&
                                        item.visible &&
                                        <Link to={item.path}>
                                            <i className={`pr-2 fa-solid fa-${(item.icon || "asterisk")}`}></i>{item.text}
                                        </Link>
                                    } */}
                                </>
                            }
                            {/* {item.schema &&
                                <>
                                    {item.visible &&
                                        <Link to={{ path: "about:blank" }} aria-expanded={item.expanded}
                                            onClick={(e) => expandMenu(e, index)}>
                                            <i className={`metismenu-icon fa-solid fa-${(item.icon || "asterisk")}`}></i>{item.text}
                                            <i className="metismenu-state-icon fa-solid fa-angle-down caret-left"></i>
                                        </Link>
                                    }
                                    <ul className={item.expanded ? "mm-show" : "mm-collapse"}>
                                        <IUIMenuItem schema={item.schema} />
                                    </ul>
                                </>
                            } */}
                        </li>
                    )
                })
            }
        </>
    )
}

export default IUIMenuItem