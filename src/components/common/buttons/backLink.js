import React from 'react';
import { useHistory } from 'react-router-dom';

export default function BackLink(props) {

    let history = useHistory();
    let classes = props.classNames || 'mt-4';

    return (
        <div className={classes}>
            <a href="#" onClick={() => history.goBack()}>
                <i className="fa fa-backward"></i> back
            </a>
        </div>
    )
}
