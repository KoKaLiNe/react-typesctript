import { action, runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { AppRoute } from "../../const";
import { users } from "../../store";
import { api } from "../../api";


const LoginForm = observer(() => {

    const [form, setForm] = useState([])

    const [checkLogin, secheckLogin] = useState(false)

    const handleFieldChange = action((e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    })

    const handleSubmit = action((e) => {
        e.preventDefault();

        api.loginIn(form.login, form.password)
            .then((data) => {
                runInAction(() => {
                    localStorage.setItem("loggedUserInfo", JSON.stringify(data.data))
                    localStorage.setItem("userPassword", JSON.stringify(form.password))
                    if (data) {
                        window.location.href = `${AppRoute.TASK_LIST}`;
                    }
                })
            })
            .catch((error) => {
                runInAction(() => {
                    users.error = error.response.data.message
                    if (error) {
                        secheckLogin(users.error)
                    }
                })
            })
    })

    return (
        <>
            <form className="main__login-from">
                <div className="main__login-wrap">
                    <h2 className="main__login-title">Авторизация</h2>
                    <fieldset className="main__login-field">
                        <label htmlFor="login" className="main__login-label  label">
                            Логин
                        </label>
                        <input
                            type="email"
                            className="input"
                            onChange={handleFieldChange}
                            placeholder="Введите ваш логин"
                            name="login"
                            required
                        />
                        <label htmlFor="password" className="main__login-label  label">
                            Пароль
                        </label>
                        <input
                            type="password"
                            className="input"
                            onChange={handleFieldChange}
                            placeholder="********"
                            name="password"
                            required
                        />
                    </fieldset>

                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="btn-submit  btn-success  btn"
                    >Вход
                    </button>
                </div>
                <p className="main__login-error">
                    {checkLogin}
                </p>
            </form>
        </>
    )
})

export default LoginForm;