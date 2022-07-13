import React, { useState } from "react";
import Pagination from "../pagination/pagination";
import TaskItem from "../taskItem/taskItem";
import { Link, useParams } from "react-router-dom";
import { AppRoute } from "../../const";
import Modal from "../modal/modal";
import { observer } from "mobx-react-lite";
import { tasks, users } from "../../store";
import { ParamsTypes, IUserData, ITaskData } from "../../store/interfaces";

interface IProps {
  userTasks?: ITaskData[];
}

const UserCard = observer((props: IProps): JSX.Element => {
  const { userTasks } = props;
  const { id } = useParams<ParamsTypes>();
  const [loggedUser, setLoggedUser] = useState<IUserData>(null);

  if (loggedUser === null && localStorage.length > 0) {
    setLoggedUser(JSON.parse(localStorage.getItem("loggedUserInfo")));
  }

  let currentUser: IUserData;

  if (users.data.find((x) => x.id === id) === undefined) {
    currentUser = users.mock;
  } else {
    currentUser = users.data.find((x) => x.id === id);
  }

  // Пагинация
  const [page, setPage] = useState<number>(1);
  const total = userTasks.length;
  const itemsPerPage = 10;
  const handleChangeCounter = (value: number): void => {
    setPage(value);
  };

  const [isModal, setModal] = useState(false);

  const setDefaulUserPic = () => {
    if (currentUser.photoUrl === null || currentUser.photoUrl === undefined) {
      return "../img/defualt-user-icon.png";
    } else {
      return currentUser.photoUrl;
    }
  };

  return (
    <>
      <div className="board__header">
        <h2 className="board__header-title  user-title">
          {currentUser.username}
        </h2>
        <div className="board__header-btns">
          <Link
            to={`${AppRoute.USER_LIST}/${id}/add`}
            className="btn-board__header  btn"
          >
            Добавить задачу
          </Link>
          <button
            onClick={() => setModal(true)}
            className="btn-board__header  btn-primary  btn"
            disabled={loggedUser === null || loggedUser.id !== id}
          >
            Редактировать
          </button>
        </div>
      </div>
      <section className="board__content">
        <div className="card__wrap">
          <div className="card__col  col-1">
            <div className="card__user-img-wrapper  ">
              <img
                className="card__user-img"
                src={setDefaulUserPic()}
                width="186"
                height="186"
                alt="Изображение профиля"
              />
            </div>
            <h4 className="card__title">О себе</h4>
            <p className="card__title">{currentUser.about}</p>
          </div>
          <div className="card__col  col-2  user--card">
            <p className="card__title">Задачи</p>
            <div className="board__list">
              {userTasks
                .slice(
                  (page - 1) * itemsPerPage,
                  (page - 1) * itemsPerPage + itemsPerPage
                )
                .map((task) => (
                  <TaskItem task={task} key={task.id} />
                ))}
            </div>
            <Pagination
              page={page}
              itemsPerPage={itemsPerPage}
              total={total}
              onChangePage={handleChangeCounter}
            />
          </div>
        </div>
      </section>

      <Modal isVisible={isModal} onClose={() => setModal(false)} />
    </>
  );
});

export default UserCard;
