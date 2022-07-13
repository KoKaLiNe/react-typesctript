import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { AppRoute } from "../../const";
import { action, runInAction } from "mobx";
import { users, tasks } from "../../store";
import { api } from "../../api";
import { IUserData, ParamsTypes, IComment } from "../../store/interfaces";

interface IProps {
  isVisible: boolean;
  onClose: () => void;
  setComments?: (comments: IComment) => void;
}

const Modal = observer((prpos: IProps): JSX.Element => {
  const { isVisible, onClose, setComments } = prpos;
  const { pathname } = useLocation<ParamsTypes>();
  const { id } = useParams<ParamsTypes>();

  let currentUser: IUserData;
  if (
    pathname === `${AppRoute.USER_LIST}/${id}` &&
    users.data.find((x) => x.id === id) === undefined
  ) {
    currentUser = users.mock;
  } else {
    currentUser = users.data.find((x) => x.id === id);
  }

  // Форма редактирования пользователя
  const [userForm, setUserForm] = useState({
    username:
      pathname === `${AppRoute.USER_LIST}/${id}` && currentUser.username,
    about: pathname === `${AppRoute.USER_LIST}/${id}` && currentUser.about,
    photoUrl:
      pathname === `${AppRoute.USER_LIST}/${id}` && currentUser.photoUrl,
  });

  // Форма учета времени
  const [timeForm, setTimeForm] = useState({
    timeInMinutes: pathname === `${AppRoute.TASK_LIST}/${id}` && null,
    timeUnit: pathname === `${AppRoute.TASK_LIST}/${id}` && "minute",
    comment: pathname === `${AppRoute.TASK_LIST}/${id}` && null,
    currentUser: users.loggedUser.id,
  });

  const handleFieldChange = action(
    (
      e: React.ChangeEvent<
        HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
      >
    ) => {
      if (pathname === `${AppRoute.USER_LIST}/${id}`) {
        const { name, value } = e.target;
        setUserForm({ ...userForm, [name]: value });
      } else if (pathname === `${AppRoute.TASK_LIST}/${id}`) {
        const { name, value } = e.target;
        setTimeForm({ ...timeForm, [name]: value });
      }
    }
  );

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    // Отправка формы редактирования пользователя
    if (pathname === `${AppRoute.USER_LIST}/${id}`) {
      runInAction(() => {
        users.editUser({
          id: users.loggedUser.id,
          login: users.loggedUser.login,
          username: userForm.username,
          about: userForm.about,
          photoUrl: `${userForm.photoUrl}`,
          password: JSON.parse(localStorage.getItem("userPassword")),
        });
        users.loggedUser.username = userForm.username;
        users.loggedUser.photoUrl = `${userForm.photoUrl}`;
        users.loggedUser.about = userForm.about;
      });
      onClose();
    }
    // Отправка формы учета времени
    else if (pathname === `${AppRoute.TASK_LIST}/${id}`) {
      if (timeForm.timeUnit === "minute") {
        await tasks.addWorktime(id, {
          timeInMinutes: timeForm.timeInMinutes,
          comment: timeForm.comment,
          currentUser: users.loggedUser.id,
        });
      } else if (timeForm.timeUnit === "hour") {
        await tasks.addWorktime(id, {
          timeInMinutes: timeForm.timeInMinutes * 60,
          comment: timeForm.comment,
          currentUser: users.loggedUser.id,
        });
      } else if (timeForm.timeUnit === "day") {
        await tasks.addWorktime(id, {
          timeInMinutes: timeForm.timeInMinutes * 60 * 24,
          comment: timeForm.comment,
          currentUser: users.loggedUser.id,
        });
      }
      await api.getComments(id).then((data) => setComments(data));
      onClose();
    }
  }

  // Модальное окно
  if (
    isVisible &&
    pathname === `${AppRoute.USER_LIST}/${id}` &&
    users.loggedUser.id
  ) {
    return (
      <>
        <div className="modal" onClick={onClose}>
          <div className="modal__dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal__header">
              <h3 className="modal__title">Редактирование пользователя</h3>
            </div>
            <div className="modal__body">
              <div className="modal__content">
                <form
                  className="modal__field  field"
                  id="user-edit-form"
                  onSubmit={handleSubmit}
                >
                  <label htmlFor="username" className="label__modal  label">
                    Имя пользователя
                  </label>
                  <textarea
                    typeof="text"
                    onChange={handleFieldChange}
                    className="input__modal  input__title  input"
                    name="username"
                    placeholder=""
                    defaultValue={userForm.username}
                    required
                  ></textarea>
                  <label htmlFor="urlpicture" className="label__modal  label">
                    URL фотографии
                  </label>
                  <input
                    typeof="url"
                    onChange={handleFieldChange}
                    className="input__modal  input__title  input"
                    name="photoUrl"
                    placeholder=""
                    defaultValue={userForm.photoUrl}
                    required
                  ></input>

                  <label htmlFor="status" className="label__modal  label">
                    О себе
                  </label>
                  <textarea
                    typeof="text"
                    onChange={handleFieldChange}
                    className="input__modal-comment  input"
                    name="about"
                    placeholder="Расскажите о себе"
                    defaultValue={userForm.about}
                  ></textarea>
                </form>
              </div>
            </div>
            <div className="modal__footer">
              <div className="modal__footer-buttnos">
                <button
                  typeof="submit"
                  className="btn-board__header  btn-primary  btn"
                  form="user-edit-form"
                >
                  Добавить
                </button>
                <button className="btn-board__header  btn" onClick={onClose}>
                  Отмена
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else if (isVisible && pathname === `${AppRoute.TASK_LIST}/${id}`) {
    return (
      <>
        <div className="modal" onClick={onClose}>
          <div className="modal__dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal__header">
              <h3 className="modal__title">Запись о работе</h3>
            </div>
            <div className="modal__body">
              <div className="modal__content">
                <form
                  className="modal__field  field"
                  id="add-work-time-form"
                  onSubmit={handleSubmit}
                >
                  <label
                    htmlFor="timeInMinutes"
                    className="label__modal  label"
                  >
                    Затраченное время
                  </label>
                  <textarea
                    typeof="text"
                    onChange={handleFieldChange}
                    className="input__modal  input__title  input"
                    name="timeInMinutes"
                    placeholder="Введите количество затраченного времени"
                    defaultValue={timeForm.timeInMinutes}
                    required
                  ></textarea>

                  <label htmlFor="timeUnit" className="label__modal  label">
                    Единица измерения
                  </label>
                  <select
                    className="modal__select  select"
                    onChange={handleFieldChange}
                    name="timeUnit"
                    defaultValue={timeForm.timeUnit}
                  >
                    <option value="minute" defaultChecked>
                      Минуты
                    </option>
                    <option value="hour">Часы</option>
                    <option value="day">Дни</option>
                  </select>

                  <label htmlFor="status" className="label__modal  label">
                    Комментарий
                  </label>
                  <textarea
                    typeof="text"
                    onChange={handleFieldChange}
                    className="input__modal-comment  input"
                    name="comment"
                    placeholder="Добавьте комментарий"
                    defaultValue={timeForm.comment}
                  ></textarea>
                </form>
              </div>
            </div>
            <div className="modal__footer">
              <div className="modal__footer-buttnos">
                <button
                  form="add-work-time-form"
                  className="btn-board__header  btn-primary  btn"
                >
                  Добавить
                </button>
                <button className="btn-board__header  btn" onClick={onClose}>
                  Отмена
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
});

export default Modal;
