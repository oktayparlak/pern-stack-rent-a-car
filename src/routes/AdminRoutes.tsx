import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Cars from "../pages/admin/Cars";
import NewCar from "../pages/admin/NewCar";
import EditCar from "../pages/admin/EditCar";
import Bookings from "../pages/admin/Bookings";
import ProtectedRoute from "../components/ProtectedRoute";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute requireAdmin>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="cars" element={<Cars />} />
        <Route path="cars/new" element={<NewCar />} />
        <Route path="cars/edit/:id" element={<EditCar />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
