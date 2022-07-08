import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { AppRoute } from "../../const";


const UserItem = observer(({ id, username }) => {
    return (
        <>
            <div className="board__item">
                <div className="user__name">
                    <Link to={`${AppRoute.USER_LIST}/${id}`}> {username} </Link>
                </div>
            </div>
        </>
    )
})

export default UserItem;