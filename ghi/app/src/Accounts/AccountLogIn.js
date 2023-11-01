import React, { useState, useEffect } from 'react';
import "./AccountForm.css"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import { useModal } from './SignInModal';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faX } from '@fortawesome/free-solid-svg-icons';
import { useToast } from '../ToastContext';


function AccountLogIn() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const navigate = useNavigate();
    const { login } = useAuth();
    const [csrfToken, setCsrfToken] = useState('');
    const { closeModal } = useModal();
    const showToast = useToast();
    const { userFirstName } = useAuth();


    useEffect(() => {
        const fetchCsrfToken = async () => {
        try {
            const response = await fetch('http://localhost:8070/api/csrf-token/', {
                method: 'GET',
                credentials: 'include',
            });
        if (response.ok) {
            const data = await response.json();
            setCsrfToken(data.csrfToken);
        } else {
            console.error('Failed to fetch CSRF token.');
        }
        } catch (error) {
            console.error('Error fetching CSRF token:', error);
        }
        };

        fetchCsrfToken();
    }, []);

    const handleSubmit = async (event) => {

        event.preventDefault();
        const accountUrl = 'http://localhost:8070/api/account/login/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            credentials: 'include',
            }
        try {
            const response = await fetch(accountUrl, fetchConfig);

            if (response.ok) {

                login();
                // showToast(`Welcome, ${userFirstName}!`, "success");
                showToast("Welcome!", "success");
                setFormData({
                    username: '',
                    password: '',
                });
                navigate("/")
                closeModal()
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error during Login:', error);
        }
    }



    const handleFormChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;
        setFormData({
            ...formData,
            [inputName]: value
        });
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
                                <button onClick={closeModal} className='baseButton signUpButton btn mt-2'>
                                    <Link to='/accounts/form' className="signUpLink">Sign Up</Link>
                                </button>
                            </div>
                        </div>
                    </div>
                    </form>
                </div>
                </div>
    );
}
export default AccountLogIn;
