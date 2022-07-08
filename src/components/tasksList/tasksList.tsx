import React, { useState } from "react";
import { AppRoute } from "../../const";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Filter from "../filter/filter";
import TaskItem from "../taskItem/taskItem";
import Pagination from "../pagination/pagination";


const TasksList = observer(({ tasks, users }) => {

    const [startStep, setStartStep] = useState(1)
    const [endStep, setEndStep] = useState(10)
    const [currentPage, setCurrentPage] = useState(1);
    const arrayLength = tasks.length

    const props = {
        arrayLength,
        startStep,
        setStartStep,
        endStep,
        setEndStep,
        currentPage,
        setCurrentPage
    }

    return (
        <>
            <section className="board">
                <div className="board__header">
                    <h2 className="board__header-title">Задачи</h2>
                    <button className="btn-primary  btn">
                        <Link to={AppRoute.ADD} className="btn-link">Добавить задачу</Link>
                    </button>
                </div>
                <section className="board__content">
                    <Filter tasks={tasks} />
                    <div className="board__list">
                        {tasks.slice(startStep - 1, endStep).map(task => <TaskItem {...task} key={task.id}
                            tasks={tasks}
                            tasksUser={users}
                        />)}
                    </div>
                    <Pagination props={props} />
                </section>
            </section>
        </>
    )
})

export default TasksList;