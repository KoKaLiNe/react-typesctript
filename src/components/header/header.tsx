import React, { useState, useEffect } from "react";
import { AppRoute } from "../../const";
import { useLocation, useParams, Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { runInAction } from "mobx";
import { users } from "../../store";


const Header = observer(() => {

    const [loggedUser, setLoggedUser] = useState([])

    if ((loggedUser.length === 0) && (localStorage.length > 0)) {
        setLoggedUser(JSON.parse(localStorage.getItem("loggedUserInfo")));
    }

    useEffect(() => {
        runInAction(() => {
            if (loggedUser.id) {
                users.fetchLoggedUser(loggedUser.id)
            }
        })
    }, [loggedUser]);

    const setDefaulUserPic = () => {
        // return (users.loggedUser.photoUrl === null) || (users.loggedUser.photoUrl === undefined) ? "../../img/defualt-user-icon.png" : users.loggedUser.photoUrl;
        return (users?.loggedUser?.photoUrl ?? "../../img/defualt-user-icon.png");
    }

    const { pathname } = useLocation();
    const { id } = useParams();
    const { userid } = useParams();

    const loggedOut = () => {
        localStorage.removeItem("loggedUserInfo");
        localStorage.removeItem("userPassword");
        users.loggedUser = [];
        users.password = null;
        window.location.href = `${AppRoute.LOGIN}`;
    }

    const headerInner = () => {

        if (pathname !== AppRoute.LOGIN) {
            return (
                <>
                    <section className="main__header-wrap">
                        <div className="main__header-group-link">
                            <Link
                                to={AppRoute.TASK_LIST}
                                className={`main__lnk  task-lnk  
                            ${(pathname === AppRoute.TASK_LIST
                                        || pathname === `${AppRoute.TASK_LIST}/${id}`
                                        || pathname === AppRoute.ADD
                                        || pathname === `${AppRoute.ADD}/${id}`
                                        || pathname === `${AppRoute.USER_LIST}/${userid}/add`)
                                    && 'active-lnk'}`} >Задачи</Link>
                            <Link
                                to={AppRoute.USER_LIST}
                                className={`main__lnk  user-lnk 
                            ${(pathname === AppRoute.USER_LIST
                                        || pathname === `${AppRoute.USER_LIST}/${id}`)
                                    && 'active-lnk'}`}>Пользователи</Link>
                        </div>
                        <div className="main__user-profile  dropdown">
                            <span className="main__user-name">{users.loggedUser.username}</span>
                            <div className="main__user-img-wrapper  ">
                                <img
                                    className="main__user-img"
                                    src={setDefaulUserPic()}
                                    width="40"
                                    height="40"
                                    alt="Изображение профиля" />
                            </div>
                            <div className="main__user-list dropdown-content">
                                <Link
                                    to={`${AppRoute.USER_LIST}/${users.loggedUser.id}`}
                                    className="dropdown-link">Посмотреть профиль</Link>
                                <button
                                    onClick={() => loggedOut()}
                                    className="dropdown-link  accent"
                                >Выйти из системы</button>
                            </div>
                        </div>
                    </section>
                </>
            )
        }
    }

    return (
        <section className="main__header">
            <img src="../../img/logo.svg" alt="логотип" />
            {headerInner()}
        </section>
    )
})

export default Header;