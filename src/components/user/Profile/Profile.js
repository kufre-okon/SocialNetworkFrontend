import React, { useEffect } from 'react';
import authService from '../../../services/auth.service';

const Profile = (props) => {

  const user = authService.getCurrentUser().user;

  useEffect(() => {
    console.log(props.match.params.userId)
  }, [])

  return (
    <div className="container">
      <div className="row">
        <div className="col-8">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">{user.firstName}'s Profile</h3>
            </div>
            <div className="card-body">
              Profile Component
  </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
