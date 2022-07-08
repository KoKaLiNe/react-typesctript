import { action } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";


const Pagination = observer(({ props }) => {

    const {
        arrayLength,
        startStep,
        setStartStep,
        endStep,
        setEndStep,
        currentPage,
        setCurrentPage
    } = props

    const shownTasks = () => {
        if (endStep >= arrayLength) {
            return endStep - (endStep - arrayLength);
        } else {
            return (endStep);
        }
    }

    const handleNextPage = action(() => {
        if (arrayLength >= endStep) {
            setStartStep(startStep + 10);
            setEndStep(endStep + 10);
            setCurrentPage(currentPage + 1);
        }
    })

    const handlePrevPage = action(() => {
        if (endStep >= 0) {
            setStartStep(startStep - 10);
            setEndStep(endStep - 10);
            setCurrentPage(currentPage - 1);
        }
    })

    const handleChangePage = action((e) => {
        e.preventDefault();
        setStartStep(+e.target.value * 10 - 9);
        setEndStep(+e.target.value * 10);
        setCurrentPage(+e.target.value);
    })

    const pages = () => {
        if (arrayLength === 0) {
            const lastPage = 1;
            return ([...Array(lastPage).keys()].map(x => ++x));
        } else {
            const lastPage = Math.ceil(arrayLength / 10);
            return ([...Array(lastPage).keys()].map(x => ++x));
        }
    }

    return (
        <>
            <div className="pagination">
                <div className="pagination__inner">
                    <button className="btn-pagination  btn-prev  btn"
                        disabled={startStep === 1}
                        onClick={handlePrevPage}
                    >Назад
                    </button>
                    {pages().map((page) =>
                        <button
                            className={`btn-pagination  btn  ${currentPage === page && `active`}`}
                            onClick={handleChangePage}
                            key={page}
                            value={page}
                        >{page}
                        </button>
                    )}
                    <button
                        className="btn-pagination  btn-next  btn"
                        disabled={!(arrayLength > endStep)}
                        onClick={handleNextPage}> Вперед
                    </button>
                </div>
                <span className="pagination__count">{`Показано ${startStep} - ${shownTasks()} из ${arrayLength}`}</span>
            </div>
        </>
    )
})

export default Pagination;