import React from 'react';
import { Route, Switch } from "react-router-dom";
import PrivateRoute from './private-route';
import Menu from '../components/core/menu.component';
import Home from '../components/core/home.component';
import Admin from '../components/admin/Admin';
import ForgotPassword from '../components/auth/ForgotPassword/ForgotPassword';
import ResetPassword from '../components/auth/ResetPassword/ResetPassword';
import Signup from '../components/auth/SignUp/SignUp';
import Signin from '../components/auth/SignIn/SignIn';
import NewPost from '../components/post/NewPost/NewPost';
import SinglePost from '../components/post/SinglePost/SinglePost';
import EditPost from '../components/post/EditPost/EditPost';
import EditProfile from '../components/user/EditProfile/EditProfile';
import UserList from '../components/user/UserList/UserList';
import FindPeople from '../components/user/FindPeople/FindPeople';
import Profile from '../components/user/Profile/Profile';

const MainRouter = () => {
    return (
        <div className="flyout">
            <Menu />
            <main style={{ marginTop: '4rem' }}>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <PrivateRoute exact path="/admin" component={Admin} />
                    <Route exact path="/forgotpassword" component={ForgotPassword} />
                    <Route exact path="/reset-password/:resetPasswordToken" component={ResetPassword} />
                    <PrivateRoute exact path="/post/create" component={NewPost} />
                    <Route exact path="/post/:postId" component={SinglePost} />
                    <PrivateRoute exact path="/post/edit/:postId" component={EditPost} />
                    <Route exact path="/users" component={UserList} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/signin" component={Signin} />
                    <PrivateRoute exact path="/user/edit/:userId" component={EditProfile} />
                    <PrivateRoute exact path="/findpeople" component={FindPeople} />
                    <PrivateRoute exact path="/user/:userId" component={Profile} />
                </Switch>
            </main>
        </div>
    );
}

export default MainRouter;