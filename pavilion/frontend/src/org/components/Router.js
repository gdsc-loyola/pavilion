import React from "react";
import Dashboard from "../views/Dashboard";
import Events from "../views/Events";

const routes = {
    "/": () => <Dashboard />,
    "/events": () => <Events />
}

export default routes