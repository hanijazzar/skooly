import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import { updateSidebar } from "../store/global";
import logo from "../assets/images/logo.png";

// sidebar nav config
import navigation from "./_nav";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const { sidebarShow } = useSelector((state) => state.global);

  return (
    <CSidebar
      show={sidebarShow}
      onShowChange={(val) => dispatch(updateSidebar(val))}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        {/* <h4>Skooly</h4> */}
        <img src={logo} className="img-fluid logo" />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
