import React from "react"
import { Navigate, Outlet } from "react-router-dom";

function useAuth() {
    const level = localStorage.getItem('level');
    return level
}
function AdminRoute() {
    const isAuth = useAuth();
    return (isAuth == '3') ? <Outlet /> : <Navigate to='/login' />

}
export default AdminRoute;