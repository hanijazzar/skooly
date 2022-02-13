import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Helpers from "src/utils/Helpers";

export const Pagination = ({ endpoint, getData, pager, loading }) => {
  const [page, setPage] = useState(
    parseInt(Helpers.getUrlParameter("page")) || 1
  );
  const routeName = "/students";

  const onPageChange = () => {
    const currentPage = parseInt(Helpers.getUrlParameter("page")) || 1;
    setPage(currentPage);
  };

  useEffect(() => {
    // dispatch(getStudents(page))
    // getStudents(page);
  }, [page]);

  return (
    <div className="text-center">
      <div className="pagination-div">
        {pager.pages && pager.pages.length && (
          <ul className="pagination justify-content-center">
            <li
              className={`page-item first-item ${
                pager.currentPage === 1 ? "disabled" : ""
              }`}
              onClick={onPageChange}
            >
              <Link to={`${routeName}?page=1`} className="page-link">
                First
              </Link>
            </li>
            <li
              className={`page-item previous-item ${
                pager.currentPage === 1 ? "disabled" : ""
              }`}
              onClick={onPageChange}
            >
              <Link
                to={`${routeName}?page=${pager.currentPage - 1}`}
                className="page-link"
              >
                Previous
              </Link>
            </li>
            {pager.pages.map((page) => (
              <li
                key={page}
                className={`page-item number-item ${
                  pager.currentPage === page ? "active" : ""
                }`}
                onClick={onPageChange}
              >
                <Link to={`${routeName}?page=${page}`} className="page-link">
                  {page}
                </Link>
              </li>
            ))}
            <li
              className={`page-item next-item ${
                pager.currentPage === pager.totalPages ? "disabled" : ""
              }`}
              onClick={onPageChange}
            >
              <Link
                to={`${routeName}?page=${pager.currentPage + 1}`}
                className="page-link"
              >
                Next
              </Link>
            </li>
            <li
              className={`page-item last-item ${
                pager.currentPage === pager.totalPages ? "disabled" : ""
              }`}
              onClick={onPageChange}
            >
              <Link
                to={`${routeName}?page=${pager.totalPages}`}
                className="page-link"
              >
                Last
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Pagination;
