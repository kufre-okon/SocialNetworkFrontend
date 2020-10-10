import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import postService from '../../../services/post.service';
import authService from '../../../services/auth.service';
import defaultpostimage from '../../../images/defaultpost.jpg';
import BackLink from '../../common/buttons/backLink';
import Comment from '../comment/comment.component';


const SinglePost = (props) => {

  const [post, setPost] = useState({ createdAt: new Date() });
  const [errorMessage, setErrorMessage] = useState('');
  const [postedByMe, setPostedByMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [like, setLike] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const isLoggedIn = authService.isAuthenticated();
  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    init(props.match.params.postId);
  }, [props.match.params.postId])

  const checkLike = (likes) => {
    return isLoggedIn && !!likes.find((l) => l.id === currentUser.id);
  }

  const isByMe = (postedBy) => {
    return isLoggedIn && postedBy && currentUser.id === postedBy.id;
  }

  const init = (postId) => {
    setIsLoading(true);
    setErrorMessage('');
    postService.getById(postId).then((data) => {
      let p = data.payload;
      setPost(p);
      setComments(p.comments);
      setLike(checkLike(p.likes));
      setLikes(p.likes.length)
      setPostedByMe(isByMe(p.postedBy));
    }).catch((err) => {
      console.log(err)
      let msg = err.data.message;
      setErrorMessage(msg);
    }).finally(() => {
      setIsLoading(false);
    })
  }

  const deletePost = (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?'))
      return;
    setErrorMessage('');
    postService.remove(postId).then(() => {
      props.history.push('/');
    }).catch((err) => {
      setErrorMessage(err.data.message)
    })
  }

  const likeToggle = () => {
    if (!isLoggedIn) {
      setRedirectToLogin(true);
      return false;
    }
    setErrorMessage('');
    setIsLoading(true);
    let action = like ? postService.unlike : postService.like;
    action(currentUser.id, post.id).then((data) => {
      let post = data.payload;
      setPost(post);
      setLikes(post.likes.length)
      setLike(!like);
    }).catch((err) => {
      let msg = err.data.message;
      setErrorMessage(msg);
    }).finally(() => {
      setIsLoading(false);
    })
  }

  const updateComments = (comments) => {
    setComments(comments);
  }

  return (
    <>
      {redirectToLogin ? <Redirect to="/signin" /> : null}
      <div className="container view-spacer">
        <div className="row">
          <div className="col-8">
            {errorMessage && (
              <div className="alert alert-danger">
                {errorMessage}
              </div>
            )}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">
                  {post.title}
                </h3>
              </div>
              <div className="card-body">
                <img
                  className="mb-2"
                  style={{ height: '300px', width: '100%', objectFit: "cover" }}
                  src={postService.getPhotoUrl(post.id)}
                  onError={i => (i.target.src = `${defaultpostimage}`)}
                  alt={post.title}
                />
                <h3 onClick={likeToggle} style={{ cursor: 'pointer' }}>
                  {
                    like ? (
                      <i style={{ padding: '5px', borderRadius: '50%' }} className="fa fa-thumbs-up text-success bg-dark"></i>
                    ) : (
                        <i style={{ padding: '5px', borderRadius: '50%' }} className="fa fa-thumbs-up text-danger bg-dark"></i>
                      )
                  }
                  {" "}{likes} Like
                </h3>

                <p className="">{post.body}</p>

                <p className="mark font-italic">Post By {" "}
                  <Link to={((post.postedBy && post.postedBy.id) ? `/user/${post.postedBy.id}` : '')}>
                    {
                      (post.postedBy && post.postedBy.id ? `${post.postedBy.firstName} ${post.postedBy.lastName}` : 'Unknown')
                    }
                  </Link>{" "} on {(new Date(post.createdAt).toLocaleDateString())}
                </p>

                {postedByMe && (
                  <Link className="btn btn-primary btn-sm btn-raised mr-3" to={`/post/edit/${post.id}`}>
                    <i className="fa fa-edit">{" "}Edit</i>
                  </Link>
                )}

                {postedByMe && (
                  <button className="btn btn-danger btn-sm btn-raised mr-3" onClick={() => deletePost(post.id)}>
                    <i className="fa fa-trash">{" "}Delete</i>
                  </button>
                )}

                <Comment postId={post.id} comments={comments} updateComments={updateComments} />
              </div>
            </div>
            <BackLink classes="mt-4" />
          </div>
        </div>
      </div>
    </>
  );
}

export default SinglePost;
