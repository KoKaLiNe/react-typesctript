import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import UserItem from "../userItem/userItem";
import Pagination from "../pagination/pagination";
import { ITaskData, IUserData } from "../../store/interfaces";

interface IProps {
  tasks: ITaskData[];
  users: IUserData[];
}

const UsersList = observer((props: IProps): JSX.Element => {
  const { users } = props;
  const [page, setPage] = useState<number>(1);
  const total = users.length;
  const itemsPerPage = 10;
  const handleChangeCounter = (value: number): void => {
    setPage(value);
  };
  
  return (
    <>
      <section className="board">
        <div className="board__header">
          <h2 className="board__header-title  user-title">Пользователи</h2>
        </div>

        <section className="board__content">
          <div className="board__list">
            {users
              .slice(
                (page - 1) * itemsPerPage,
                (page - 1) * itemsPerPage + itemsPerPage
              )
              .map((user) => (
                <UserItem user={user} key={user.id} />
              ))}
          </div>
          <Pagination
            page={page}
            itemsPerPage={itemsPerPage}
            total={total}
            onChangePage={handleChangeCounter}
          />
        </section>
      </section>
    </>
  );
});

export default UsersList;
