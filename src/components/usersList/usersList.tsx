import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import UserItem from "../userItem/userItem";
import Pagination from "../pagination/pagination";


const UsersList = observer(({ tasks, users }) => {

    const [startStep, setStartStep] = useState(1)
    const [endStep, setEndStep] = useState(10)
    const [currentPage, setCurrentPage] = useState(1);
    const arrayLength = users.length

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
                    <h2 className="board__header-title  user-title">Пользователи</h2>
                </div>

                <section className="board__content">
                    <div className="board__list">
                        {users.slice(startStep - 1, endStep).map(user => <UserItem {...user} key={user.id} />)}
                    </div>
                    <Pagination props={props} />
                </section>

            </section>
        </>
    )
})

export default UsersList