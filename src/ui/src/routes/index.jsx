import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Refresh from "../pages/Refresh";
import ResetPassword from "../pages/ResetPassword";
import Signup from "../pages/Signup";

import { AddCompany, EditCompany, ListCompany, ViewCompany } from "../pages/app/schema/Companys";
import { AddFlat, EditFlat, ListFlat, ViewFlat } from "../pages/app/schema/Flats";
import { AddFloor, EditFloor, ListFloor, ViewFloor } from "../pages/app/schema/Floors";
import { AddItemGroup, EditItemGroup, ListItemGroup, ViewItemGroup } from "../pages/app/schema/ItemGroups";
import { AddItemMaster, EditItemMaster, ListItemMaster, ViewItemMaster } from "../pages/app/schema/ItemMasters";
import { AddProject, EditProject, ListProject, ViewProject } from "../pages/app/schema/Projects";
import { AddRole, EditRole, ListRole, ViewRole } from "../pages/app/schema/Roles";
import { AddRoom, EditRoom, ListRoom, ViewRoom } from "../pages/app/schema/Rooms";
import { AddTower, EditTower, ListTower, ViewTower } from "../pages/app/schema/Towers";
import { AddUser, EditUser, ListUser, ViewUser } from "../pages/app/schema/Users";
import { AddApprover, EditApprover, ListApprover, ViewApprover } from "../pages/app/schema/Approvers";

import ChangePassword from "../pages/app/ChangePassword";
import ChangePasswordSuccess from "../pages/app/ChangePasswordSuccess";
import Dashboard from "../pages/app/Dashboard";
import { EditProfile, ViewProfile } from "../pages/app/Profile";
import { AddActivity, EditActivity, ListActivity, ViewActivity } from "../pages/app/schema/Activities";
import { AddDepartment, EditDepartment, ListDepartment, ViewDepartment } from "../pages/app/schema/Departments";
import { AddWorkItem, EditWorkItem, ListWorkItem, ViewWorkItem } from "../pages/app/schema/Dependencies";
import { AddItemType, EditItemType, ListItemType, ViewItemType } from "../pages/app/schema/ItemType";

import { AddUOM, EditUOM, ListUOM, ViewUOM } from "../pages/app/schema/UOMs";
import { AddWorkflow, EditWorkflow, ListWorkflow, ViewWorkflow } from "../pages/app/schema/Workflows";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";

import { AddContractor, EditContractor, ListContractor, ViewContractor } from "../pages/app/schema/Contractors";
import { AddMouza, EditMouza, ListMouza, ViewMouza } from "../pages/app/schema/Mouzas";
import { AddNameMaster, EditNameMaster, ListNameMaster, ViewNameMaster } from "../pages/app/schema/NameMasters";
import { AddRsDaag, EditRsDaag, ListRsDaag, ViewRsDaag } from "../pages/app/schema/RsDaags";


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
                    path: "/approvers",
                    element: <ListApprover />
                },
                {
                    path: "/approvers/:id",
                    element: <ViewApprover />
                },
                {
                    path: "/approvers/:id/edit",
                    element: <EditApprover />
                },
                {
                    path: "/approvers/add",
                    element: <AddApprover />
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
                {
                    path: "/activities",
                    element: <ListActivity />
                },
                {
                    path: "/activities/:id",
                    element: <ViewActivity />
                },
                {
                    path: "/activities/:id/edit",
                    element: <EditActivity />
                },
                {
                    path: "/activities/add",
                    element: <AddActivity />
                },
                {
                    path: "/workitems",
                    element: <ListWorkItem />
                },
                {
                    path: "/workitems/:id",
                    element: <ViewWorkItem />
                },
                {
                    path: "/workitems/:id/edit",
                    element: <EditWorkItem />
                },
                {
                    path: "/workitems/add",
                    element: <AddWorkItem />
                },
                {
                    path: "/labelsettings",
                    element: <ListWorkflow />
                },
                {
                    path: "/labelsettings/:id",
                    element: <ViewWorkflow />
                },
                {
                    path: "/labelsettings/:id/edit",
                    element: <EditWorkflow />
                },
                {
                    path: "/labelsettings/add",
                    element: <AddWorkflow />
                },
                {
                    path: "/mouzas",
                    element: <ListMouza />
                },
                {
                    path: "/mouzas/:id",
                    element: <ViewMouza />
                },
                {
                    path: "/mouzas/:id/edit",
                    element: <EditMouza />
                },
                {
                    path: "/mouzas/add",
                    element: <AddMouza />
                },
                {
                    path: "/rsdaags",
                    element: <ListRsDaag />
                },
                {
                    path: "/rsdaags/:id",
                    element: <ViewRsDaag />
                },
                {
                    path: "/rsdaags/:id/edit",
                    element: <EditRsDaag />
                },
                {
                    path: "/rsdaags/add",
                    element: <AddRsDaag />
                },
                {
                    path: "/namemasters",
                    element: <ListNameMaster />
                },
                {
                    path: "/namemasters/:id",
                    element: <ViewNameMaster />
                },
                {
                    path: "/namemasters/:id/edit",
                    element: <EditNameMaster />
                },
                {
                    path: "/namemasters/add",
                    element: <AddNameMaster />
                },
                {
                    path: "/rooms",
                    element: <ListRoom />
                },
                {
                    path: "/rooms/:id",
                    element: <ViewRoom />
                },
                {
                    path: "/rooms/:id/edit",
                    element: <EditRoom />
                },
                {
                    path: "/rooms/add",
                    element: <AddRoom />
                },
                {
                    path: "/contractors",
                    element: <ListContractor />
                },
                {
                    path: "/contractors/:id",
                    element: <ViewContractor />
                },
                {
                    path: "/contractors/:id/edit",
                    element: <EditContractor />
                },
                {
                    path: "/contractors/add",
                    element: <AddContractor />
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
