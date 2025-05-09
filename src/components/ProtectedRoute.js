import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, allowedRole }) => {
  const user = JSON.parse(localStorage.getItem('user')); // Or get from context/store

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return Component;
};

export default ProtectedRoute;
