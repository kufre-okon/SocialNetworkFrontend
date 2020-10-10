import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import authService from '../../../services/auth.service';
import BackLink from '../../common/buttons/backLink';
import { Redirect } from 'react-router-dom';

const displayValidationMsg = (message) => {
    return (
        <small className="error-feedback" >
            {message}
        </small>
    )
}

const ChangePassword = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const user = authService.getCurrentUser();


    const { register, handleSubmit, errors, watch } = useForm({
        mode: 'onBlur',
        defaultValues: {
            oldPassword: '',
            comparePassword: '',
            newPassword: ''
        }
    })

    const handleSave = (form) => {
        setErrorMessage('');
        setSuccessMsg('');
        setIsLoading(true);

        authService.changePassword(user.id, form.oldPassword, form.newPassword).then((data) => {
            setSuccessMsg("Password changed successfully");
        }).catch((err) => {
            setErrorMessage(err.data.message)
        }).finally(() => {
            setIsLoading(false);
        })
    }

    return (
        <>
            {!user && (<Redirect to={'/signin'} />)}

            <div className="container view-spacer">
                <div className="row">
                    <div className="col-10">
                        <div className="card">
                            <h3 className="pl-5 pt-4">Change Password</h3>
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
                            <form onSubmit={handleSubmit(handleSave)} className="p-4">
                                <div className="row">
                                    <div className="col-8">
                                        <div className="form-group">
                                            <label htmlFor="oldPassword">Old Password</label>
                                            <input type="password"
                                                id="oldPassword"
                                                required
                                                className="form-control"
                                                placeholder="Enter old pasword"
                                                name="oldPassword"
                                                ref={register({ required: true })}
                                            />
                                            {errors.oldPassword?.type === 'required' && displayValidationMsg("Old password is required")}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="newPassword">New Password</label>
                                            <input type="password"
                                                id="newPassword"
                                                required
                                                className="form-control"
                                                placeholder="Enter new pasword"
                                                name="newPassword"
                                                ref={register({ required: true })}
                                            />
                                            {errors.newPassword?.type === 'required' && displayValidationMsg("New password is required")}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="comparePassword">Confirm Password</label>
                                            <input type="password"
                                                id="comparePassword"
                                                required
                                                className="form-control"
                                                placeholder="Enter confirm pasword"
                                                name="comparePassword"
                                                ref={
                                                    register({
                                                        validate: (value) => {
                                                            return value === watch('newPassword');
                                                        }
                                                    })
                                                }
                                            />
                                            {errors.confirmPassword && displayValidationMsg("Confirm password must match")}
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
                        <BackLink classes="mt-4" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangePassword;
