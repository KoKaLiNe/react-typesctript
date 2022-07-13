import axios from "axios";
import {
  ITaskData,
  ITasksFilter,
  IWorkTime,
  IComment,
} from "../src/store/interfaces";

const inst = axios.create({
  baseURL: "http://93.95.97.34/api",
});

export const api = {
  // Задачи
  getTasks: async (filter: ITasksFilter, page: number, limit: number) => {
    const response = await inst.post("/tasks", {
      filter: filter,
      page: page,
      limit: limit,
    });
    return response;
  },

  addTask: async (data: ITaskData) => {
    await inst.put("/tasks/createOrEdit", {
      ...data,
      dateOfUpdate: new Date(),
      timeInMinutes: 0,
    });
  },

  deleteTask: async (taskId: string) => {
    await inst.delete(`/tasks/${taskId}`);
  },

  editStatus: async (taskId: string, status: string) => {
    await inst.patch(`/tasks/${taskId}/status/${status}`);
  },

  addWorktime: async (taskId: string, data: IWorkTime) => {
    await inst.patch(`/tasks/${taskId}/worktime`, data);
  },

  // Комментарии
  getComments: async (taskId: string) => {
    const response = await inst.get(`/comments/${taskId}`);
    return response.data;
  },

  addComments: async (data: IComment) => {
    await inst.put(`/comments/createOrEdit`, data);
  },

  deleteComment: async (commentId: string) => {
    return await inst.delete(`/comments/${commentId}`);
  },

  // Пользователи
  getUsers: async () => {
    const response = await inst.get(`/users/all`);
    return response;
  },

  editUser: async (data: ITaskData) => {
    await inst.put("/users/edit", {
      ...data,
    });
  },

  loginIn: async (login: string, password: string) => {
    const response = await inst.post(`/users/login`, {
      login: `${login}`,
      password: `${password}`,
    });
    return response;
  },

  getLoggedUser: async (id: string) => {
    const response = await inst.get(`/users/${id}`);
    return response;
  },
};
