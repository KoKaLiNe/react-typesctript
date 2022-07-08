import React from "react";
import { useHistory } from "react-router-dom";

const Error404 = () => {
    const hist = useHistory()
    return (
        <>
            <section className="main__header">
                <img src="../../img/logo.svg" alt="логотип" />
                <section className="main__header-wrap">
                    <div className="main__header-group-link">
                    </div>
                    <div className="main__user-profile  dropdown">
                        <div className="main__user-img-wrapper  ">
                        </div>
                        <div className="main__user-list dropdown-content">
                        </div>
                    </div>
                </section>
            </section>

            <section className="main__wrapper">
                <div className='main__error'>
                    <h3 className="main__error-title">Ошибка 404. Страница не найдена</h3>
                    <button
                        onClick={() => {hist.goBack()}}
                        className="btn-default  btn">
                        Назад
                    </button>
                </div>
            </section>
        </>
    )
}

export default Error404;