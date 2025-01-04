import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import defaultAvatar from "../../assets/images/avatars/man.png";
import dropDownCity3 from "../../assets/images/dropdown-header/city3.jpg";
import clientLogo from "../../assets/images/logo.png";
import { useAuth } from "../../provider/authProvider";
import { loginUser } from "../../store/api-db";
import IUIHeaderMenu from "./IUIHeaderMenu";


const Header = ({ headerToLayout, headerMenuToLayout }) => {
    const [showSidebar, setShowSidebar] = useState(true);
    const [showMobileHeader, setShowMobileHeader] = useState(false);
    const { setToken } = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loggedInUser = useSelector((state) => state.api.loggedInUser);
    const [profilePicture, setProfilePicture] = useState([]);
    // Get the theme from localStorage or set the default to 'theme1'
    const savedTheme = localStorage.getItem('theme') || 'light';
    const [theme, setTheme] = useState(savedTheme);

    const menuToHeader = (roleName) => {
        headerMenuToLayout(roleName);
    }

    // Function to load the CSS file dynamically
    const loadTheme = (themeName) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = `/static/theme/${themeName}/theme.css`; // Path to the theme CSS files
        link.id = 'theme-link';

        const existingLink = document.getElementById('theme-link');
        if (existingLink) {
            existingLink.parentNode.removeChild(existingLink); // Remove the old theme link
        }

        document.head.appendChild(link); // Append the new theme link to the head
    };

    // Load the theme when the component mounts or theme changes
    useEffect(() => {
        loadTheme(theme);
        // Save the selected theme to localStorage
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Handler for theme selection change
    const handleThemeChange = (event) => {
        setTheme(event.target.value);
    };

    let schema = {
        admin: {
            text: "Admin",
            icon: "lock",
            master: [
                { name: "departmentManagement", text: "Department", icon: "sitemap", path: "/departments", access: "department" },
                { name: "roleManagement", text: "Role", icon: "sitemap", path: "/roles", access: "role" },
                { name: "userManagement", text: "User", icon: "users", path: "/users", access: "user" },
                { name: "companyManagement", text: "Company", icon: "cubes-stacked", path: "/companies", access: "company" },
                { name: "projectManagement", text: "Project", icon: "sitemap", path: "/projects", access: "project" },
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
                { name: "contractor", text: "Contractor", icon: "cubes-stacked", path: "/contractors", access: "contractor" },
                { name: "supplier", text: "Supplier", icon: "cubes-stacked", path: "/suppliers", access: "supplier" },              
                { name: "itemTypeManagement", text: "Item Type", icon: "cubes-stacked", path: "/item-types", access: "assetType" },
                { name: "itemGroupManagement", text: "Item Group", icon: "cubes-stacked", path: "/item-groups", access: "assetGroup" },
                { name: "itemMasterManagement", text: "Item", icon: "vector-square", path: "/item-masters", access: "asset" },
                { name: "towerManagement", text: "Tower", icon: "industry", path: "/towers", access: "plan" },
                { name: "floorManagement", text: "Floor", icon: "cubes", path: "/floors", access: "plan" },
                { name: "flatManagement", text: "Flat", icon: "bed", path: "/flats", access: "plan" },
                { name: "roomManagement", text: "Room", icon: "cubes", path: "/rooms", access: "plan" },
                { name: "activityManagement", text: "Activity", icon: "cubes-stacked" },
            ],
            transaction: [
                { name: "workItemCreation", text: "Work Item Creation", icon: "vector-square", path: "/workitems" },
                { name: "dependencyLabelSetting", text: "Dependency Label Setting", icon: "vector-square", path: "/labelsettings" },
                { name: "activityAssignment", text: "Activity Assignment", icon: "vector-square", path: "/activities" },
                { name: "activityReporting", text: "Activity Reporting", icon: "vector-square", path: "/activities" },
                { name: "activityReporting", text: "Activity Reporting", icon: "vector-square", path: "/home" },
                { name: "levelSetup", text: "Level Setup", icon: "vector-square", path: "/level-setups"}
            ],
            report: [
                { name: "workStatusReport", text: "Work Status Report", icon: "vector-square", path: "/statusreport" }
            ]
        },
        legal: {
            text: "Legal",
            icon: "user-tie",
            master: [
                { name: "mouza", text: "Mouza", icon: "cubes-stacked", path: "/mouzas", access: "mouza" },
                { name: "rsDaag", text: "RS Master", icon: "cubes-stacked", path: "/rsdaags", access: "rsDaag" },
                { name: "nameMaster", text: "Name Master", icon: "cubes-stacked", path: "/nameMasters", access: "nameMaster" },
                { name: "wonership", text: "Woner Ship", icon: "cubes-stacked", path: "/mouzas", access: "mouza" },
            ],
            transaction: [
                { name: "legalTransaction1", text: "Legal Transaction 1", icon: "vector-square", path: "/home" },
            ],
            report: [
                { name: "legalReport", text: "Legal Report", icon: "vector-square", path: "/home" },
            ]
        },        
    };

    useEffect(() => {
        setProfilePicture(loggedInUser?.photoUrl);
    }, [loggedInUser]);

    const handleLogout = () => {
        setToken({ logout: true });
        dispatch(loginUser());
        navigate("/", { replace: true });
    };

    const logoutUser = async (e) => {
        e.preventDefault();

        handleLogout();
    }

    return (
        <div className="app-header header-shadow">
            <div className="app-header__logo">
                <div className="logo-src"><img src={clientLogo} alt="Rajwada" title="Rajwada" /></div>
                <div className="header__pane ml-auto">
                    <div>
                        <button type="button" className="hamburger close-sidebar-btn hamburger--elastic"
                            onClick={(event) => {
                                setShowSidebar(!showSidebar)
                                headerToLayout(!showSidebar)
                            }}>
                            <span className="hamburger-box">
                                <span className="hamburger-inner"></span></span></button>
                    </div>
                </div>
            </div>
            <div className="app-header__mobile-menu">
                <div>
                    <button type="button" className="hamburger hamburger--elastic mobile-toggle-nav"
                        onClick={(event) => {
                            setShowSidebar(!showSidebar)
                            headerToLayout(!showSidebar)
                        }}>
                        <span className="hamburger-box">
                            <span className="hamburger-inner"></span></span></button>
                </div>
            </div>
            <div className="app-header__menu">
                <span>
                    <button type="button"
                        className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav"
                        onClick={(event) => {
                            setShowMobileHeader(!showMobileHeader)
                        }}>
                        <span className="btn-icon-wrapper">
                            <i className="fa fa-ellipsis-v fa-w-6"></i></span></button>
                </span>
            </div>
            <div className={showMobileHeader ? `app-header__content header-mobile-open` : `app-header__content`}>
                <div className="app-header-center">
                    <div className="logo-center"><img src={clientLogo} alt="Rajwada" /></div>
                </div>
                <div className="app-header-right">
                    <div className="header-dots">
                        <IUIHeaderMenu schema={{ type: 'reports', schema: schema }} />
                        <IUIHeaderMenu schema={{ type: 'master', schema: schema }} />
                        <IUIHeaderMenu schema={{ type: 'module', schema: schema }} menuToHeader={menuToHeader} />
                        <div className="header-dots">
                            <select
                                id="theme-select"
                                value={theme}
                                className="form-control mt-2"
                                onChange={handleThemeChange}
                            >
                                <option value="light">Light</option>
                                <option value="red">Red</option>
                                {/* Add more themes as needed */}
                            </select>
                        </div>
                    </div>
                    <div className="header-btn-lg pr-0">
                        <div className="widget-content p-0">
                            <div className="widget-content-wrapper">
                                <div className="widget-content-left  mr-3 header-user-info">
                                    <div className="widget-heading"> {`${loggedInUser?.firstName} ${loggedInUser.lastName}`} </div>
                                    <div className="widget-subheading"> {loggedInUser?.email} </div>
                                </div>
                                <div className="widget-content-left">
                                    <div className="btn-group">
                                        <Link to="/" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                            className="p-0 btn btn-link">
                                            {
                                                (loggedInUser?.photoUrl) && <img src={profilePicture} style={{ width: "3rem", height: "3rem", margin: "auto", borderRadius: "150px" }} title='Profile Picture' alt='Rajwada bProfile Picture' />
                                            }
                                            {
                                                (!loggedInUser?.photoUrl) && <img width="42" className="rounded-circle" src={defaultAvatar}
                                                    alt="Rajwada_Default_User_Pic" />
                                            }
                                            <i className="fa fa-angle-down ml-2 opacity-8"></i>
                                        </Link>
                                        <div tabIndex="-1" role="menu" aria-hidden="true"
                                            className="rm-pointers dropdown-menu-lg dropdown-menu dropdown-menu-right">
                                            <div className="dropdown-menu-header">
                                                <div className="dropdown-menu-header-inner bg-info">
                                                    <div className="menu-header-image opacity-2"
                                                        style={{ backgroundImage: `url(${dropDownCity3})` }}>
                                                    </div>
                                                    <div className="menu-header-content text-left">
                                                        <div className="widget-content p-0">
                                                            <div className="widget-content-wrapper">
                                                                <div className="widget-content-left mr-3">
                                                                    {
                                                                        (loggedInUser?.photoUrl) && <img src={profilePicture} style={{ width: "3rem", height: "3rem", margin: "auto", borderRadius: "150px" }} title='Profile Picture' alt='Rajwada bProfile Picture' />
                                                                    }
                                                                    {
                                                                        (!loggedInUser?.photoUrl) && <img width="42" className="rounded-circle" src={defaultAvatar}
                                                                            alt="Rajwada_Default_User_Pic" />
                                                                    }
                                                                </div>
                                                                <div className="widget-content-left">
                                                                    <div className="widget-heading"> {`${loggedInUser?.firstName} ${loggedInUser.lastName}`} </div>
                                                                    <div className="widget-subheading opacity-8">{loggedInUser?.email}</div>
                                                                </div>
                                                                <div className="widget-content-right mr-2">
                                                                    <button
                                                                        className="btn-pill btn-shadow btn-shine btn btn-focus" onClick={(e) => logoutUser(e)}>Logout</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="scroll-area-xs" style={{ height: "150px" }}>
                                                <div className="scrollbar-container ps">
                                                    <ul className="nav flex-column">
                                                        <li className="nav-item-header nav-item">Activity</li>
                                                        <li className="nav-item">
                                                            <Link to="/change-password" className="nav-link">Change
                                                                Password</Link>
                                                        </li>
                                                        <li className="nav-item">
                                                            <Link to="/view-profile" className="nav-link">View
                                                                Profile</Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header