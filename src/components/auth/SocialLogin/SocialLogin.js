import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import authService from '../../../services/auth.service';
import { Redirect } from 'react-router-dom';

const SocialLogin = (props) => {

  const [loginSuccess, setLoginSuccess] = useState(false);

  const responseGoogle = (response) => {
    console.log(response);
    const { email, familyName, givenName, googleId, imageUrl } = response.profileObj;

    const user = {
      email: email,
      username: email,
      lastName: familyName,
      firstName: givenName,
      password: googleId
    }

    authService.socialLogin(user).then((resp) => {
      authService.setCurrentUser(resp.payload.user);
      authService.setLoginToken(resp.payload.accessToken);
      setLoginSuccess(true);
    }).catch((err) => {
      console.log("Error login:", err)
    })

  }

  return (
    <>
      {
        loginSuccess && (
          <Redirect to="/" />
        )
      }
      <GoogleLogin
        clientId="619264673724-u4og9aoj0r1hlj04p49cpitrekdppca3.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    </>
  )
}

export default SocialLogin;
