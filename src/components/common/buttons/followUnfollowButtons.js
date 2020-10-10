import React from 'react'
import PropTypes from 'prop-types';

const FollowUnfollowButtons = (props) => {

    const { enableFollow, onButtonClick = (s) => s } = props;

    return (
        <div className="d-inline-block mt-5">
            {
                enableFollow && (
                    <button onClick={() => onButtonClick(true)} className="btn btn-success btn-raised btn-sm mr-5">
                        <i className="fa fa-user-plus"></i> Follow
                    </button>
                )
            }
            {
                !enableFollow && (
                    <button onClick={() => onButtonClick(false)} className="btn btn-danger btn-raised btn-sm">
                        <i className="fa fa-user-times"></i> UnFollow
                    </button>
                )
            }
        </div>
    )
}

FollowUnfollowButtons.propTypes = {
    onButtonClick: PropTypes.func.isRequired
}
export default FollowUnfollowButtons;
