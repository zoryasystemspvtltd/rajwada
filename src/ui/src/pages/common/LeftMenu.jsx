import { useState } from "react";
import { useSelector } from 'react-redux';
import IUIMenuItem from "./shared/IUIMenuItem";
import clientLogo from "../../assets/images/logo-inverse.png";

const LeftMenu = (props) => {
    const privileges = useSelector((state) => state.api.loggedInUser?.privileges);
    const menuRole = props?.role;

    // let schema = [
    //     {
    //         name: "home", text: "Home", icon: "home", path: "/home"
    //     },
    //     {
    //         name: "admin", text: "Admin", icon: "vector-square",
    //         schema: [
    //             {
    //                 name: "adminMaster", text: "Master", icon: "vector-square",
    //                 schema: [
    //                     { name: "departmentManagement", text: "Department", icon: "sitemap", path: "/departments", access: "department" },
    //                     { name: "roleManagement", text: "Role", icon: "sitemap", path: "/roles", access: "role" },
    //                     { name: "userManagement", text: "User", icon: "users", path: "/users", access: "user" },
    //                     { name: "companyManagement", text: "Company", icon: "cubes-stacked", path: "/companies", access: "company" },
    //                     { name: "projectManagement", text: "Project", icon: "sitemap", path: "/projects", access: "project" }
    //                 ]
    //             },
    //             {
    //                 name: "adminTransaction", text: "Transaction", icon: "vector-square",
    //                 schema: [
    //                     { name: "resetPassword", text: "Reset Password", icon: "vector-square" }
    //                 ]
    //             },
    //             {
    //                 name: "adminReport", text: "Report", icon: "vector-square"
    //             }
    //         ]
    //     },
    //     {
    //         name: "civil", text: "Civil", icon: "vector-square",
    //         schema: [
    //             {
    //                 name: "civilMaster", text: "Master", icon: "vector-square",
    //                 schema: [
    //                     { name: "uom", text: "UOM", icon: "cubes-stacked", path: "/uoms", access: "uom" },
    //                     { name: "itemTypeManagement", text: "Item Type", icon: "cubes-stacked", path: "/item-types", access: "assetType" },
    //                     { name: "itemGroupManagement", text: "Item Group", icon: "cubes-stacked", path: "/item-groups", access: "assetGroup" },
    //                     { name: "itemMasterManagement", text: "Item", icon: "vector-square", path: "/item-masters", access: "asset" },
    //                     { name: "towerManagement", text: "Tower", icon: "industry", path: "/towers", access: "plan" },
    //                     { name: "floorManagement", text: "Floor", icon: "cubes", path: "/floors", access: "plan" },
    //                     { name: "flatManagement", text: "Flat", icon: "bed", path: "/flats", access: "plan" },
    //                     { name: "activityManagement", text: "Activity", icon: "cubes-stacked" },
    //                 ]
    //             },
    //             {
    //                 name: "civilTransaction", text: "Transaction", icon: "vector-square",
    //                 schema: [
    //                     { name: "activityDependency", text: "Activity Dependency", icon: "vector-square" },
    //                     { name: "activityAssignment", text: "Activity Assignment", icon: "vector-square" },
    //                     { name: "activityReporting", text: "Activity Reporting", icon: "vector-square" }
    //                 ]
    //             },
    //             {
    //                 name: "civilReport", text: "Report", icon: "vector-square"
    //             }
    //         ]
    //     },
    //     {
    //         name: "legal", text: "Legal", icon: "vector-square",
    //         schema: [
    //             {
    //                 name: "legalMaster", text: "Master", icon: "vector-square"
    //             },
    //             {
    //                 name: "legalTransaction", text: "Transaction", icon: "vector-square"
    //             },
    //             {
    //                 name: "legalReport", text: "Report", icon: "vector-square"
    //             }
    //         ]
    //     },
    // ];

    // Filter  menu schema based on privileges

    let schema = {
        admin: {
            text: "Admin",
            icon: "lock",
            master: [
                { name: "departmentManagement", text: "Department", icon: "sitemap", path: "/departments", access: "department" },
                { name: "roleManagement", text: "Role", icon: "sitemap", path: "/roles", access: "role" },
                { name: "userManagement", text: "User", icon: "users", path: "/users", access: "user" },
                { name: "companyManagement", text: "Company", icon: "cubes-stacked", path: "/companies", access: "company" },
                { name: "projectManagement", text: "Project", icon: "sitemap", path: "/projects", access: "project" }
            ],
            transaction: [
                { name: "resetPassword", text: "Reset Password", icon: "vector-square", path: "/home" }
            ],
            report: [
                { name: "adminReport", text: "Admin Report", icon: "vector-square", path: "/home" }
            ]
        },
        civil: {
            text: "Civil",
            icon: "screwdriver-wrench",
            master: [
                { name: "uom", text: "UOM", icon: "cubes-stacked", path: "/uoms", access: "uom" },
                { name: "itemTypeManagement", text: "Item Type", icon: "cubes-stacked", path: "/item-types", access: "assetType" },
                { name: "itemGroupManagement", text: "Item Group", icon: "cubes-stacked", path: "/item-groups", access: "assetGroup" },
                { name: "itemMasterManagement", text: "Item", icon: "vector-square", path: "/item-masters", access: "asset" },
                { name: "towerManagement", text: "Tower", icon: "industry", path: "/towers", access: "plan" },
                { name: "floorManagement", text: "Floor", icon: "cubes", path: "/floors", access: "plan" },
                { name: "flatManagement", text: "Flat", icon: "bed", path: "/flats", access: "plan" },
                { name: "activityManagement", text: "Activity", icon: "cubes-stacked" },
            ],
            transaction: [
                { name: "activityDependency", text: "Activity Dependency", icon: "vector-square", path: "/home" },
                { name: "activityAssignment", text: "Activity Assignment", icon: "vector-square", path: "/activities" },
                { name: "activityReporting", text: "Activity Reporting", icon: "vector-square", path: "/home" }
            ],
            report: [
                { name: "civilReport", text: "Civil Report", icon: "vector-square", path: "/home" }
            ]
        },
        legal: {
            text: "Legal",
            icon: "user-tie",
            master: [
                { name: "legal", text: "Legal", icon: "cubes-stacked", path: "/home", access: "legal" },
            ],
            transaction: [
                { name: "legalTransaction1", text: "Legal Transaction 1", icon: "vector-square", path: "/home" },
            ],
            report: [
                { name: "legalReport", text: "Legal Report", icon: "vector-square", path: "/home" },
            ]
        }
    };

    const filterMenu = (s) => {
        if (s.schema) {
            s.schema.forEach(item => {
                item.visible = filterMenu(item);
            })
            return s.schema.some(sch => sch.visible)
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

    // schema.forEach(item => {
    //     item.visible = filterMenu(item);
    // })

    const [showLeftMenu, setShowLeftMenu] = useState(props.leftMenuState);

    return (
        <div className="app-sidebar sidebar-shadow">
            <div className="app-header__logo">
                <div className="logo-src"></div>
                <div className="header__pane ml-auto">
                    <div>
                        <button type="button" className="hamburger close-sidebar-btn hamburger--elastic"
                            onClick={(event) => setShowLeftMenu(!showLeftMenu)}>
                            <span className="hamburger-box">
                                <span className="hamburger-inner"></span></span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="app-header__mobile-menu">
                <div>
                    <button type="button" className="hamburger hamburger--elastic mobile-toggle-nav"
                        onClick={(event) => setShowLeftMenu(!showLeftMenu)}>
                        <span className="hamburger-box">
                            <span className="hamburger-inner"></span></span>
                    </button>
                </div>
            </div>
            <div className="app-header__menu">
                <span>
                    <button type="button"
                        className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav"
                        onClick={(event) => setShowLeftMenu(!showLeftMenu)}>
                        <span className="btn-icon-wrapper">
                            <i className="fa fa-ellipsis-v fa-w-6"></i></span>
                    </button>
                </span>
            </div>
            <div className="scrollbar-sidebar">
                <div className="app-sidebar__inner">
                    <ul className="vertical-nav-menu">
                        {/* <li className="app-sidebar__heading">Project Management</li> */}
                        <li>
                            <div className="app-header-center my-2 p-2" style={{backgroundColor: "white"}}>
                                <div className="logo-center"><img src={clientLogo} alt="Rajwada" /></div>
                            </div>
                        </li>
                        <li className="app-sidebar__heading">{menuRole ? `${menuRole} Transactions` : `Admin Transactions`}</li>
                        {
                            menuRole && (
                                <IUIMenuItem schema={schema[menuRole]?.transaction} />
                            )
                        }
                        {
                            !menuRole && (
                                <IUIMenuItem schema={schema.admin.transaction} />
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default LeftMenu