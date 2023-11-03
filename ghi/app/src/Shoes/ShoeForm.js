import React, { useState } from 'react';
import './ShoeForm.css';


    function ShoeForm() {
        const [currentStep, setCurrentStep] = useState(1);
        const [formData, setFormData] = useState({
                name: "",
                brand: "",
                price: "",
                sizes: "",
                color: "",
                picture_url: "",
                description: "",
        });


    const handleSubmit = async (event) => {
        event.preventDefault();
        let sizesArray = formData.sizes.split(' ').filter(size => size.trim() !== "").map(size => parseFloat(size));
        const shoeUrl = 'http://localhost:8080/api/shoes/';
        let sendData = {...formData, sizes: sizesArray};
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(sendData),
            headers: {
                'Content-Type': 'application/json',
            },
            }

        const response = await fetch(shoeUrl, fetchConfig);
            if (response.ok) {
                setFormData({
                    name: "",
                    brand: "",
                    price: "",
                    sizes: "",
                    color: "",
                    picture_url: "",
                    description: "",
                });
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
        <div className='shoe-containerDiv'>
        <div className="shoe-container">
                <div className='inputShoeFormDiv'>
                <form onSubmit={handleSubmit} id="create-shoe-form" className='shoeForm'>
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
        </div>
    );
}

const Stepper = ({ currentStep }) => {
    return (
        <div className="stepper">
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
                            <Stepper currentStep={currentStep} />
                        </div>
                        <div className='inputsDiv'>
                        <div className="col-12 mb-2">
                            <input placeholder="Name..." className="text-center inputDiv form-control" onChange={handleFormChange} value={formData.name} required type="text" name="name" id="name"/>
                        </div>
                        <div className="col-12 mb-2">
                            <input placeholder="Brand..." className="text-center inputDiv form-control" onChange={handleFormChange} value={formData.brand} required type="text" name="brand" id="brand"/>
                        </div>
                        <div className="col-12">
                            <input placeholder="Color..." className="text-center inputDiv form-control" onChange={handleFormChange} value={formData.color} required type="text" name="color" id="color"/>
                        </div>
                        <div className="col-12">
                            <input placeholder="Picture Url..." className="text-center inputDiv form-control" onChange={handleFormChange} value={formData.picture_url} required type="text" name="picture_url" id="picture_url"/>
                        </div>
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
                            <Stepper currentStep={currentStep} />
                    </div>
                    <div className='inputsDiv'>
                    <div className="col-12 mb-2">
                        <input placeholder="Price..." className="text-center inputDiv form-control" onChange={handleFormChange} value={formData.price} type="number" step="0.01" name="price" id="price"/>
                    </div>
                    <div className="col-12 mb-2">
                        <input placeholder="Sizes..." className="text-center inputDiv form-control" onChange={handleFormChange} value={formData.sizes} type="text" step="0.01" name="sizes" id="sizes"/>
                    </div>
                    <div className="descriptionShoeForm">
                        <textarea placeholder="Description..." className="text-center inputDiv form-control" onChange={handleFormChange} value={formData.description} required type="text" name="description" id="description"/>
                    </div>
                    </div>
                </div>
                </>
            );
        default:
            return null;
    }
};

export default ShoeForm;
