import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import userService from '../../../services/user.service';
import BackLink from '../../common/buttons/backLink';

const displayValidationMsg = (message) => {
  return (
    <small className="error-feedback" >
      {message}
    </small>
  )
}

const EditProfile = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [user, setUser] = useState({});
  const [photoErrorMessage, setPhotoErrorMessage] = useState('');

  useEffect(() => {
    getUser(props.match.params.userId);
  }, [props.match.params.userId])

  const { register, setValue, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      photo: null
    }
  })

  const getUser = (userId) => {
    userService.getUser(userId).then((data) => {
      setUser(data.payload);
      setValue("firstName", data.payload.firstName);
      setValue("lastName", data.payload.lastName);
      setValue("email", data.payload.email);
    }).catch((err) => {
      setErrorMessage(err.data.message);
    })
  }

  const handleEdit = (form) => {
    setErrorMessage('');
    setSuccessMsg('');
    setIsLoading(true);

    if (photoErrorMessage.length) return;

    let formData = new FormData();
    Object.keys(form).forEach((v) => {
      if (v === 'photo') {
        if (form[v].length)
          formData.set(v, form[v][0])
      }
      else
        formData.set(v, form[v]);
    });

    for (var key of formData.entries()) {
      //console.log(key[0] + ': ' + key[1])
    }
    userService.update(user.id, formData).then((data) => {
      setSuccessMsg("Profile updated successfully");
    }).catch((err) => {
      setErrorMessage(err.data.message)
    }).finally(() => {
      setIsLoading(false);
    })
  }

  const onPhotoChanged = (evt) => {
    if (evt.target.files && evt.target.files[0]) {
      if (Math.ceil(evt.target.files[0].size / 1024) > 1024) {
        setPhotoErrorMessage('File too large. Max Size is 1MB')
      } else {
        setPhotoErrorMessage('');
        displayImage(evt.target.files[0])
      }
    } else {
      setPhotoErrorMessage('');
    }
  }

  const displayImage = (file) => {
    let imgPreiew = document.getElementsByClassName('img-thumbnail')[0];
    let reader = new FileReader();
    reader.onload = (data) => {
      imgPreiew.src = data.target.result;
    }

    reader.readAsDataURL(file);
  }

  const chooseFile = () => {
    document.getElementById('photo').click();
  }

  return (
    <div className="container view-spacer">
      <div className="row">
        <div className="col-10">
          <div className="card">
            <h3 className="pl-5 pt-4">Edit {user.lastName}'s Profile</h3>
            <hr />
            {errorMessage && (
              <div className="ml-4 alert alert-danger" role="alert"
                dangerouslySetInnerHTML={{ __html: errorMessage }}></div>
            )}
            {successMsg && (
              <div className="ml-4 alert alert-info" role="alert">
                <span>{successMsg}</span>
              </div>
            )}
            <form onSubmit={handleSubmit(handleEdit)} className="p-4">
              <div className="row">
                <div className="col-8">
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
                </div>
                <div className="col-3">
                  <div className="d-flex flex-column">
                    {photoErrorMessage && (<div className="error-feedback">{photoErrorMessage}</div>)}
                    <img
                      className="img-thumbnail"
                      src={`${process.env.REACT_APP_BASE_API_URL}/users/${user.id}/avatar`}
                      alt={user.lastName}
                    />
                    <input type="file" id="photo" name="photo" accept="image/*" className="hidden d-none"
                      onChange={onPhotoChanged} ref={register()} />
                    <button type="button" onClick={chooseFile} className="btn btn-outline-primary btn-sm">Change</button>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <button type="submit"
                  className="btn btn-primary btn-sm btn-raised" disabled={isLoading}>
                  {isLoading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Update</span>
                </button>
              </div>
            </form>
          </div>
          <BackLink classes="mt-4" />
        </div>
      </div>
    </div>
  )
}

export default EditProfile;
