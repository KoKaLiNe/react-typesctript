import { observer } from "mobx-react-lite";
import React from "react";

export interface IProps {
  status: string;
}

const TaskStatus = observer((props: IProps): JSX.Element => {
  const { status } = props;
  if (status === "opened") {
    return (
      <div className="task-status  open">
        <p>Открыто</p>
      </div>
    );
  } else if (status === "inProgress") {
    return <span className="task-status  working">В работе</span>;
  } else if (status === "testing") {
    return <span className="task-status  testing">Тестирование</span>;
  } else if (status === "complete") {
    return <span className="task-status  complite">Сделано</span>;
  }
});

export default TaskStatus;
