import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import authService from '../../../services/auth.service';

const displayValidationMsg = (message) => {
  return (
    <small className="error-feedback" >
      {message}
    </small>
  )
}

const SignIn = (props) => {

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { register, handleSubmit, errors, formState } = useForm({
    mode: 'onBlur',
    defaultValues: {
      login: '',
      password: ''
    }
  })

  // Read the formState before render to subscribe the form state through Proxy
  // see https://react-hook-form.com/api#formState

  const handleLogin = (form) => {
    setErrorMessage('');
    setIsLoading(true);

    authService.signIn(form.login, form.password).then((data) => {
      authService.setCurrentUser(data.payload);
      props.history.push('/');
    }).catch((err) => {
      let respMsg = err.data.message;

      setErrorMessage(respMsg)
      setIsLoading(false);
    })
  }


  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">SignIn</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(handleLogin)} className="form-horizontal" >
                <div className="form-group">
                  <label htmlFor="login">Username or email</label>
                  <input type="text"
                    className="form-control"
                    placeholder="Username or email"
                    name="login"
                    ref={register({ required: true })}
                  />
                  {errors.login?.type === 'required' && displayValidationMsg("Username or email is required")}
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    autoComplete="false"
                    ref={register({ required: true })}
                  />
                  {errors.password?.type === 'required' && displayValidationMsg("Password is required")}
                </div>
                <div className="form-group">
                  Don't have an account? <Link to={"/signup"}>Register</Link>
                </div>
                <div className="form-group mt-4">
                  <button type="submit"
                    className="btn btn-primary btn-sm btn-raised" disabled={isLoading}>
                    {isLoading && (
                      <span className="spinner-border spinner-border-sm"></span> 
                    )}
                    <span>Login</span>
                  </button>
                </div>

                {errorMessage && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">{errorMessage}</div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn;
