import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import postService from '../../../services/post.service';
import authService from '../../../services/auth.service';
import profilePic from '../../../images/profile.jpg';


const CommentItems = (props) => {

    const { comments, uncomment = (i) => i } = props;

    const currentUser = authService.getCurrentUser();

    return (
        <>
            <h4 className="text-primary">{comments.length} Comments</h4>
            {
                comments && comments.map((c, i) => {

                    const commentedByMe = currentUser && c.postedBy && c.postedBy.id === currentUser.id;

                    return (
                        <div key={i} className="mb-3">
                            <div className="d-flex flex-row align-items-center justify-content-between">
                                <div className="d-flex flex-row align-items-center">
                                    <img
                                        src={`${process.env.REACT_APP_BASE_API_URL}/users/${(c.postedBy ? c.postedBy.id : '')}/avatar`}
                                        onError={i => (i.target.src = `${profilePic}`)}
                                        style={{ width: '30px', borderRadius: '50%', border: '1px solid #ccc' }}
                                        alt={(c.postedBy ? c.postedBy.lastName : "Unknown")}
                                    />
                                    <div className="ml-3">
                                        <p style={{ margin: 0 }}>{c.text}</p>
                                        <p style={{ margin: 0, fontSize: '.8em' }} className="mark font-italic">Posted By {" "}
                                            <Link to={(c.postedBy ? `/user/${c.postedBy.id}` : '')}>
                                                {
                                                    (c.postedBy ? `${c.postedBy.firstName} ${c.postedBy.lastName}` : 'Unknown')
                                                }
                                            </Link>{" "} on {(new Date(c.createdAt).toLocaleDateString())}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    {commentedByMe && (
                                        <Link to="#" title="Uncomment" className="text-danger" onClick={() => uncomment(c._id)}>
                                            <i className="fa fa-remove"></i>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>)
}

const Comment = (props) => {

    const { postId, comments, updateComments = (c) => c } = props;

    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMesage, setErrorMesage] = useState('');

    const isLogin = authService.isAuthenticated();
    const currentUser = authService.getCurrentUser();

    const addComment = (e) => {
        e.preventDefault();
        setErrorMesage('');
        if (!text) {
            setErrorMesage("Comment is required")
            return false;
        }
        setIsLoading(true);
        postService.comment(currentUser.id, postId, text).then((resp) => {
            updateComments(resp.payload.comments);
            setText('');
        }).catch((err) => {
            console.log(err)
            setErrorMesage(err.data.message)
        }).finally(() => {
            setIsLoading(false);
        })
    }

    const uncomment = (id) => {
        if (!window.confirm('Are you sure you want to uncomment?'))
            return false;
        setErrorMesage('');
        postService.uncomment(id, postId).then((resp) => {
            updateComments(resp.payload.comments);
        }).catch((err) => {
            setErrorMesage(err.data.message)
        })
    }

    return (
        <div>
            <h2 className="mt-5 mb-5">Leave a comment</h2>
            <form onSubmit={addComment}>
                <div className="error-feedback">
                    {errorMesage}
                </div>
                <div className="form-group">
                    <textarea rows="3" placeholder="Enter comment" value={text} onChange={(e) => setText(e.target.value)} className="form-control"></textarea>
                </div>
                {
                    isLogin ? (
                        <button disabled={isLoading} type='submit' className="btn btn-info btn-sm  btn-raised mt-1">
                            Submit
                        </button>
                    ) : (
                            <Link to="/signin" className="btn btn-info btn-sm  btn-raised mt-1">
                                SignIn to comment
                            </Link>
                        )
                }
            </form>
            <CommentItems comments={comments} uncomment={uncomment} />
        </div>
    )
}

export default Comment;
