import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Footer from "./pages/common/Footer";
import Header from "./pages/common/Header";
import LeftMenu from "./pages/common/LeftMenu";

const Layout = () => {
    const navigate = useNavigate();
    const loggedInUser = useSelector((state) => state.api.loggedInUser);
    const [showSidebar, setShowSidebar] = useState(true);
    const [menuRole, setMenuRole] = useState(sessionStorage.getItem("menuRole"));
    const [mainClass, setMainClass] = useState("app-container app-theme-white body-tabs-shadow fixed-header fixed-sidebar");

    const headerToLayout = (sidebarState) => {
        setShowSidebar(sidebarState);
    }

    const headerMenuToLayout = (sidebarRole) => {
        setMenuRole(sidebarRole);
        navigate("/home", { replace: true });
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1250) {
                setMainClass("app-container app-theme-white body-tabs-shadow fixed-header fixed-sidebar closed-sidebar-mobile closed-sidebar");
            }
            else {
                setMainClass("app-container app-theme-white body-tabs-shadow fixed-header fixed-sidebar");
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        loggedInUser && (
            <>
                <div className={showSidebar ? `${mainClass} sidebar-mobile-open` : `${mainClass} closed-sidebar`}>
                    <Header headerToLayout={headerToLayout} headerMenuToLayout={headerMenuToLayout} />
                    <div className="app-main">
                        <LeftMenu leftMenuState={showSidebar} role={menuRole} />
                        <div className="app-main__outer">
                            <div className="app-main__inner">
                                <Outlet />
                            </div>
                            <Footer />
                        </div>
                        <div className="app-drawer-overlay d-none animated fadeIn"></div>
                    </div>
                </div>
            </>
        )
    )
}

export default Layout