import React from "react";
import Header from "../../components/header/header";
import Board from "../../components/board/board";
import { observer } from "mobx-react-lite";

const Main = observer((): JSX.Element => {
  return (
    <>
      <Header />
      <section className="main__wrapper">
        <Board />
      </section>
    </>
  );
});

export default Main;
