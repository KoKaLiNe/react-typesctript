import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { tasks, users } from "../../store";
import { action } from "mobx";


const EditForm = observer(({ currentTask, currentUser }) => {

    const { id } = useParams();
    const { userid } = useParams();

    const editFormHeader = () => {
        return id ? "Редактирование" : "Создание";
    }

    const [form, setForm] = useState({
        userId: (id && currentTask.userId) || users.loggedUser.id,
        assignedId: (id && currentTask.assignedId) || userid || users.data[0].id,
        title: (id && currentTask.title) || '',
        description: (id && currentTask.description) || '',
        type: (id && currentTask.type) || 'task',
        dateOfCreation: (id && currentTask.dateOfCreation) || new Date(),
        timeInMinutes: (id && currentTask.timeInMinutes) || '0',
        dateOfUpdate: new Date(),
        status: (id && currentTask.status) || "opened",
        rank: (id && currentTask.rank) || 'low',
    })

    const handleFieldChange = action((e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
        console.log(form.title.length)

    })

    const [titleValid, setTitleValid] = useState("")
    const [descriptionValid, setDescriptionValid] = useState("")

    useEffect(() => {
        if (form.title.length === 0) {
            setTitleValid("*")
        } else if (form.title.length > 0) {
            setTitleValid("")
        }
        if (form.description.length === 0) {
            setDescriptionValid("*")
        } else if (form.description.length > 0) {
            setDescriptionValid("")
        }
    }, [form.title, form.description])

    const hist = useHistory();

    const handleSubmit = action((e) => {
        e.preventDefault();
        if (titleValid === "" && descriptionValid === "") {
            tasks.addTask({
                id,
                userId: form.userId,
                assignedId: form.assignedId,
                title: form.title,
                description: form.description,
                type: form.type,
                dateOfCreation: form.dateOfCreation,
                dateOfUpdate: form.dateOfUpdate,
                timeInMinutes: form.timeInMinutes,
                status: form.status,
                rank: form.rank,
            })
            hist.goBack();
        }
    })

    return (
        <>
            <div className="board__header">
                <h2 className="board__header-title  user-title">{editFormHeader()}</h2>
                <div className="board__header-btns">
                    <button
                        className="btn-board__header  btn-primary  btn"
                        form="add-task-form"
                        onClick={handleSubmit}
                    >Сохранить
                    </button>
                    <button
                        className="btn-board__header  btn-default  btn"
                        onClick={() => { hist.goBack() }}
                    >Отмена
                    </button>
                </div>
            </div>

            <section className="board__content">

                <div className="card__wrap">
                    <div className="card__col  col-1">

                        <form
                            method="post"
                            className="card__field  field"
                        >
                            <label
                                htmlFor="assignedUser"
                                className="card__label  label"
                            >Исполнитель
                            </label>
                            <select
                                className="card__select  select"
                                onChange={handleFieldChange}
                                name="assignedId"
                                defaultValue={form.assignedId}
                            >{users.data.map((user) =>
                                <option
                                    name="assignedId"
                                    value={user.id}
                                    key={user.id}
                                > {user.username} </option>
                            )}
                            </select>

                            <label
                                htmlFor="type"
                                className="card__label  label"
                            >Тип запроса
                            </label>
                            <select
                                className="card__select  select"
                                onChange={handleFieldChange}
                                defaultValue={form.type}
                                name="type">
                                <option
                                    value="task"
                                >Задача</option>
                                <option
                                    value="bug"
                                >Ошибка</option>
                            </select>

                            <label
                                htmlFor="status"
                                className="card__label  label"
                            >Приоритет
                            </label>
                            <select
                                className="card__select  select"
                                onChange={handleFieldChange}
                                defaultValue={form.rank}
                                name="rank">
                                <option
                                    value="low"
                                >Низкий</option>
                                <option
                                    value="medium"
                                >Средний</option>
                                <option
                                    value="high"
                                >Высокий</option>
                            </select>
                        </form>
                    </div>

                    <div className="card__col  col-2  create">
                        <form
                            className="card__field  field"
                            id="add-task-form"
                        >
                            <label
                                htmlFor="title"
                                className="card__label  label"
                            >Название
                            </label>
                            <textarea
                                typeof="text"
                                onChange={handleFieldChange}
                                className="input__title  input"
                                name="title"
                                placeholder="Введите название задачи"
                                defaultValue={form.title}
                                maxLength="124"
                                spellCheck
                                required
                            ></textarea>

                            <label
                                htmlFor=""
                                className="card__label  label"
                            >Описание
                            </label>
                            <textarea
                                typeof="text"
                                onChange={handleFieldChange}
                                className="input__card-description  input"
                                name="description"
                                placeholder="Введите описание задачи"
                                defaultValue={form.description}
                                spellCheck
                                required
                            ></textarea>
                        </form>

                    </div>
                    <div className="card__col  col-3">
                        <p className="card error"> {titleValid} </p>
                        <p className="card error"> {descriptionValid} </p>
                    </div>

                </div>
            </section>
        </>
    )

})

export default EditForm;