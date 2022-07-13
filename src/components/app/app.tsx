import React, { useEffect } from "react";
import "../../scss/App.scss";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { AppRoute } from "../../const";
import { observer } from "mobx-react-lite";
import Login from "../../pages/login/login";
import Main from "../../pages/main/main";
import Users from "../../pages/users/users";
import Edit from "../../pages/edit/edit";
import Error404 from "../../pages/error404/error404";
import { tasks, users } from "../../store/index";

const App = observer((): JSX.Element => {
  useEffect(() => {
    tasks.fetch();
    users.fetch();
  }, []);

  if (tasks.data.length === 0 && users.data.length === 0) {
    return (
      <>
        <section className="main__header">
          <img src="../../img/logo.svg" alt="логотип" />
          <section className="main__header-wrap">
            <div className="main__header-group-link">
              <div className="main__user-profile  dropdown">
                <div className="main__user-img-wrapper  "></div>
              </div>
            </div>
          </section>
        </section>
        <section className="main__wrapper">
          <div className="main__error">
            <img
              src="../../img/icons/load-spinner.gif"
              alt=""
              width="64"
              height="64"
            />
          </div>
        </section>
      </>
    );
  } else {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Redirect to={AppRoute.LOGIN} />
          </Route>
          <Route path={AppRoute.LOGIN} exact>
            <Login />
          </Route>
          <Route path={AppRoute.TASK} exact>
            <Main />
          </Route>
          <Route path={AppRoute.EDIT} exact>
            <Edit />
          </Route>
          <Route path={AppRoute.ADD_TASK_TO_USER} exact>
            <Edit />
          </Route>
          <Route path={AppRoute.USER} exact>
            <Users />
          </Route>
          <Route component={Error404}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
});

export default App;
