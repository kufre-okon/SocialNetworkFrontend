import React, { useState } from 'react';
import authService from '../../../services/auth.service';

const ResetPassword = (props) => {

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = (e) => {
    e.preventDefault();
    if (!newPassword) {
      setError("Password is required.")
      return;
    }
    if (comparePasword()) {
      setError('');
      setMessage('');
      setIsLoading(true);
      authService.resetpassword(props.match.params.resetPasswordToken, newPassword).then((resp) => {
        console.log(resp);
      }).catch((err) => {
        setError(err.data.message);
      }).finally(() => {
        setIsLoading(false);
      })
    }
  }

  const comparePasword = () => {
    setError("")
    if (newPassword && (newPassword === confirmPassword))
      return true;
    else
      setError("Password and confirm password not match.")
  }

  return (
    <div className="container view-spacer">
      <div className="row">
        <div className="col-8">
          {
            error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )
          }
          {
            message && (
              <div className="ml-4 alert alert-info" role="alert">
                <span>{message}</span>
              </div>
            )
          }
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                Reset your Password
              </h3>
            </div>
            <div className="card-body">
              <form>
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="newPassword">New Password</label>
                      <input type="password"
                        id="newPassword"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="form-control"
                        placeholder="Enter new password"
                        name="newPassword"
                      />
                    </div>
                    <div className="form-group">
                      <input type="password"
                        required
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="form-control"
                        placeholder="Enter comfirm password"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <button type="button"
                    className="btn btn-primary btn-sm btn-raised"
                    onClick={resetPassword}
                    disabled={isLoading}>
                    {
                      isLoading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )
                    }
                    <span>{" "}Reset Password</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword;
