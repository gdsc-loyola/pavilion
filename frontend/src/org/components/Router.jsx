import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export const Admin = ({ component: Component, ...rest }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <>
      <Route
        {...rest}
        render={(props) => {
          // if (isLoading) {
          //   return null;
          // }
          // if (isAuthenticated) {
          return <Component {...props} />;
          // }

          // return <Redirect to="/admin/login " />;
        }}
      />
    </>
  );
};

// export const CreateOrg = ({ component: Component, ...rest }) => {
//   return (
//     <>
//       <Route
//         {...rest}
//         render={(props) => {
//           if (signUpState.getState() === 1) {
//             return (
//               <>
//                 <Component {...props} />
//                 <Redirect to="/org-info/" />
//               </>
//             );
//           } else if (signUpState.getState() === 2) {
//             return (
//               <>
//                 <Component {...props} />
//                 <Redirect to="/org-logo/" />
//               </>
//             );
//           } else if (signUpState.getState() === 3) {
//             return (
//               <>
//                 <Component {...props} />
//                 <Redirect to="/org-links/" />
//               </>
//             );
//           } else {
//             signUpState.setState(1);
//             <Redirect to="/org-info/" />;
//           }
//         }}
//       />
//     </>
//   );
// };
