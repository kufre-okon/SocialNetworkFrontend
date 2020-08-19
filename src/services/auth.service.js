import http from '../http-common';
import Storage from '../utils/storage.util';

const signIn = (usernameOrEmail, password) => {
    return http.post('/auth/signin', { login: usernameOrEmail, password });
}

const signUp = (form) => {
    return http.post('/auth/signup', form);
}

const getCurrentUser = () => {
    let user = Storage.getItem('currentuser');
    return user;
}
const setCurrentUser = (user) => {
    Storage.setItem('currentuser', user);
}

const signOut = () => {
    Storage.removeItem('currentuser');
}

const isAuthenticated = () => {
    let user = getCurrentUser();
    return !user ? false : user;
}

export default {
    signIn,
    getCurrentUser,
    signOut,
    isAuthenticated,
    setCurrentUser,
    signUp
}
