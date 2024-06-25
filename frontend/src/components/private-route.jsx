// import React from "react";
// import { Route, Navigate } from "react-router-dom";

// const PrivateRoute = ({ element, ...rest }) => {
//   const isAuthenticated = // Your authentication logic here
// return isAuthenticated ? (
//     <Route {...rest} element={element} />
//   ) : (
//     <Navigate to="/auth/login" replace />
//   );
// };

// export default PrivateRoute;

import React from 'react'

const PrivateRoute = () => {
  return (
    <div>PrivateRoute</div>
  )
}

export default PrivateRoute
