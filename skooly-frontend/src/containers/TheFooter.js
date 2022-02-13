import React from "react";
import { CFooter } from "@coreui/react";

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div></div>
      <div className="mfs-auto">
        <a href="#" target="_blank" rel="noopener noreferrer">
          Skooly{" "}
        </a>
        <span className="mr-1">&copy; 2022.</span>
      </div>
    </CFooter>
  );
};

export default React.memo(TheFooter);
