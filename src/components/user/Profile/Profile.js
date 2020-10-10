import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import userService from '../../../services/user.service';
import postService from '../../../services/post.service';
import authService from '../../../services/auth.service';
import profilePic from '../../../images/profile.jpg';
import BackLink from '../../common/buttons/backLink';
import FollowUnfollowButtons from '../../common/buttons/followUnfollowButtons';

const Posts = (props) => {

  const { posts, deletePost = (p) => p } = props;
  const currentUser = authService.getCurrentUser();
  const isLoggedIn = authService.isAuthenticated();

  return (
    <React.Fragment>
      {
        posts.map((post, i) => {
          const createdByMe = isLoggedIn && post.postedBy && post.postedBy.id === currentUser.id;
          return (
            <div key={i} className="mb-2 d-flex flex-row justify-content-between align-items-center" >
              <Link to={`/post/${post.id}`}>
                {post.title}
              </Link>

              {createdByMe && (
                <div>
                  <Link className="mr-2" to={`/post/edit/${post.id}`}>
                    <i className="fa fa-pencil"></i>
                  </Link>
                  <Link className="text-danger" to="#"
                    onClick={() => deletePost(post.id)}>
                    <i className="fa fa-trash"></i>
                  </Link>
                </div>
              )}
            </div>
          )
        })
      }
    </React.Fragment>
  )
}

const FollowItems = (props) => {

  const { follows, isFollower, unfollowUser = (id) => id } = props;

  return (
    <React.Fragment>
      {
        follows.map((user, i) => {
          return (
            <div key={i}>
              <div className="d-flex flex-row align-items-center justify-content-between">
                <Link to={`/user/${user.id}`}>
                  <img
                    src={`${process.env.REACT_APP_BASE_API_URL}/users/${user.id}/avatar`}
                    onError={i => (i.target.src = `${profilePic}`)}
                    style={{ width: '50px', borderRadius: '50%', border: '1px solid #ccc' }}
                    alt={user.lastName}
                  />
                  <h5 className="d-inline-block ml-3">{user.firstName} {user.lastName}</h5>
                </Link>
                {!isFollower && (
                  <div>
                    <button style={{ fontSize: '.5em', padding: '.3em .5em' }} className="btn btn-outline-danger btn-raised" onClick={() => unfollowUser(user.id)}>
                      <i title="Unfollow" className="fa fa-remove"></i>
                    </button>
                  </div>
                )}
              </div>
            </div>

          )
        })
      }
    </React.Fragment>
  )
}

const Profile = (props) => {

  const [user, setUser] = useState({ createdAt: new Date() });
  const [userFollowing, setUserFollowing] = useState([])
  const [errorMessage, setErrorMessage] = useState('');
  const [isSelf, setIsSelf] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const isLoggedIn = authService.isAuthenticated();
  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    init(props.match.params.userId);
  }, [props.match.params.userId])

  const init = async (userId) => {
    setIsLoading(true);
    try {
      let data = await userService.getUser(userId);
      setUser(data.payload);
      setUserFollowing(data.payload.following);
      await loadPost(data.payload.id);
      setIsSelf(isLoggedIn && currentUser.id === data.payload.id);
    }
    catch (err) {      
      let msg = err.data.message;
      setErrorMessage(msg);
    }
    setIsLoading(false);
  }

  const loadPost = async (userId) => {
    let data = await postService.search(1, 20, userId);
    setPosts(data.payload.items);
  }

  const deletePost = (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?'))
      return;
    setErrorMessage('');
    postService.remove(postId).then(() => {
      setPosts(posts.filter((p) => p.id !== postId));
    }).catch((err) => {
      setErrorMessage(err.data.message)
    })
  }

  const onFollowUnFollow = (isFollow) => {
    let action = userService.follow;
    if (!isFollow)
      action = userService.unfollow;
    action(currentUser.id, user.id).then((resp) => {
      setUser(resp.payload);
    }).catch((err) => {
      console.log(err)
      // if(err.status===401)
      setErrorMessage(err.data.message);
    })
  }

  const unfollowUser = (id) => {
    if (!window.confirm('Are you sure you want to unfollow this user?'))
      return
    userService.unfollow(currentUser.id, id).then((resp) => {
      let myCurrentFollowing = userFollowing.filter((v) => (v.id !== id));
      setUserFollowing(myCurrentFollowing);
    }).catch((err) => {
      setErrorMessage(err.data.message);
    })
  }

  return (
    <div className="container view-spacer">
      <div className="row">
        <div className="col-10">
          {errorMessage && (
            <div className="alert alert-danger">
              {errorMessage}
            </div>
          )}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                {user.firstName}'s Profile
              </h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-4">
                  <img
                    style={{ height: '200px' }}
                    src={`${process.env.REACT_APP_BASE_API_URL}/users/${user.id}/avatar`}
                    onError={i => (i.target.src = `${profilePic}`)}
                    alt={user.lastName}
                  />
                </div>
                <div className="col-8">
                  <p><b>First Name:</b> <span className="text text-primary">{user.firstName}</span></p>
                  <p><b>Last Name:</b> <span className="text text-primary">{user.lastName}</span></p>
                  <p><b>Username:</b> <span className="text text-primary">{user.username}</span></p>
                  <p><b>Email:</b> <span className="text text-primary">{user.email}</span></p>
                  <p><b>Date Joined:</b> <span className="text text-primary">{(new Date(user.createdAt).toLocaleDateString())}</span></p>
                  {
                    isLoggedIn && !isSelf && user.followers && (
                      <FollowUnfollowButtons
                        onButtonClick={onFollowUnFollow}
                        enableFollow={!user.followers.find((v, i) => (v.id === currentUser.id))}
                      />
                    )
                  }
                  {isSelf && (
                    <Link className="btn btn-primary btn-sm btn-raised" to={`/user/edit/${user.id}`}>
                      <i className="fa fa-edit">{" "}Edit</i>
                    </Link>
                  )}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-4">
                  <div className="pb-1">
                    <h4 className="text-info"><b>Followers</b></h4>
                  </div>
                  {
                    user.followers && (
                      <FollowItems follows={user.followers} isFollower={true} />
                    )
                  }
                </div>
                <div className="col-4">
                  <div className="pb-1">
                    <h4 className="text-info"><b>Following</b></h4>
                  </div>
                  {
                    isSelf && (
                      <FollowItems follows={userFollowing} isFollower={false} unfollowUser={unfollowUser} />
                    )
                  }
                </div>
                <div className="col-4">
                  <div className="pb-1">
                    <h4 className="text-info d-flex flex-row align-items-center justify-content-between">
                      <b>Posts</b>
                      {
                        isSelf && (
                          <Link to={`/post/create`} title="Create Post">
                            <i className="fa fa-plus-circle"></i>
                          </Link>
                        )
                      }
                    </h4>
                  </div>
                  <Posts posts={posts} deletePost={deletePost} />
                </div>
              </div>
            </div>
          </div>
          <BackLink classes="mt-4" />
        </div>
      </div>
    </div>
  );
}

export default Profile;
