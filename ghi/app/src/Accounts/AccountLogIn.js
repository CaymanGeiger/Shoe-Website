import React, { useState, useEffect } from 'react';
import "./AccountForm.css"
import { useAuth } from '../Auth/AuthContext';
import { useModal } from './SignInModal';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faX } from '@fortawesome/free-solid-svg-icons';
import { useToast } from '../ToastContext';
import { useNavigate } from 'react-router-dom';


function AccountLogIn() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const { login } = useAuth();
    const { closeModal } = useModal();
    const showToast = useToast();
    const { userFirstName, isAuthenticated } = useAuth();
    const [loginCompleted, setLoginCompleted] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (event) => {

        event.preventDefault();
        const accountUrl = 'http://localhost:8000/api/account/login/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            }
        try {
            const response = await fetch(accountUrl, fetchConfig);

            if (response.ok) {
                login().then(() => {
                    setLoginCompleted(true);
                    setFormData({
                    username: '',
                    password: '',
                    });
                    closeModal();
                });
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error during Login:', error);
        }
    }
    useEffect(() => {
        if (loginCompleted && userFirstName) {
            showToast(`Welcome, ${userFirstName}!`, "success");
        } else if (loginCompleted) {
            showToast("Welcome!", "success");
        }
        setLoginCompleted(false);
    }, [userFirstName, loginCompleted]);


    const handleFormChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;
        setFormData({
            ...formData,
            [inputName]: value
        });
    }



    function handleSignUpClick(){
            closeModal(false)
            navigate('/accounts/form')
        }


    return (
            <div className='mainDivSignIn1'>
                <div className="mt-1 form1">
                    <form onSubmit={handleSubmit} id="sign-in-form">
                        <div className='signInXDiv'>
                            <div className="mb-2 mt-2 pt-0 formHeader2Container" >
                                <h1 className='mb-3 formHeader2'>Sign In</h1>
                            </div>
                            <div className='exitButtonDiv1'>
                                <button className="exitButton1" onClick={closeModal}><FontAwesomeIcon size="1x"icon={faX} /></button>
                            </div>
                        </div>
                        <div className='inputFields'>
                        <div className="col-12">
                            <input placeholder="Username..." className="text-center form-control" onChange={handleFormChange} value={formData.username} required type="text" name="username" id="username"/>
                        </div>
                        <div className="col-12 mt-2 mb-2">
                            <input placeholder="Password..." className="text-center form-control" onChange={handleFormChange} value={formData.password} required type="text" name="password" id="password"/>
                        </div>
                        </div>
                        <div className="container centeredContainer">
                        <div className='row'>
                            <div className='col buttonDiv8'>
                                <button className="btn mt-2 baseButton createButton1 ">Login</button>
                                <button onClick={handleSignUpClick} className='baseButton signUpButton btn mt-2'>Signup</button>
                            </div>
                        </div>
                    </div>
                    </form>
                </div>
                </div>
    );
}
export default AccountLogIn;
