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

  const handleChangeStatus = action((
    // e
    ) => {
    // e.preventDefault();
    // if (e.target.value === "inProgress") {
    //   if (startStatus === "opened") {
    //     setStatus(id, e.target.value);
    //   }
    // } else if (e.target.value === `testing`) {
    //   if (startStatus === "inProgress") {
    //     setStatus(id, e.target.value);
    //   }
    // } else if (e.target.value === `opened`) {
    //   if (
    //     startStatus === "inProgress" ||
    //     startStatus === "testing" ||
    //     startStatus === "complete"
    //   ) {
    //     setStatus(id, e.target.value);
    //   }
    // } else if (e.target.value === `complete`) {
    //   if (
    //     startStatus === "opened" ||
    //     startStatus === "inProgress" ||
    //     startStatus === "testing"
    //   ) {
    //     setStatus(id, e.target.value);
    //   }
    // }
  });

  const inProgressBtn = () => {
    if (startStatus === "opened") {
      return (
        <>
          <button
            className="btn-board__header  btn"
            onClick={handleChangeStatus}
            value="inProgress"
          >
            Взять в работу
          </button>
        </>
      );
    }
  };

  const testingBttn = () => {
    if (startStatus === "inProgress") {
      return (
        <>
          <button
            className="btn-board__header  btn"
            onClick={handleChangeStatus}
            value="testing"
          >
            На тестирование
          </button>
        </>
      );
    }
  };

  const completeBtn = () => {
    if (
      startStatus === "opened" ||
      startStatus === "testing" ||
      startStatus === "inProgress"
    ) {
      return (
        <>
          <button
            className="btn-board__header  btn"
            onClick={handleChangeStatus}
            value="complete"
          >
            Сделано
          </button>
        </>
      );
    }
  };

  const openedBtn = () => {
    if (
      startStatus === "complete" ||
      startStatus === "inProgress" ||
      startStatus === "testing"
    ) {
      return (
        <>
          <button
            className="btn-board__header  btn"
            onClick={handleChangeStatus}
            value="opened"
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
