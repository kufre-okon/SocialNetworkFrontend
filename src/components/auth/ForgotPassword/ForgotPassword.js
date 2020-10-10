import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../../../services/auth.service';


const ForgotPassword = (props) => {

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    setError('');
    setMessage('');
    authService.forgotPassword(email).then((resp) => {
      setMessage(resp.message);
    }).catch((err) => {
      setError(err.data.message);
    })
  }

  return (
    <div className="container">
      <h2 className="mt-5 mb-5">Ask for Password Reset</h2>
      {
        message && (
          <h4 className="bg-success">{message}</h4>
        )
      }
      {
        error && (
          <h4 className="bg-warning">{error}</h4>
        )
      }
      <form>
        <div className="form-group mt-5">
          <input
            required
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="Your email address"
            autoFocus
          />
        </div>
        <button type="button"
          className="btn btn-primary btn-raised" onClick={handleSubmit}>
          Send Password Reset Link
        </button>
      </form>
      <p>
        <Link to={"/signin"}>Back to login</Link>
      </p>
    </div>
  )
}


export default ForgotPassword;
