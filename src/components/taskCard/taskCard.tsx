import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import Modal from "../modal/modal";
import { observer } from "mobx-react-lite";
import { tasks, users } from "../../store";
import { action } from "mobx";
import { api } from "../../api";
import {
  ITaskData,
  IUserData,
  ParamsTypes,
  IComment,
} from "../../store/interfaces";

const TaskCard = observer((): JSX.Element => {
  const [loggedUser, setLoggedUser] = useState<IUserData>(null);

  if (loggedUser === null && localStorage.length > 0) {
    setLoggedUser(JSON.parse(localStorage.getItem("loggedUserInfo")));
  }
  const { id } = useParams<ParamsTypes>();

  let currentTask: ITaskData;

  if (tasks.data.find((x) => x.id === id) === undefined) {
    currentTask = tasks.mock;
  } else {
    currentTask = tasks.data.find((x) => x.id === id);
  }

  let userAssigned: string;
  if (users.data.find((x) => x.id === currentTask.assignedId) === undefined) {
    userAssigned = users.mock.username;
  } else {
    userAssigned = users.data.find(
      (x) => x.id === currentTask.assignedId
    ).username;
  }

  let userAuthor;
  if (users.data.find((x) => x.id === currentTask.userId) === undefined) {
    userAuthor = users.mock.username;
  } else {
    userAuthor = users.data.find((x) => x.id === currentTask.userId).username;
  }

  const taskType = () => {
    if (
      currentTask === "null" ||
      currentTask === undefined ||
      currentTask.type === "task"
    ) {
      return "Задача";
    } else {
      return "Ошибка";
    }
  };

  const taskRank = () => {
    if (
      currentTask === "null" ||
      currentTask === undefined ||
      currentTask.rank === "low"
    ) {
      return "Низкий";
    } else if (currentTask.rank === "medium") {
      return "Средний";
    }
    if (currentTask.rank === "high") {
      return "Высокий";
    }
  };

  const dateOfCreation = () => {
    if (currentTask === "null" || currentTask === undefined) {
      return "...";
    } else {
      return moment(currentTask.dateOfCreation).format("DD.MM.YYYY HH:MM");
    }
  };

  const dateOfUpdate = () => {
    if (currentTask === "null" || currentTask === undefined) {
      return "...";
    } else {
      return moment(currentTask.dateOfUpdate).format("DD.MM.YYYY HH:MM");
    }
  };

  const taskTime = () => {
    if (currentTask === "null" || currentTask === undefined) {
      return 0;
    } else {
      let min: number = +currentTask.timeInMinutes;
      let hour: number = min / 60;
      let decCache: number[] = [],
        decCases = [2, 0, 1, 1, 1, 2];

      const decOfNum = (number: number, titles: string[]): string => {
        if (!decCache[number])
          decCache[number] =
            number % 100 > 4 && number % 100 < 20
              ? 2
              : decCases[Math.min(number % 10, 5)];
        return titles[decCache[number]];
      };

      let fullTime =
        Math.floor(hour / 24) +
        " " +
        decOfNum(Math.floor(hour / 24), ["день", "дня", "дней"]) +
        " " +
        Math.floor(hour % 24) +
        " " +
        decOfNum(Math.floor(hour % 24), ["час", "часа", "часов"]) +
        " " +
        Math.floor(min % 60) +
        " " +
        decOfNum(Math.floor(min % 60), ["минута", "минуты", "минут"]);
      return fullTime;
    }
  };

  const description = () => {
    if (currentTask === "null" || currentTask === undefined) {
      return "...";
    } else {
      return currentTask.description;
    }
  };

  const [isModal, setModal] = useState(false);

  const [commentForm, setCommentForm] = useState<IComment>({
    taskId: id,
    userId: JSON.parse(localStorage.getItem("loggedUserInfo")).id,
    text: "",
    dateOfCreation: new Date(),
    dateOfUpdate: new Date(),
  });
  const handleFieldChange = action(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setCommentForm({ ...commentForm, [name]: value });
    }
  );

  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    await api.addComments({
      taskId: commentForm.taskId,
      userId: commentForm.userId,
      text: commentForm.text,
      dateOfCreation: commentForm.dateOfCreation,
      dateOfUpdate: commentForm.dateOfUpdate,
    });
    await api
      .getComments(id)
      .then((data) => setComments(data))
      .then(() =>
        setCommentForm({
          taskId: id,
          userId: JSON.parse(localStorage.getItem("loggedUserInfo")).id,
          text: "",
          dateOfCreation: new Date(),
          dateOfUpdate: new Date(),
        })
      );
  }

  const [comments, setComments] = useState<IComment[]>([]);

  const handleSetComment = (value: IComment[]): void => {
    setComments(value);
  };

  useEffect(() => {
    api.getComments(id).then((data) => setComments(data));
  }, [id]);

  async function handelDeletComment(commentId: string) {
    await api.deleteComment(commentId);
    await api.getComments(id).then((data) => setComments(data));
  }

  return (
    <>
      <div className="card__wrap">
        <div className="card__col  col-1">
          <p className="card__title">Исполнитель</p>
          <p className="card__text">{userAssigned}</p>

          <p className="card__title">Автор задачи</p>
          <p className="card__text">{userAuthor}</p>

          <p className="card__title">Тип запроса</p>
          <p className="card__text">{taskType()}</p>

          <p className="card__title">Приоритет</p>
          <p className="card__text">{taskRank()}</p>

          <p className="card__title">Дата создания</p>
          <p className="card__text">{dateOfCreation()}</p>

          <p className="card__title">Дата изменения</p>
          <p className="card__text">{dateOfUpdate()}</p>

          <p className="card__title">Затрачено времени</p>
          <p className="card__text">{taskTime()}</p>

          <button className="btn-primary  btn" onClick={() => setModal(true)}>
            Сделать запись о работе
          </button>
        </div>

        <div className="card__col  col-2">
          <p className="card__title">Описание</p>
          <p className="card__decription">{description()}</p>
        </div>

        <div className="card__col  col-3">
          <form className="card__form" method="post" onSubmit={handleSubmit}>
            <label htmlFor="comment" className="card__title  label">
              Комментарии ({comments.length})
            </label>
            <textarea
              onChange={handleFieldChange}
              className="input__comment  input"
              id="text"
              name="text"
              placeholder="Текст комментария"
              required
              value={commentForm.text}
            ></textarea>
            <button className="btn-success  btn" type="submit">
              Добавить комментарий
            </button>
          </form>

          <div className="card__comments">
            {comments.map((comment) => {
              return (
                <div className="card__comment  comment" key={comment.id}>
                  <div className="comment__title">
                    <p className="comment__user-name">
                      {(users.data.find((x) => x.id === comment.userId) !==
                        undefined &&
                        users.data.find((x) => x.id === comment.userId)
                          .username) ||
                        "не указан"}
                      ({moment(comment.dateOfUpdate).format("DD.MM.YYYY HH:MM")}
                      )
                    </p>
                    {loggedUser.id === comment.userId && (
                      <button
                        onClick={() => handelDeletComment(comment.id)}
                        type="button"
                        className="btn__comment  btn-link  btn  currentUser"
                      >
                        Удалить
                      </button>
                    )}
                  </div>
                  <p className="comment__text">{comment.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Modal
        isVisible={isModal}
        onClose={() => setModal(false)}
        onClickOk={handleSetComment}
      />
    </>
  );
});

export default TaskCard;
