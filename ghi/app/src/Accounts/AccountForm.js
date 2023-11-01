import React, { useState, useEffect } from 'react';
import "./AccountForm.css"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import { useModal } from './SignInModal';


function AccountForm() {
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const { login } = useAuth();
    const [csrfToken, setCsrfToken] = useState('');
    const { closeModal } = useModal();

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
        const accountUrl = 'http://localhost:8070/api/accounts/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            credentials: 'include',
            }

        if (formData.password === passwordConfirm){
            const response = await fetch(accountUrl, fetchConfig);
                if (response.ok) {
                    login()
                    setFormData({
                        username: '',
                        first_name: '',
                        last_name: '',
                        email: '',
                        password: '',
                    });
                    setPasswordConfirm('')
                    navigate("/")
                }
        } else {
            alert("Passwords Do Not Match")
        }

    }

    const handlePasswordConfirmChange = (e) => {
        setPasswordConfirm(e.target.value);
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
            <div className="mt-4 p-4 pt-3 mainDivSignIn" >
                <div className="p-5 mt-2 form2">
                    <form onSubmit={handleSubmit} id="create-account-form" className='formDiv'>
                        <div className="mb-3 mt-0 pt-0 formHeaderContainer" >
                            <h1 className='text-center mb-3 formHeader'>Create an Account With Us</h1>
                        </div>
                        <div className="row inputs" >
                        <div className="col-12 mb-2">
                            <input placeholder="Username..." className="text-center form-control" onChange={handleFormChange} value={formData.username} required type="text" name="username" id="username"/>
                        </div>
                        <div className="col-6 mt-4 mb-2 inputField1">
                            <input placeholder="First Name..." className="text-center form-control" onChange={handleFormChange} value={formData.first_name} required type="text" name="first_name" id="first_name"/>
                        </div>
                        <div className="col-6 mt-4 mb-2 inputField2">
                            <input placeholder="Last Name..." className="text-center form-control" onChange={handleFormChange} value={formData.last_name} required type="text" name="last_name" id="last_name"/>
                        </div>
                        <div className="col-12 mt-4 mb-2">
                            <input placeholder="Email..." className="text-center form-control" onChange={handleFormChange} value={formData.email} required type="text" name="email" id="email"/>
                        </div>
                        <div className="col-6 mt-4 inputField1">
                            <input placeholder="Password..." className="text-center form-control" onChange={handleFormChange} value={formData.password} required type="text" name="password" id="password"/>
                        </div>
                        <div className="col-6 mt-4 mb-2 inputField2">
                            <input placeholder="Password Confirmation..." className="text-center form-control" onChange={handlePasswordConfirmChange} value={passwordConfirm} required type="text" name="passwordConfirm" id="passwordConfirm"/>
                        </div>
                        <div className="col" style={{display: "flex", justifyContent: "center"}}>
                        <button className="btn col-6 btn-primary mt-4 createButton">Create</button>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
    );
}
export default AccountForm;
