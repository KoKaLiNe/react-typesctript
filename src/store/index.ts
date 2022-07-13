import { makeAutoObservable } from "mobx";
import { api } from "../api";
import {
  ITaskData,
  IUserData,
  IWorkTime,
  ITasksFilter,
} from "../store/interfaces";
import { AxiosResponse } from "axios";

// ЗАДАЧИ
class TasksStore {
  data: ITaskData[] = [];
  currentUserTasks: ITaskData[] = [];
  mock: ITaskData = {
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
  };
  type = [
    {
      name: "Задача",
      value: "task",
    },
    {
      name: "Ошибка",
      value: "bug",
    },
  ];
  status = [
    {
      name: "Открыто",
      value: "opened",
    },
    {
      name: "В работе",
      value: "inProgress",
    },
    {
      name: "Тестирование",
      value: "testing",
    },
    {
      name: "Сделано",
      value: "complete",
    },
  ];
  rank = [
    {
      name: "Низкий",
      value: "low",
    },
    {
      name: "Средний",
      value: "medium",
    },
    {
      name: "Высокий",
      value: "high",
    },
  ];

  filter: ITasksFilter = {};
  page = 0;
  limit = 0;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  *fetch() {
    const response: AxiosResponse = yield api.getTasks(
      this.filter,
      this.page,
      this.limit
    );
    this.data = response.data.data;
    this.currentUserTasks = response.data.data;
  }

  *addTask(data: ITaskData) {
    yield api.addTask(data);
    yield this.fetch();
  }

  *deleteTask(taskId: string) {
    yield api.deleteTask(taskId);
    yield this.fetch();
  }

  *editStatus(taskId: string, status: string) {
    yield api.editStatus(taskId, status);
    yield this.fetch();
  }

  *addWorktime(taskId: string, data: IWorkTime) {
    yield api.addWorktime(taskId, data);
    yield this.fetch();
  }
}

export const tasks = new TasksStore();

// ПОЛЬЗОВАТЕЛИ
class UsersStore {
  data: IUserData[] = [];
  mock: IUserData = {
    id: "6273dca5d09b551dca87629c",
    login: "загружаем...",
    password: "загружаем...",
    username: "загружаем...",
    about: "загружаем...",
    photoUrl: "",
  };

  loggedUser: IUserData = {};
  error: string = null;
  password: string = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  *fetch() {
    const response: AxiosResponse = yield api.getUsers();
    this.data = response.data;
  }

  *editUser(data: IUserData) {
    yield api.editUser(data);
    yield this.fetch();
  }

  *fetchLoggedUser(id: string) {
    const response: AxiosResponse = yield api.getLoggedUser(id);
    this.loggedUser = response.data;
  }
}

export const users = new UsersStore();
