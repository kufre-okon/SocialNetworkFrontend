import React, { useEffect, useState } from 'react';
import userService from '../../../services/user.service';
import Paginator from '../../common/paginator';
import { Link } from 'react-router-dom';
import authService from '../../../services/auth.service';
import defaultImg from '../../../images/profile.jpg';


const UserItem = (props) => {

  const { user } = props;

  let currentUser = authService.isAuthenticated() ? authService.getCurrentUser() : {};

  return (
    <div className="col-4 mb-4">
      <div className="card">
        <img
          src={`${process.env.REACT_APP_BASE_API_URL}/users/${user.id}/avatar`}
          onError={i => (i.target.src = `${defaultImg}`)}
          className="card-img-top" alt={user.lastName}
          style={{ width: '100%', height: '12vw', objectFit: "cover" }}
        />
        <div className="card-body" style={{ padding: '1.25rem 0.8rem 0.8rem' }}>
          <div className="card-title text-primary font-weight-bold">
            <div className="d-flex flex-row justify-content-between">
              <span>{user.firstName} {user.lastName}</span>
              {user.isActive && (<span className="badge badge-info">Active</span>)}
              {!user.isActive && (<span className="badge badge-danger">InActive</span>)}
            </div>
          </div>
          <div className="card-text">
            <span className="fa fa-envelope"></span> {user.email}
          </div>
          <div className="card-text">
            <span className="fa fa-users"></span> {user.followers.length}
          </div>
          <hr style={{ border: 'dotted 1px #ccc' }} />
          <div className="d-flex flex-row justify-content-between">
            <Link to={`user/${user.id}`} className="btn btn-outline-primary btn-sm" >View Profile</Link>
            {(currentUser.id === user.id) && (
              <Link to={`user/edit/${user.id}`} className="btn btn-outline-success btn-sm" >Edit Profile</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const UserList = () => {

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    loadUsers();
  }, [page])


  const loadUsers = () => {
    userService.getAllUsers(page, pageSize).then((data) => {
      console.log(data)
      setUsers(data.payload.items);
      setPage(data.payload.page);
      setTotalItems(data.payload.totalItems);
      setTotalPages(data.payload.totalPages);
      setPageSize(data.payload.pageSize);
    }).catch((err) => {
      console.log(err);
      setErrorMessage(err.data.message)
    })
  }

  const onPageChanged = (currentPage) => {
    setPage(currentPage);
  }

  return (
    <div className="container view-spacer" >
      <div className="row">
        <div className="col-10">
          {errorMessage && (
            <div className="alert alert-danger">
              {errorMessage}
            </div>
          )}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Users({totalItems})</h3>
            </div>
            <div className="card-body">
              <div className="row">
                {users && users.map((u, i) =>
                  <UserItem key={i} user={u}></UserItem>
                )}
              </div>
              <Paginator totalPages={totalPages} totalItems={totalItems} pageSize={pageSize} onPageChanged={onPageChanged} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserList;
