import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import abstract2 from "../../assets/images/dropdown-header/abstract2.jpg";
import abstract4 from "../../assets/images/dropdown-header/abstract4.jpg";
import abstract5 from "../../assets/images/dropdown-header/abstract5.jpg";

const IUIHeaderMenu = (props) => {
    const schema = props?.schema;
    const menuType = schema?.type;
    const menuSchema = schema?.schema;
    const menuRole = sessionStorage.getItem("menuRole");
    const [isOpen, setIsOpen] = useState(false);
    const headerMenuClassName = "dropdown-menu-xl rm-pointers dropdown-menu dropdown-menu-right";
    const dropdownRef = useRef(null);
    const loggedInUser = useSelector((state) => state.api.loggedInUser);
    const privileges = loggedInUser?.privileges;

    const filterMasterMenu = (s) => {
        if (s.master) {
            s.master.forEach(item => {
                item.visible = filterMasterMenu(item);
            })
            return s.master.some(sch => sch.visible)
        }

        if (s.access) {
            if (privileges?.some(p => p.module === s.access)) {
                return true;
            }
            else {
                return false;
            }
        } else {
            return true;
        }
    }

    if (menuType === "master") {
        Object.keys(menuSchema).forEach(item => {
            menuSchema[item].visible = filterMasterMenu(menuSchema[item]);
        })
    }

    const handleToggle = () => {
        setIsOpen((prev) => !prev);
    };

    const handleMenuRoleChange = (e, roleName) => {
        sessionStorage.setItem('menuRole', roleName);
        props?.menuToHeader(roleName);
        setIsOpen((prev) => !prev);
    }

    const handleScrollTo = (e, id) => {
        e.preventDefault(); // Prevent the default anchor behavior
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsOpen(true);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <>
            {
                menuType === 'module' && (
                    <div className="dropdown" ref={dropdownRef}>
                        <button type="button" aria-haspopup="true" aria-expanded="false"
                            className="p-0 mr-2 btn btn-link" onClick={handleToggle}>
                            <span className="icon-wrapper icon-wrapper-alt rounded-circle">
                                <span className="icon-wrapper-bg bg-primary"></span>
                                <i className="fa-solid fa-users-rays text-primary" title="Main Menu"></i>
                            </span>
                        </button>
                        {
                            isOpen && (
                                <div tabIndex="-1" role="menu" aria-hidden={isOpen ? true : false}
                                    className={isOpen ? `${headerMenuClassName} show` : `${headerMenuClassName}`}>
                                    <div className="dropdown-menu-header">
                                        <div className="dropdown-menu-header-inner bg-plum-plate">
                                            <div className="menu-header-image"
                                                style={{ backgroundImage: `url(${abstract4})` }}>
                                            </div>
                                            <div className="menu-header-content text-white">
                                                <h5 className="menu-header-title">Main Menu</h5>
                                                {/* <h6 className="menu-header-subtitle">Easy grid navigation inside dropdowns</h6> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid-menu grid-menu-xl grid-menu-3col">
                                        <div className="no-gutters row">
                                            {
                                                (!loggedInUser?.roles?.includes("Super Admin")) ? (
                                                    Object.keys(menuSchema).map((key, index) => {
                                                        return (
                                                            <div className="col-sm-6 col-xl-4" key={`col_${menuSchema[key].text}_${index}`}>
                                                                <Button className="btn-icon-vertical btn-square btn-transition btn btn-outline-link" onClick={(e) => handleMenuRoleChange(e, key)}>
                                                                    <i className={`fa-solid fa-${(menuSchema[key].icon || "asterisk")} icon-gradient bg-night-fade btn-icon-wrapper btn-icon-sm mb-3`} title={menuSchema[key].text}></i>
                                                                    {menuSchema[key].text}
                                                                </Button>
                                                            </div>
                                                        )
                                                    })

                                                ) : (
                                                    <div className="col-sm-6 col-xl-4" key={`col_Admin_Only`}>
                                                        <Button className="btn-icon-vertical btn-square btn-transition btn btn-outline-link" onClick={(e) => handleMenuRoleChange(e, "admin")}>
                                                            <i className={`fa-solid fa-lock icon-gradient bg-night-fade btn-icon-wrapper btn-icon-sm mb-3`} title={"Admin"}></i>
                                                            Admin
                                                        </Button>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                )
            }
            {
                menuType === 'master' && (
                    <div className="dropdown" ref={dropdownRef}>
                        <button type="button" aria-haspopup="true" aria-expanded="false"
                            className="p-0 mr-2 btn btn-link" onClick={handleToggle}>
                            <span className="icon-wrapper icon-wrapper-alt rounded-circle">
                                <span className="icon-wrapper-bg bg-danger"></span>
                                <i className="fa-solid fa-screwdriver-wrench text-danger" title="Setup Menu"></i>
                            </span>
                        </button>
                        {
                            isOpen && (
                                <div tabIndex="-1" role="menu" aria-hidden={isOpen ? true : false}
                                    className={isOpen ? `${headerMenuClassName} show` : `${headerMenuClassName}`}>
                                    <div className="dropdown-menu-header">
                                        <div className="dropdown-menu-header-inner bg-deep-blue">
                                            <div className="menu-header-image"
                                                style={{ backgroundImage: `url(${abstract5})` }}>
                                            </div>
                                            <div className="menu-header-content text-white">
                                                <h5 className="menu-header-title">Setup Menu</h5>
                                                {/* <h6 className="menu-header-subtitle">Easy grid navigation for master</h6> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid-menu grid-menu-xl grid-menu-3col">
                                        <div className="no-gutters row">
                                            {
                                                menuSchema[menuRole]?.master?.filter(item => item?.visible)?.map((item, index) => {
                                                    return (
                                                        <div className="col-sm-6 col-xl-4" key={`${item.name}_${index}`}>
                                                            <Link to={item.path} onClick={() => setIsOpen((prev) => !prev)} className="btn-icon-vertical btn-square btn-transition btn btn-outline-link">
                                                                <i className={`fa-solid fa-${(item.icon || "asterisk")} icon-gradient bg-night-fade btn-icon-wrapper btn-icon-sm mb-3`} title={item.text}></i>
                                                                {item.text}
                                                            </Link>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                )
            }
            {
                menuType === 'reports' && (
                    <div className="dropdown" ref={dropdownRef}>
                        <button type="button" aria-haspopup="true" aria-expanded="false"
                            className="p-0 mr-2 btn btn-link" onClick={handleToggle}>
                            <span className="icon-wrapper icon-wrapper-alt rounded-circle">
                                <span className="icon-wrapper-bg bg-success"></span>
                                <i className="fa-solid fa-table-cells text-success" title="Reports Menu"></i>
                            </span>
                        </button>
                        {
                            isOpen && (
                                <div tabIndex="-1" role="menu" aria-hidden={isOpen ? true : false}
                                    className={isOpen ? `${headerMenuClassName} show` : `${headerMenuClassName}`}>
                                    <div className="dropdown-menu-header">
                                        <div className="dropdown-menu-header-inner bg-premium-dark">
                                            <div className="menu-header-image"
                                                style={{ backgroundImage: `url(${abstract2})` }}>
                                            </div>
                                            <div className="menu-header-content text-white">
                                                <h5 className="menu-header-title">Reports Menu</h5>
                                                {/* <h6 className="menu-header-subtitle">Easy grid navigation for reports</h6> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid-menu grid-menu-xl grid-menu-3col">
                                        <div className="no-gutters row">
                                            {
                                                menuSchema[menuRole]?.report?.map((item, index) => {
                                                    return (
                                                        <div className="col-sm-6 col-xl-4" key={`${item.name}_${index}`}>
                                                            <Link to={item.path} onClick={() => setIsOpen((prev) => !prev)} className="btn-icon-vertical btn-square btn-transition btn btn-outline-link">
                                                                <i className={`fa-solid fa-${(item.icon || "asterisk")} icon-gradient bg-night-fade btn-icon-wrapper btn-icon-sm mb-3`} title={item.text}></i>
                                                                {item.text}
                                                            </Link>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </>
    );
};

export default IUIHeaderMenu;