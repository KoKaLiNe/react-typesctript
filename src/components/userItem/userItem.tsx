import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { AppRoute } from "../../const";
import { IUserData } from "../../store/interfaces";

interface IProps {
  user: IUserData;
}

const UserItem = observer((props: IProps): JSX.Element => {
  const { user } = props;
  const { id, username } = user;
  return (
    <>
      <div className="board__item">
        <div className="user__name">
          <Link to={`${AppRoute.USER_LIST}/${id}`}> {username} </Link>
        </div>
      </div>
    </>
  );
});

export default UserItem;
