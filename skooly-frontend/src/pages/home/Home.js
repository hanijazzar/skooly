import React, { lazy } from "react";
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import skooly from "../../assets/images/skooly-home.png";

const Home = () => {
  return (
    <>
      <CRow className="mb-2">
        <CCol sm={12} md={12}>
          <div className="text-center">
          <img src={skooly} className="skooly-home" />
          </div>
        </CCol>
      </CRow>
    </>
  );
};

export default Home;
