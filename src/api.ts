import axios from 'axios'


const inst = axios.create({
    baseURL: 'http://93.95.97.34/api'
})

export const api = {

    // Задачи
    getTasks: async (filter, page, limit) => {
        const response = await inst.post('/tasks', {
            filter: filter,
            page: page,
            limit: limit
        })
        return response;
    },

    addTask: async (data) => {
        await inst.put('/tasks/createOrEdit', {
            ...data,
            dateOfUpdate: new Date(),
            timeInMinutes: 0,
        })
    },

    deleteTask: async (taskId) => {
        await inst.delete(`/tasks/${taskId}`)
    },

    editStatus: async (taskId, status) => {
        await inst.patch(`/tasks/${taskId}/status/${status}`)
    },

    addWorktime: async (taskId, data) => {
        await inst.patch(`/tasks/${taskId}/worktime`, data)
    },

    // Комментарии
    getComments: async (taskId) => {
        const response = await inst.get(`/comments/${taskId}`)
        return response.data;
    },

    addComments: async (data) => {
        await inst.put(`/comments/createOrEdit`, data)
    },

    deleteComment: async (commentId) => {
        return await inst.delete(`/comments/${commentId}`)
    },

    // Пользователи
    getUsers: async () => {
        const response = await inst.get(`/users/all`)
        return response;
    },

    editUser: async (data) => {
        await inst.put('/users/edit', {
            ...data,
        })
    },

    loginIn: async (login, password) => {
            const response = await inst.post(`/users/login`, { "login": `${login}`, "password": `${password}` })
            return response;
    },

    getLoggedUser: async (id) => {
        const response = await inst.get(`/users/${id}`)
        return response;
    }
}