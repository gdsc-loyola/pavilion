import React, {useEffect, useState} from "react";
import Dashboard from "../views/Dashboard";
import Events from "../views/Events";
import { Route } from "react-router-dom"

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
const Admin = () => {
    return(
        <>
            <Route exact path="/admin/">
                <Dashboard />
            </Route>
            <Route exact path="/admin/events/">
                <Events />
            </Route>
        </>
    )
}

export default Admin