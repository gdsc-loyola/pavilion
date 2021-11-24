import React from "react";
import { Routes, Route } from "react-router-dom";
import OrgPage from "./OrgPage";

export const OrgPageRoutes = () => {
  return (
    <>
      <Route path=":id" component={OrgPage} />
    </>
  );
};
