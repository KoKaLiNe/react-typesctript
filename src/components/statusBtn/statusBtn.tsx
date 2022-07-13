import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { tasks } from "../../store";
import { action } from "mobx";
import { ITaskData, IStatus } from "../../store/interfaces";

interface IProps {
  id: string;
}

const StatusBtn = observer((props: IProps): JSX.Element => {
  const { id } = props;

  let currentTask: ITaskData;

  if (tasks.data.find((x) => x.id === id) === undefined) {
    currentTask = tasks.mock;
  } else {
    currentTask = tasks.data.find((x) => x.id === id);
  }

  const [startStatus, setStartStatus] = useState(currentTask.status);

  useEffect(() => {
    setStartStatus(currentTask.status);
  }, [currentTask.status]);

  const setStatus = (id: string, value: IStatus): void => {
    setStartStatus(value);
    tasks.editStatus(id, value);
  };

  const handleChangeStatus = action((value: string): void => {
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
            className="btn-board__header  btn"
            onClick={() => handleChangeStatus(value)}
          >
            Взять в работу
          </button>
        </>
      );
    }
  };

  const testingBttn = () => {
    if (startStatus === "inProgress") {
      const value = "testing";
      return (
        <>
          <button
            className="btn-board__header  btn"
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
            className="btn-board__header  btn"
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
            className="btn-board__header  btn"
            onClick={() => handleChangeStatus(value)}
          >
            Переоткрыть
          </button>
        </>
      );
    }
  };

  return (
    <>
      {inProgressBtn()}
      {testingBttn()}
      {completeBtn()}
      {openedBtn()}
    </>
  );
});

export default StatusBtn;
