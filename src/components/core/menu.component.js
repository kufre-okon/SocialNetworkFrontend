import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import authService from '../../services/auth.service';


const isActive = (history, path) => {
    if (history.location.pathname === path)
        return 'nav-item active';
    else
        return 'nav-item';
}

const Menu = ({ history }) => {

    const logout = () => {
        authService.signOut();
        history.push('/')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand" href="#">Social Network</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbar">
                <ul className="navbar-nav mr-auto">
                    <li className={isActive(history, '/')}>
                        <Link className="nav-link" to="/">
                            Home
                    </Link>
                    </li>
                    <li className={isActive(history, '/users')}>
                        <Link className="nav-link" to="/users">
                            Users
                    </Link>
                    </li>
                    <li className={isActive(history, '/post/create')}>
                        <Link to={`/post/create`} className="nav-link">
                            Create Post
                    </Link>
                    </li>

                    {authService.isAuthenticated() && authService.isAuthenticated().user.role === 'admin' && (
                        <li className={isActive(history, '/admin')}>
                            <Link to={`/admin`} className="nav-link">
                                Admin
                    </Link>
                        </li>
                    )}

                    {authService.isAuthenticated() && (
                        <React.Fragment>
                            <li className={isActive(history, '/findpeople')}>
                                <Link to="/findpeople" className="nav-link">
                                    Find People
                            </Link>
                            </li>
                        </React.Fragment>
                    )}
                </ul>
            </div>
            <form className="form-inline">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                <button type="submit" className="btn btn-outline-light my-2 my-sm-0">Search</button>
            </form>
            <form className="form-inline ml-5">
                {authService.isAuthenticated() && (
                    <React.Fragment>
                        <b className="text-warning">Welcome</b>
                        <div className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-warning" href="#" id="navbarDropdown" role="button" data-toggle="dropdown">
                                {authService.isAuthenticated().user.lastName}
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                <Link to={`/user/${authService.isAuthenticated().user.id}`} className="dropdown-item">
                                    <i className="fa fa-user"></i>{""}Profile
                                </Link>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#" onClick={logout}>
                                    <i className="fa fa-sign-out"></i>{" "}SignOut</a>
                            </div>
                        </div>
                    </React.Fragment>
                )}

                {!authService.isAuthenticated() && (
                    <React.Fragment>
                        <ul className="navbar-nav mr-auto">
                            <li className={isActive(history, '/signin')}>
                                <Link to="/signin" className="nav-link">Sign In</Link></li>
                            <li className={isActive(history, '/signup')}>
                                <Link to="/signup" className="nav-link">Sign Up</Link>
                            </li>
                        </ul>
                    </React.Fragment>
                )}
            </form>
        </nav>
    )
}

export default withRouter(Menu);
