import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute({ roleAccept }) {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const role = useSelector((state) => state.user.account.role);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (roleAccept && role !== roleAccept) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

export default PrivateRoute;
