import { makeAutoObservable } from 'mobx';
import { api } from '../api' //AXIOS


// ЗАДАЧИ
class TasksStore {
    data = [];
    currentUserTasks = [];
    mock = [
        {
            id: "...",
            userId: "...",
            assignedId: "(не указн)",
            username: "(не указн)",
            title: "загружаем...",
            description: "загружаем...",
            type: "task",
            dateOfCreation: new Date(),
            dateOfUpdate: new Date(),
            timeInMinutes: 0,
            status: "opened",
            rank: "low",
        }
    ]
    type = [
        {
            name: "Задача",
            value: "task"
        },
        {
            name: "Ошибка",
            value: "bug"
        }
    ];
    status = [
        {
            name: "Открыто",
            value: "opened"
        },
        {
            name: "В работе",
            value: "inProgress"
        },
        {
            name: "Тестирование",
            value: "testing"
        },
        {
            name: "Сделано",
            value: "complete"
        },
    ]
    rank = [
        {
            name: "Низкий",
            value: "low"
        },
        {
            name: "Средний",
            value: "medium"
        },
        {
            name: "Высокий",
            value: "high"
        },
    ]

    filter = {};
    page = 0;
    limit = 0;

    constructor() {
        makeAutoObservable(this, {}, {
            autoBind: true,
        });
    }

    *fetch() {
        const response = yield api.getTasks(this.filter, this.page, this.limit);
        this.data = response.data.data;
        this.currentUserTasks = response.data.data;
    }

    *addTask(data) {
        yield api.addTask(data)
        yield this.fetch();
    }

    *deleteTask(data) {
        yield api.deleteTask(data)
        yield this.fetch();
    }

    *editStatus(taskId, status) {
        yield api.editStatus(taskId, status)
        yield this.fetch();
    }

    *addWorktime(taskId, data) {
        yield api.addWorktime(taskId, data)
        yield this.fetch();
    }
}

export const tasks = new TasksStore();


// ПОЛЬЗОВАТЕЛИ
class UsersStore {
    data = [];
    mock = [
        {
            id: "6273dca5d09b551dca87629c",
            login: "загружаем...",
            password: "загружаем...",
            username: "загружаем...",
            about: "загружаем...",
            photoUrl: ""
        }
    ];

    loggedUser = [];
    error = null;
    password = null;

    constructor() {
        makeAutoObservable(this, {}, {
            autoBind: true,
        });
    }

    *fetch() {
        const response = yield api.getUsers();
        this.data = response.data;
    }

    *editUser(data) {
        yield api.editUser(data)
        yield this.fetch();
    }

    *fetchLoggedUser(id) {
        const response = yield api.getLoggedUser(id);
        this.loggedUser = response.data;
    }
}

export const users = new UsersStore();