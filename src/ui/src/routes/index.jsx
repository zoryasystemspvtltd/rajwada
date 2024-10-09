import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import ResetPassword from "../pages/ResetPassword";
import Dashboard from "../pages/app/Dashboard";
import Home from "../pages/Home"
import Signup from "../pages/Signup";
import { ListRole, ViewRole, EditRole, AddRole } from "../pages/app/schema/Roles";
import { ListUser, ViewUser, EditUser, AddUser } from "../pages/app/schema/Users";
import { ListItemGroup, ViewItemGroup, EditItemGroup, AddItemGroup } from "../pages/app/schema/ItemGroups";
import { ListItemMaster, ViewItemMaster, EditItemMaster, AddItemMaster } from "../pages/app/schema/ItemMasters";
import { ListProject, ViewProject, EditProject, AddProject } from "../pages/app/schema/Projects";
import { ListCompany, ViewCompany, EditCompany, AddCompany } from "../pages/app/schema/Companys";
import { ListTower, ViewTower, EditTower, AddTower } from "../pages/app/schema/Towers";
import { ListFloor, ViewFloor, EditFloor, AddFloor } from "../pages/app/schema/Floors";
import { ListFlat, ViewFlat, EditFlat, AddFlat } from "../pages/app/schema/Flats";
import Refresh from "../pages/Refresh";
import ChangePassword from "../pages/app/ChangePassword";
import ChangePasswordSuccess from "../pages/app/ChangePasswordSuccess";
import { ViewProfile, EditProfile } from "../pages/app/Profile";
import ForgotPassword from "../pages/ForgotPassword";
import { AddDepartment, EditDepartment, ListDepartment, ViewDepartment } from "../pages/app/schema/Departments";
import { AddUOM, EditUOM, ListUOM, ViewUOM } from "../pages/app/schema/UOMs";
import { AddItemType, EditItemType, ListItemType, ViewItemType } from "../pages/app/schema/ItemType";

const Routes = () => {
    const { token } = useAuth();

    // Define public routes accessible to all users
    const routesForPublic = [
        {
            path: "/service",
            element: <div>Service Page</div>,
        },
        {
            path: "/about-us",
            element: <div>About Us</div>,
        },
    ];

    // Define routes accessible only to authenticated users
    const routesForAuthenticatedOnly = [
        {
            path: "/",
            element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
            children: [
                {
                    path: "",
                    element: <Home />,
                },
                {
                    path: "/home",
                    element: <Dashboard />,
                },
                {
                    path: "/change-password",
                    element: <ChangePassword />,
                },
                {
                    path: "/change-password-success",
                    element: <ChangePasswordSuccess />
                },
                {
                    path: "/view-profile",
                    element: <ViewProfile />
                },
                {
                    path: "/edit-profile",
                    element: <EditProfile />
                },
                {
                    path: "/logout",
                    element: <Logout />,
                },
                {
                    path: "/roles",
                    element: <ListRole />
                },
                {
                    path: "/roles/:id",
                    element: <ViewRole />
                },
                {
                    path: "/roles/add",
                    element: <AddRole />
                },
                {
                    path: "/roles/:id/edit",
                    element: <EditRole />
                },
                {
                    path: "/users",
                    element: <ListUser />
                },
                {
                    path: "/users/:id",
                    element: <ViewUser />
                },
                {
                    path: "/users/:id/edit",
                    element: <EditUser />
                },
                {
                    path: "/users/add",
                    element: <AddUser />
                },
                {
                    path: "/departments",
                    element: <ListDepartment />
                },
                {
                    path: "/departments/:id",
                    element: <ViewDepartment />
                },
                {
                    path: "/departments/:id/edit",
                    element: <EditDepartment />
                },
                {
                    path: "/departments/add",
                    element: <AddDepartment />
                },
                {
                    path: "/item-groups",
                    element: <ListItemGroup />
                },
                {
                    path: "/item-groups/:id",
                    element: <ViewItemGroup />
                },
                {
                    path: "/item-groups/:id/edit",
                    element: <EditItemGroup />
                },
                {
                    path: "/item-groups/add",
                    element: <AddItemGroup />
                },
                {
                    path: "/uoms",
                    element: <ListUOM />
                },
                {
                    path: "/uoms/:id",
                    element: <ViewUOM />
                },
                {
                    path: "/uoms/:id/edit",
                    element: <EditUOM />
                },
                {
                    path: "/uoms/add",
                    element: <AddUOM />
                },
                {
                    path: "/item-masters",
                    element: <ListItemMaster />
                },
                {
                    path: "/item-masters/:id",
                    element: <ViewItemMaster />
                },
                {
                    path: "/item-masters/:id/edit",
                    element: <EditItemMaster />
                },
                {
                    path: "/item-masters/:id/edit/:parentId",
                    element: <EditItemMaster />
                },
                {
                    path: "/item-masters/add",
                    element: <AddItemMaster />
                },
                {
                    path: "/item-masters/add/:parentId",
                    element: <AddItemMaster />
                },
                {
                    path: "/projects",
                    element: <ListProject />
                },
                {
                    path: "/projects/:id",
                    element: <ViewProject />
                },
                {
                    path: "/projects/:id/edit",
                    element: <EditProject />
                },
                {
                    path: "/projects/add",
                    element: <AddProject />
                },
                {
                    path: "/towers",
                    element: <ListTower />
                },
                {
                    path: "/towers/:id",
                    element: <ViewTower />
                },
                {
                    path: "/towers/:id/edit",
                    element: <EditTower />
                },
                {
                    path: "/towers/add",
                    element: <AddTower />
                },
                {
                    path: "/floors",
                    element: <ListFloor />
                },
                {
                    path: "/floors/:id",
                    element: <ViewFloor />
                },
                {
                    path: "/floors/:id/edit",
                    element: <EditFloor />
                },
                {
                    path: "/floors/add",
                    element: <AddFloor />
                },
                {
                    path: "/flats",
                    element: <ListFlat />
                },
                {
                    path: "/flats/:id",
                    element: <ViewFlat />
                },
                {
                    path: "/flats/:id/edit",
                    element: <EditFlat />
                },
                {
                    path: "/flats/add",
                    element: <AddFlat />
                },
                {
                    path: "/companies",
                    element: <ListCompany />
                },
                {
                    path: "/companies/:id",
                    element: <ViewCompany />
                },
                {
                    path: "/companies/:id/edit",
                    element: <EditCompany />
                },
                {
                    path: "/companies/add",
                    element: <AddCompany />
                },
                {
                    path: "/item-types",
                    element: <ListItemType />
                },
                {
                    path: "/item-types/:id",
                    element: <ViewItemType />
                },
                {
                    path: "/item-types/:id/edit",
                    element: <EditItemType />
                },
                {
                    path: "/item-types/add",
                    element: <AddItemType />
                },
            ],
        },
    ];

    // Define routes accessible only to non-authenticated users
    const routesForNotAuthenticatedOnly = [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/refresh",
            element: <Refresh />
        },
        {
            path: "/signup",
            element: <Signup />
        },
        {
            path: "/reset-password",
            element: <ResetPassword />
        },
        {
            path: "/forgot-password",
            element: <ForgotPassword />
        }
    ];

    // Combine and conditionally include routes based on authentication status
    const router = createBrowserRouter([
        ...routesForPublic,
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticatedOnly,
    ]);

    // Provide the router configuration using RouterProvider
    return <RouterProvider router={router} />;
};

export default Routes;
