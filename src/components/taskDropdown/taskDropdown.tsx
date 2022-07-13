import { action } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { tasks } from "../../store";
import { IStatus } from "../../store/interfaces";

interface IProps {
  startStatus: IStatus;
  id: string;
  onChangeStatus: (newStatus: IStatus) => void;
}

const TaskDropdown = observer((props: IProps) => {
  const { startStatus, onChangeStatus, id } = props;

  const setStatus = (id: string, value: IStatus) => {
    onChangeStatus(value);
    tasks.editStatus(id, value);
  };

  const handleChangeStatus = action((value: string) => {
    if (value === "inProgress") {
      if (startStatus === "opened") {
        setStatus(id, value);
      }
    } else if (value === `testing`) {
      if (startStatus === "inProgress") {
        setStatus(id, value);
      }
    } else if (value === `opened`) {
      if (
        startStatus === "inProgress" ||
        startStatus === "testing" ||
        startStatus === "complete"
      ) {
        setStatus(id, value);
      }
    } else if (value === `complete`) {
      if (
        startStatus === "opened" ||
        startStatus === "inProgress" ||
        startStatus === "testing"
      ) {
        setStatus(id, value);
      }
    }
  });

  const inProgressBtn = () => {
    if (startStatus === "opened") {
      const value = "inProgress";
      return (
        <>
          <button
            className="dropdown-link"
            onClick={() => handleChangeStatus(value)}
          >
            Взять в работу
          </button>
        </>
      );
    }
  };

  const testingBttn = () => {
    const value = "testing";
    if (startStatus === "inProgress") {
      return (
        <>
          <button
            className="dropdown-link"
            onClick={() => handleChangeStatus(value)}
          >
            На тестирование
          </button>
        </>
      );
    }
  };

  const completeBtn = () => {
    const value = "complete";
    if (
      startStatus === "opened" ||
      startStatus === "testing" ||
      startStatus === "inProgress"
    ) {
      return (
        <>
          <button
            className="dropdown-link"
            onClick={() => handleChangeStatus(value)}
          >
            Сделано
          </button>
        </>
      );
    }
  };

  const openedBtn = () => {
    const value = "opened";
    if (
      startStatus === "complete" ||
      startStatus === "inProgress" ||
      startStatus === "testing"
    ) {
      return (
        <>
          <button
            className="dropdown-link"
            onClick={() => handleChangeStatus(value)}
          >
            Переоткрыть
          </button>
        </>
      );
    }
  };

  const handleDelete = action(() => {
    tasks.deleteTask(id);
    tasks.fetch();
  });

  return (
    <div className="board__task-menu  dropdown">
      <div className="dropdown-btn">
        <svg
          width="10"
          height="12"
          viewBox="0 0 10 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 1C0 0.447715 0.447715 0 1 0H9C9.55228 0 10 0.447715 10 1C10 1.55228 9.55228 2 9 2H1C0.447716 2 0 1.55228 0 1Z"
            fill="currentColor"
          />
          <path
            d="M0 6C0 5.44772 0.447715 5 1 5H9C9.55228 5 10 5.44772 10 6C10 6.55228 9.55228 7 9 7H1C0.447716 7 0 6.55228 0 6Z"
            fill="currentColor"
          />
          <path
            d="M0 11C0 10.4477 0.447715 10 1 10H9C9.55228 10 10 10.4477 10 11C10 11.5523 9.55228 12 9 12H1C0.447716 12 0 11.5523 0 11Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <div className="dropdown-content">
        <button className="dropdown-link">
          <Link to={`/edit/${id}`}>Редактировать</Link>
        </button>
        <button
          type="button"
          className="dropdown-link  accent"
          onClick={() => {
            handleDelete();
          }}
        >
          Удалить
        </button>
        {inProgressBtn()}
        {testingBttn()}
        {completeBtn()}
        {openedBtn()}
      </div>
    </div>
  );
});

export default TaskDropdown;
