import React, { useState, useEffect } from 'react';
import postService from '../../../services/post.service';
import authService from '../../../services/auth.service';
import { useForm } from 'react-hook-form';
import BackLink from '../../common/buttons/backLink';
import defaultImg from '../../../images/defaultpost.jpg';

const displayValidationMsg = (message) => {
  return (
    <small className="error-feedback" >
      {message}
    </small>
  )
}

const PostEditor = (props) => {

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [post, setPost] = useState({});
  const [photoErrorMessage, setPhotoErrorMessage] = useState('');

  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    loadPost(props.match.params.postId);
  }, [props.match.params.postId])

  const { register, handleSubmit, setValue, errors } = useForm({
    mode: 'onBlur',
    defaultValues: {
      title: '',
      body: '',
      photo: null
    }
  })


  const loadPost = (id) => {
    if (!id) return;
    postService.getById(id).then((response) => {
      let post = response.payload;
      setPost(post);
      setValue('title', post.title)
      setValue('body', post.body)
    }).catch((err) => {
      setErrorMessage(err.data.message)
    })
  }

  const onPhotoChanged = (evt) => {
    if (evt.target.files && evt.target.files[0]) {
      if (Math.ceil(evt.target.files[0].size / 1024) > 500) {
        setPhotoErrorMessage('File too large. Max Size is 500KB')
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

  const handleSave = (form) => {
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    if (photoErrorMessage.length) return;

    let formdata = new FormData();
    Object.keys(form).forEach((v) => {
      if (v === 'photo') {
        if (form[v].length)
          formdata.set(v, form[v][0])
      }
      else
        formdata.set(v, form[v]);
    });

    for (var key of formdata.entries()) {
      console.log(key[0] + ': ' + key[1])
    }
    let promise = post.id ? postService.update(post.id, formdata)
      : postService.create(formdata);

    promise.then((data) => {
      let msg = post.id ? "Post updated successfully" : "Post created successfully";
      setSuccessMessage(msg);
    }).catch((err) => {
      setErrorMessage(err.data.message)
    }).finally(() => {
      setIsLoading(false);
    })
  }

  return (
    <div className="container view-spacer">
      <div className="row">
        <div className="col-8">
          {
            errorMessage && (
              <div className="alert alert-danger">
                {errorMessage}
              </div>
            )
          }
          {
            successMessage && (
              <div className="ml-4 alert alert-info" role="alert">
                <span>{successMessage}</span>
              </div>
            )
          }
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                {(post.id ? "Edit Post" : "New Post")}
              </h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(handleSave)}>
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="title">Title</label>
                      <input type="text"
                        id="title"
                        required
                        className="form-control"
                        placeholder="Enter title"
                        name="title"
                        ref={register({ required: true })}
                      />
                      {errors.title?.type === 'required' && displayValidationMsg("Title is required")}
                    </div>

                    <div className="form-group">
                      <label htmlFor="lastName">Post Body</label>
                      <textarea type="text"
                        id="body"
                        required
                        className="form-control"
                        placeholder="Enter post body"
                        name="body"
                        rows="3"
                        ref={register({ required: true })}
                      ></textarea>
                      {errors.body?.type === 'required' && displayValidationMsg("Post body is required")}
                    </div>

                    <div className="">
                      {
                        photoErrorMessage && (
                          <div className="error-feedback">{photoErrorMessage}</div>
                        )
                      }
                      <img
                        className="img-thumbnail"
                        src={postService.getPhotoUrl(post.id)}                       
                        alt="post"
                      />
                      <input type="file" id="photo" name="photo" accept="image/*" className="hidden d-none"
                        onChange={onPhotoChanged} ref={register()} />
                      <button type="button" onClick={chooseFile} className="btn btn-outline-primary btn-sm d-block">Select Image</button>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <button type="submit"
                    className="btn btn-primary btn-sm btn-raised" disabled={isLoading}>
                    {isLoading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Submit</span>
                  </button>
                </div>
              </form>

            </div>
          </div>
          <BackLink classes="mt-4" />
        </div>
      </div>
    </div>
  )
}

export default PostEditor;
