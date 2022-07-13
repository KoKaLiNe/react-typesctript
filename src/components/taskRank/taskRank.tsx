import { observer } from "mobx-react-lite";
import React from "react";
import { IRank } from "../../store/interfaces";

interface IProps {
  rank: IRank;
}

const TaskRank = observer((props: IProps): JSX.Element => {
  const { rank } = props;
  if (rank === "low") {
    return (
      <div className="task-prioirity  low">
        <svg
          width="14"
          height="8"
          viewBox="0 0 14 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 8L14 0L7 4L0 0L7 8Z" fill="currentColor" />
        </svg>
        <p>Низкий</p>
      </div>
    );
  } else if (rank === "medium") {
    return (
      <div className="task-prioirity  mid">
        <svg
          width="14"
          height="6"
          viewBox="0 0 14 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 0L0 3L7 6L14 3L7 0Z" fill="currentColor" />
        </svg>
        <p>Средний</p>
      </div>
    );
  } else if (rank === "high") {
    return (
      <div className="task-prioirity  high">
        <svg
          width="14"
          height="8"
          viewBox="0 0 14 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 0L0 8L7 4L14 8L7 0Z" fill="currentColor" />
        </svg>
        <p>Высокий</p>
      </div>
    );
  }
});

export default TaskRank;
