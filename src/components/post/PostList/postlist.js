import React, { useState, useEffect } from 'react'
import postService from '../../../services/post.service';
import Paginator from '../../common/paginator';
import { Link } from 'react-router-dom';
import defaultImg from '../../../images/defaultpost.jpg';


const PostItem = (props) => {


    const { post } = props;

    const postedByName = post.postedBy.id ? `${post.postedBy.firstName} ${post.postedBy.lastName}` : 'Unknown';
    const postedById = post.postedBy.id ? `/user/${post.postedBy.id}` : '';

    const body = post.body.length > 100 ? post.body.substring(0, 100) + "..." : post.body;

    return (
        <div className="col-4 mb-4">
            <div className="card">
                {
                    <img
                        src={postService.getPhotoUrl(post.id)}
                        onError={i => (i.target.src = `${defaultImg}`)}
                        className="card-img-top" alt={post.title}
                        style={{ width: '100%', height: '12vw', objectFit: "cover" }}
                    />
                }
                <div className="card-body" style={{ padding: '0.7em' }}>
                    <h5 className="card-title">{post.title}</h5>
                    <p style={{ height: '70px' }} className="card-text ell">{body}</p>
                    <p className="mark font-italic">Post By {" "}
                        <Link to={`${postedById}`}>{postedByName}</Link>{" "}
                        on {new Date(post.createdAt).toDateString()}</p>
                    <div className="d-flex flex-row align-items-center justify-content-between">
                        <Link to={`/post/${post.id}`} className="btn btn-outline-primary btn-sm" >Read more</Link>
                        <span className="font-italic">
                            <i className="fa fa-thumbs-up text-primary"></i>
                            {post.likes.length} Like
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

const PostList = (props) => {

    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        loadPosts();
    }, [page])


    const loadPosts = () => {
        postService.search(page, pageSize).then((data) => {
            console.log(data)
            setPosts(data.payload.items);
            setPage(data.payload.page);
            setTotalItems(data.payload.totalItems);
            setTotalPages(data.payload.totalPages);
            setPageSize(data.payload.pageSize);
        }).catch((err) => {
            console.log(err);
            setErrorMessage(err.data.message)
        })
    }

    const onPageChanged = (currentPage) => {
        setPage(currentPage);
    }

    return (

        <div className="row">
            <div className="col-10">
                {errorMessage && (
                    <div className="alert alert-danger">
                        {errorMessage}
                    </div>
                )}
                <h2 >Recent Post ({totalItems})</h2>

                <div className="row">
                    {posts && posts.map((p, i) =>
                        <PostItem key={i} post={p}></PostItem>
                    )}
                </div>
                <Paginator totalPages={totalPages} totalItems={totalItems} pageSize={pageSize} onPageChanged={onPageChanged} />
            </div>
        </div>
    )
}


export default PostList;
