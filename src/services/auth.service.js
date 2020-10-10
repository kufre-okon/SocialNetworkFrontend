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

const getLoginToken = () => {
    let token = Storage.getItem('logintoken');
    return token;
}

const setLoginToken = (token) => {
    Storage.setItem('logintoken', token);
}

const setCurrentUser = (user) => {
    Storage.setItem('currentuser', user);
}

const signOut = () => {
    Storage.removeItem('currentuser');
    Storage.removeItem('logintoken');
}

const isAuthenticated = () => {
    let token = getLoginToken();
    return !!token;
}

const forgotPassword = (email) => {
    return http.post('/auth/forgotpassword', { email });
}

const resetpassword = (resetPasswordToken, newPassword) => {
    return http.post('/auth/resetpassword', { resetPasswordToken, newPassword });
}

const changePassword = (userId, oldPassword, newPassword) => {
    return http.post('/auth/changepassword', { userId, oldPassword, newPassword });
}

const socialLogin = (user) => {
    return http.post('/auth/sociallogin', user);
}

export default {
    signIn,
    getCurrentUser,
    signOut,
    isAuthenticated,
    setCurrentUser,
    setLoginToken,
    getLoginToken,
    signUp,
    forgotPassword,
    resetpassword,
    changePassword,
    socialLogin
}
