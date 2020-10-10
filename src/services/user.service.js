import http from '../http-common';

const getUser = (userId) => {
    return http.get(`/users/${userId}`);
}

const getAllUsers = (page, pageSize) => {
    return http.get(`/users?page=${page}&pageSize=${pageSize}`);
}

const update = (id, formData) => {
    return http.put(`/users/${id}`, formData);
}

const follow = (userId, followId) => {
    return http.put(`/users/${userId}/follow`, { userId, followId });
}

const unfollow = (userId, unfollowId) => {
    return http.put(`/users/${userId}/unfollow`, { userId, unfollowId });
}

const getAvatar = (userId) => {
    return http.get(`/${userId}/avatar`);
}

export default {
    getUser,
    getAllUsers,
    update,
    follow,
    unfollow,
    getAvatar
}
