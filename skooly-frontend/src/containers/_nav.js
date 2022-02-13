import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Home",
    to: "/home",
    icon: <CIcon name="cil-home" customClasses="c-sidebar-nav-icon" />,
  },

  {
    _tag: "CSidebarNavItem",
    name: "Students",
    to: "/students",
    icon: <CIcon name="cil-people" customClasses="c-sidebar-nav-icon" />,
  },

  {
    _tag: "CSidebarNavDivider",
    className: "m-2",
  },
];

export default _nav;
