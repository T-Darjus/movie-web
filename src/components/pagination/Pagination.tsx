import React from "react";
import "./pagination.scss";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../../state";

const Pagination = () => {
  const totalPages = useSelector((state: State) => state.totalPages);
  const currentPage = useSelector((state: State) => state.currentPage);

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const dispatch = useDispatch();
  const { pageCurrent } = bindActionCreators(actionCreators, dispatch);

  return (
    <div className="pagination-container">
      <ul>
        {pages.map((page: number) => {
          return (
            <li
              onClick={() => {
                pageCurrent(page);
              }}
              key={page}
              className={currentPage === page ? "page-active" : undefined}
            >
              {page}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Pagination;
