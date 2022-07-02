import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function RequireAuth({ children }) {
  let auth = useSelector(state => state.auth);
  let location = useLocation();

  if (!auth.email) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}