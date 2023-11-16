import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({
    isAuthorized,
    redirectPath = '/signin',
    children,
  }) => {
    if (!isAuthorized) {
      return <Navigate to={redirectPath} replace />;
    }
  
    return children;
  };

  
  export default ProtectedRoute;
