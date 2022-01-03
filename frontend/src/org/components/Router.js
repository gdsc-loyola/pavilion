import React from 'react';
import { Route } from 'react-router-dom';

export const Admin = ({ component: Component, ...rest }) => {
  return (
    <>
      <Route
        {...rest}
        render={(props) => {
          // if (auth.isAuthenticate()) {
          return <Component {...props} />;
          // } else {
          //     return <Redirect to="/admin/login/" />
          // }
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
