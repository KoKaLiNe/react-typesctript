import { observer } from "mobx-react-lite";
import React from "react";
import Header from "../../components/header/header";
import LoginForm from "../../components/loginForm/loginForm";

const Login = observer((): JSX.Element => {
  return (
    <>
      <Header />
      <section className="main__wrapper">
        <LoginForm />
      </section>
    </>
  );
});

export default Login;
