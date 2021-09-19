import React, {useEffect, useState} from "react";
import Dashboard from "../views/Dashboard";
import Events from "../views/Events";
import { Route, Redirect } from "react-router-dom"
import auth from "../authentication/auth";

// const privateRoutes = () => {
//     return(
//         isAuth ? 
//         <>
//             <Route exact path="/admin/">
//                 <Dashboard />
//             </Route>
//             <Route exact path="/admin/events/">
//                 <Events />
//             </Route>
//         </>
//         :
//         <Route exact path="/login">
//             <Login />
//         </Route>
//     )
// }

// const publicRoutes = () =>  {
//     return (
//         <>
//             <Route exact path="/">
//                 <Home />
//             </Route>
//             <Route exact path="/events">
//                 <Events />
//             </Route>
//         </>
//     )
// }

// export default privateRoutes
// export default publicRoutes
export const Admin = ({component: Component, ...rest}) => {
    return(
        <>
            {/* <Route exact path="/admin/" component={Dashboard} />
            <Route exact path="/admin/events/" component={Events} /> */}
            <Route 
                {...rest}
                render={props => {
                    if (auth.isAuthenticate()) {
                        return <Component {...props} />
                    } else {
                        return <Redirect to="/admin/login/" /> 
                    }
                }}
            />
        </>
    )
}