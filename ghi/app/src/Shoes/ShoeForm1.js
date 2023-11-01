import React, { useState } from 'react';
import './ShoeForm1.css';  // Assuming you'll add some CSS


    function ShoeForm1() {
        const [passwordConfirm, setPasswordConfirm] = useState("")
        const [currentStep, setCurrentStep] = useState(1);
        const [formData, setFormData] = useState({
                name: "",
                brand: "",
                categoryr: "",
                price: "",
                size: "",
                color: "",
                sku: "",
                bin: ""
        });


    const handleSubmit = async (event) => {
        event.preventDefault();
        const accountUrl = 'http://localhost:8070/api/accounts/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
            }

        if (formData.password === passwordConfirm){
            const response = await fetch(accountUrl, fetchConfig);
                if (response.ok) {
                    setFormData({
                        name: "",
                        brand: "",
                        categoryr: "",
                        price: "",
                        size: "",
                        color: "",
                        sku: "",
                        bin: ""
                    });
                    setPasswordConfirm('')
                }
        } else {
            alert("Passwords Do Not Match")
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

    const nextStep = () => setCurrentStep(currentStep + 1);
    const prevStep = () => setCurrentStep(currentStep - 1);

    return (
        <div className="signup-container">
            <div className='formShoeStepperDivMain'>
                <Stepper currentStep={currentStep} />
            </div>
                <div className='inputShoeFormDiv'>
                <form onSubmit={handleSubmit} id="create-shoe-form">
                    <div>
                        <StepContent currentStep={currentStep} formData={formData} handleFormChange={handleFormChange} />
                    </div>
                    <div className="navigation-buttons">
                        {currentStep > 1 && <button type="button" onClick={prevStep}>Back</button>}
                        {currentStep < 2 && <button type="button" onClick={nextStep}>Next</button>}
                        {currentStep === 2 && <button type="submit">Submit</button>}
                    </div>
                </form>
            </div>
        </div>
    );
}

const Stepper = ({ currentStep }) => {
    return (
        <div className="stepper">
            <div className='shoeFormHeaderDiv'>
                <h1 className='shoeFormHeader'>Add New Shoe</h1>
            </div>
            <div className='shoeFormStepperDiv'>
                <div className={`dot ${currentStep === 1 ? 'filled' : ''}`}></div>
                <div className={`dot ${currentStep === 2 ? 'filled' : ''}`}></div>
            </div>
        </div>
    );
};

const StepContent =  ({ currentStep, formData, handleFormChange }) => {
    switch (currentStep) {
        case 1:
            return (
                <>
                    <div className='caseOneDiv'>
                        <div className='formCaseDiv'>
                            <h2>Shoe Details</h2>
                        </div>
                        <div className="col-12 mb-2">
                            <input placeholder="Name..." className="text-center inputDiv form-control" onChange={handleFormChange} value={formData.name} required type="text" name="name" id="name"/>
                        </div>
                        <div className="col-12 mb-2">
                            <input placeholder="Brand..." className="text-center inputDiv form-control" onChange={handleFormChange} value={formData.brand} required type="text" name="brand" id="brand"/>
                        </div>
                        <div className="col-12">
                            <input placeholder="Category..." className="text-center inputDiv form-control" onChange={handleFormChange} value={formData.category} required type="text" name="category" id="category"/>
                        </div>
                        <div className="col-12">
                            <input placeholder="Color..." className="text-center inputDiv form-control" onChange={handleFormChange} value={formData.color} required type="text" name="color" id="username"/>
                        </div>
                    </div>
                </>
            );
        case 2:
            return (
                <>
                <div className='caseOneDiv'>
                    <div className='formCaseDiv'>
                        <h2>Shoe Details</h2>
                    </div>
                    <div className="col-12 mb-2">
                        <input placeholder="Price..." className="text-center inputDiv form-control" onChange={handleFormChange} value={formData.price} type="number" step="0.01" name="price" id="price"/>
                    </div>
                    <div className="col-12 mb-2">
                        <input placeholder="Size..." className="text-center inputDiv form-control" onChange={handleFormChange} value={formData.size} type="number" step="0.01" name="size" id="size"/>
                    </div>
                        <div className="col-12">
                            <input placeholder="Sku..." className="text-center inputDiv form-control" onChange={handleFormChange} value={formData.sku} required type="number" name="sku" id="sku"/>
                        </div>
                    <div className="col-12">
                        <input placeholder="Store..." className="text-center inputDiv form-control" onChange={handleFormChange} value={formData.bin} required type="text" name="bin" id="bin"/>
                    </div>
                </div>
                </>
            );
        default:
            return null;
    }
};

export default ShoeForm1;
