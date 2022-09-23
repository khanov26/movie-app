import React, {useState} from 'react';
import {Outlet} from "react-router-dom";
import Header from "../../components/admin/Header";
import {Box, Stack} from "@mui/material";
import Sidebar from "../../components/admin/Sidebar";
import {useAuth} from "../../auth/useAuth";
import {Role} from "../../types/role";
import AccessDenied from "../../components/public/AccessDenied";

const AdminTemplate = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const toggleSideBar = () => {
        setSidebarCollapsed(prevState => !prevState);
    };

    const {user} = useAuth();
    const accessRoles = [Role.manager, Role.admin];
    if (!accessRoles.includes(user!.role)) {
        return <AccessDenied/>
    }

    return (
        <Stack direction="row">
            <Sidebar collapsed={sidebarCollapsed} />
            <Box sx={{flex: 1}}>
                <Header toggleSidebar={toggleSideBar} />
                <Outlet />
            </Box>
        </Stack>
    );
};

export default AdminTemplate;
