import React from "react";
import { Route, Redirect } from "react-router-dom";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";

const TheLayout = () => (
  <div className="c-app c-default-layout">
    <TheSidebar />
    <div className="c-wrapper">
      <TheHeader />
      <div className="c-body">
        <TheContent />
      </div>
      <TheFooter />
    </div>
  </div>
);

export default TheLayout;
