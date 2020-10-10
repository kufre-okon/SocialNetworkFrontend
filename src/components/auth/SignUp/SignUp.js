import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import authService from '../../../services/auth.service';
import { Link } from 'react-router-dom';

const displayValidationMsg = (message) => {
  return (
    <small className="error-feedback" >
      {message}
    </small>
  )
}

const SignUp = (props) => {

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const { register, handleSubmit, errors, formState } = useForm({
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      email: ''
    }
  })

  const handleSignUp = (form) => {
    setErrorMessage('');
    setIsLoading(true);

    authService.signUp({ ...form }).then((data) => {
      console.log(data.payload);
      setIsSignUp(true);
    }).catch((err) => {
      let respMsg = err.data.message;

      setErrorMessage(respMsg)
      setIsLoading(false);
    })
  }

  return (
    <div className="container">
      <div className="card">
        <h2 className="pl-5 pt-4">SignUp</h2>
        <hr />
        <div className="row">
          <div className="col-8">
            {errorMessage && (
              <div className="ml-4 alert alert-danger" role="alert"
                dangerouslySetInnerHTML={{ __html: errorMessage }}></div>
            )}
            {isSignUp && (
              <div className="ml-4 alert alert-info" role="alert">
                <span>New Account created successfully, please <Link to="/signin">sign in</Link></span>
              </div>
            )}
            <form onSubmit={handleSubmit(handleSignUp)} className="p-4">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input type="text"
                  id="firstName"
                  required
                  className="form-control"
                  placeholder="Enter first name"
                  name="firstName"
                  ref={register({ required: true })}
                />
                {errors.firstName?.type === 'required' && displayValidationMsg("First name is required")}
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text"
                  id="lastName"
                  required
                  className="form-control"
                  placeholder="Enter last name"
                  name="lastName"
                  ref={register({ required: true })}
                />
                {errors.lastName?.type === 'required' && displayValidationMsg("Last name is required")}
              </div>

              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text"
                  id="username"
                  required
                  className="form-control"
                  placeholder="Enter username"
                  name="username"
                  ref={register({ required: true, minLength: 4 })}
                />
                {errors.username?.type === 'required' && displayValidationMsg("Username is required")}
                {errors.username?.type === 'minLength' && displayValidationMsg("Username must be at least 4 characters")}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password"
                  id="password"
                  required
                  className="form-control"
                  placeholder="Enter Password"
                  name="password"
                  ref={register({ required: true, minLength: 6 })}
                />
                {errors.password?.type === 'required' && displayValidationMsg("Password is required")}
                {errors.password?.type === 'minLength' && displayValidationMsg("Password must be at least 6 characters")}
              </div>


              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="text"
                  id="email"
                  required
                  className="form-control"
                  placeholder="Enter Email"
                  name="email"
                  ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                />
                {errors.email?.type === 'required' && displayValidationMsg("Email is required")}
                {errors.email?.type === 'pattern' && displayValidationMsg("Email is Invalid")}
              </div>              

              <div className="mt-4">
                <button type="submit"
                  className="btn btn-primary btn-sm btn-raised" disabled={isLoading}>
                  {isLoading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>SignUp</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div >
  )
};

export default SignUp;
