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
import PostEditor from '../components/post/PostEditor/PostEditor';
import SinglePost from '../components/post/SinglePost/SinglePost';
import EditProfile from '../components/user/EditProfile/EditProfile';
import UserList from '../components/user/UserList/UserList';
import Profile from '../components/user/Profile/Profile';
import ChangePassword from '../components/user/ChangePassword/changepassword';

const MainRouter = () => {
    return (
        <div className="flyout">
            <Menu />
            <main>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <PrivateRoute exact path="/admin" component={Admin} />
                    <Route exact path="/forgotpassword" component={ForgotPassword} />
                    <Route exact path="/resetpassword/:resetPasswordToken" component={ResetPassword} />
                    <PrivateRoute exact path="/post/create" component={PostEditor} />
                    <Route exact path="/post/:postId" component={SinglePost} />
                    <PrivateRoute exact path="/post/edit/:postId" component={PostEditor} />
                    <Route exact path="/users" component={UserList} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/signin" component={Signin} />
                    <PrivateRoute exact path="/user/edit/:userId" component={EditProfile} /> 
                    <PrivateRoute exact path="/user/changepassword" component={ChangePassword} />                   
                    <Route exact path="/user/:userId" component={Profile} />
                </Switch>
            </main>
        </div>
    );
}

export default MainRouter;