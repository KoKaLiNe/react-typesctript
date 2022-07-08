import React from "react";
import { AppRoute } from "../../const";
import { useLocation, useHistory, useParams, Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { action } from "mobx";
import { tasks, users } from "../../store";
import TaskStatus from "../taskStatus/taskStatus";
import TaskCard from "../taskCard/taskCard";
import UserCard from "../userCard/userCard";
import EditForm from "../editForm/editForm";
import TasksList from "../tasksList/tasksList";
import UsersList from "../usersList/usersList";
import StatusBtn from "../statusBtn/statusBtn";

const Board = observer(() => {

    const { pathname } = useLocation();
    const { id } = useParams();
    const { userid } = useParams();
    const hist = useHistory();

    // СПИСОК ЗАДАЧ
    if (pathname === AppRoute.TASK_LIST) {
        return (
            <>
                <TasksList tasks={tasks.data} users={users.data} />
            </>
        )
    }

    // ВЫБРАННАЯ ЗАДАЧА
    else if (pathname === `${AppRoute.TASK_LIST}/${id}`) {

        let currentTask;
        if (tasks.data.find(task => task.id === id) === undefined) {
            currentTask = tasks.mock
        } else {
            currentTask = tasks.data.find(task => task.id === id)
        }

        const handleDelete = action(() => {
            tasks.deleteTask(id);
            hist.goBack();
        })

        return (
            <>
                <section className="board">
                    <div className="board__header  task-header">
                        <div className="board__header-title  task-title">
                            <h2
                                className="board__header-text"
                                title={`${currentTask.title}`}
                            >{currentTask.title}</h2>
                            <TaskStatus status={currentTask.status} />
                        </div>
                        <div className="board__header-btns">
                            <StatusBtn id={id} />
                            <Link
                                to={`/edit/${id}`}
                                className="btn-board__header  btn-primary  btn">
                                Редактировать
                            </Link>
                            <button
                                type="submit"
                                onClick={() => { handleDelete() }}
                                className="btn-board__header  btn-error  btn">
                                Удалить
                            </button>
                        </div>
                    </div>
                    <section className="board__content">
                        <section className="card">
                            <TaskCard tasks={tasks.data} users={users.data} />
                        </section>
                    </section>
                </section>
            </>
        )
    }

    // СПИСОК ПОЛЬЗОВАТЕЛЕЙ
    else if (pathname === AppRoute.USER_LIST) {

        return (
            <>
                <UsersList tasks={tasks.data} users={users.data} />
            </>
        )
    }

    // ВЫБРАННЫЙ ПОЛЬЗОВАТЕЛЬ
    else if (pathname === `${AppRoute.USER_LIST}/${id}`) {
        return (
            <>
                <section className="board">
                    <UserCard tasks={tasks.data} users={users.data} />
                </section>
            </>
        )
    }

    // РЕДАКТИРОВАНИЕ ЗАДАЧ
    else if (pathname === `${AppRoute.ADD}/${id}`) {

        const currentTask = tasks.data.find(task => task.id === id)
        const currentUser = users.data.find(user => user.id === userid)

        if (currentTask || currentUser) {
            return (
                <>
                    <section className="board">
                        <EditForm currentTask={currentTask} currentUser={currentUser} userId={userid} />
                    </section>
                </>
            )
        }
    }

    // ДОБАВЛЕНИЕ ЗАДАЧИ
    else if (pathname === AppRoute.ADD || pathname === `${AppRoute.USER_LIST}/${userid}/add`) {

        return (
            <>
                <section className="board">
                    <EditForm userId={userid} />
                </section>
            </>
        )
    }
})

export default Board;