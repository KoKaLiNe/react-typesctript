import { action } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";

interface IProps {
  page: number;
  itemsPerPage: number;
  total: number;
  onChangePage: (value: number) => void;
}

const Pagination = observer((props: IProps) => {
  const { page, itemsPerPage, total, onChangePage } = props;
  const totalPages: number = Math.ceil(total / itemsPerPage);
  const endItemCount = (page - 1) * itemsPerPage + itemsPerPage;

  const shownTasksFrom = () => {
    if (page === 1) {
      return 1;
    } else {
      return (page - 1) * itemsPerPage;
    }
  };
  const shownTasksTo = () => {
    if (endItemCount >= total) {
      return endItemCount - (endItemCount - total);
    } else {
      return endItemCount;
    }
  };
  const handleNextPage = action(() => {
    onChangePage(page + 1);
  });
  const handlePrevPage = action(() => {
    onChangePage(page - 1);
  });
  const handleChangePage = action((number: number) => {
    onChangePage(number);
  });
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(total / itemsPerPage); ++i) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="pagination">
        <div className="pagination__inner">
          <button
            className="btn-pagination  btn-prev  btn"
            disabled={page === 1}
            onClick={handlePrevPage}
          >
            Назад
          </button>
          {pageNumbers.map((number) => (
            <button
              className={`btn-pagination  btn  ${page === number && `active`}`}
              onClick={() => handleChangePage(number)}
              key={number}
            >
              {number}
            </button>
          ))}

          <button
            className="btn-pagination  btn-next  btn"
            disabled={page === totalPages}
            onClick={handleNextPage}
          >
            Вперед
          </button>
        </div>
        <span className="pagination__count">{`Показано ${shownTasksFrom()} - ${shownTasksTo()} из ${total}`}</span>
      </div>
    </>
  );
});

export default Pagination;
