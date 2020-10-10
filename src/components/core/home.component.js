import React, { Fragment } from 'react'
import PostList from '../post/PostList/postlist'

export default function Home() {
    return (
        <Fragment>
            <div className="jumbotron">
                <h2>Welcome to my social network react frontend application</h2>
            </div>
            <div className="container">
                <PostList />
            </div>
        </Fragment>
    )
}
