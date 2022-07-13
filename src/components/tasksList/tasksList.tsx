import React, { useState } from "react";
import { AppRoute } from "../../const";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Filter from "../filter/filter";
import TaskItem from "../taskItem/taskItem";
import Pagination from "../pagination/pagination";
import { ITaskData, IUserData } from "../../store/interfaces";

interface IProps {
  tasks: ITaskData[];
  users: IUserData[];
}
const TasksList = observer((props: IProps): JSX.Element => {
  const { tasks, users } = props;

  const [page, setPage] = useState<number>(1);
  const total = tasks.length;
  const itemsPerPage = 10;
  const handleChangeCounter = (value: number): void => {
    setPage(value);
  };

  return (
    <>
      <section className="board">
        <div className="board__header">
          <h2 className="board__header-title">Задачи</h2>
          <button className="btn-primary  btn">
            <Link to={AppRoute.ADD} className="btn-link">
              Добавить задачу
            </Link>
          </button>
        </div>
        <section className="board__content">
          <Filter />
          <div className="board__list">
            {tasks
              .slice(
                (page - 1) * itemsPerPage,
                (page - 1) * itemsPerPage + itemsPerPage
              )
              .map((task) => (
                <TaskItem task={task} key={task.id} users={users} />
              ))}
          </div>
          <Pagination
            page={page}
            itemsPerPage={itemsPerPage}
            total={total}
            onChangePage={handleChangeCounter}
          />
        </section>
      </section>
    </>
  );
});

export default TasksList;
