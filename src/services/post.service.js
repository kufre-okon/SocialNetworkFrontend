import http from '../http-common';

const create = (post) => {
    return http.post('/posts', post);
}

const update = (id, post) => {
    return http.put(`/posts/${id}`, post);
}

const getById = (id) => {
    return http.get(`/posts/${id}`);
}

const remove = (id) => {
    return http.delete(`/posts/${id}`);
}

const search = (page, pageSize, postedBy) => {
    return http.get(`/posts?page=${page}&pageSize=${pageSize}&postedBy=${postedBy || ''}`);
}

const getPhoto = (postId) => {
    return http.get(`/posts/${postId}/photo`);
}

const getPhotoUrl = (postId) => {
    return `${process.env.REACT_APP_BASE_API_URL}/posts/${postId}/photo`;
}

const like = (userId, postId) => {
    return http.put(`${process.env.REACT_APP_BASE_API_URL}/posts/${postId}/like`, { userId, postId });
}
const unlike = (userId, postId) => {
    return http.put(`${process.env.REACT_APP_BASE_API_URL}/posts/${postId}/unlike`, { userId, postId });
}

const comment = (userId, postId, text) => {
    return http.put(`${process.env.REACT_APP_BASE_API_URL}/posts/${postId}/comment`, { userId, postId, text });
}
const uncomment = (commentId, postId) => {
    return http.put(`${process.env.REACT_APP_BASE_API_URL}/posts/${postId}/uncomment`, { postId, commentId });
}


export default {
    create,
    update,
    getById,
    remove,
    search,
    getPhoto,
    getPhotoUrl,
    like,
    unlike,
    comment,
    uncomment
}