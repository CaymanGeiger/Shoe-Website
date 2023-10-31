import React, { useState } from 'react';
import "./BinForm.css"


function BinForm() {
    const [formData, setFormData] = useState({
        closet_name: '',
        bin_number: '',
        bin_size: '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const binUrl = 'http://localhost:8100/api/bins/';

        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(binUrl, fetchConfig);

        if (response.ok) {
            setFormData({
                closet_name: '',
                bin_number: '',
                bin_size: '',
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
    return (
        <div className="row">
            <div className="offset-4 col-4">
                <div className="shadow mt-4 formStore">
                    <div className="col-12 mb-3 mt-0 pt-0 formHeaderContainer" >
                    <h1 className="text-center formHeader1">
                        Store Creation
                    </h1>
                    </div>
                    <form onSubmit={handleSubmit} id="create-shoe-form">
                        <div className="col-12 mb-2">
                            <input placeholder="Store Name" className="form-control text-center" onChange={handleFormChange} value={formData.closet_name} required type="text" name="closet_name" id="closet_name"/>
                            <label htmlFor="closet_name"></label>
                        </div>
                        <div className="col-12 mb-2">
                            <input placeholder="Bin Number" className="form-control text-center" onChange={handleFormChange} value={formData.bin_number} required type="number" name="bin_number" id="bin_number"/>
                            <label htmlFor="bin_number"></label>
                        </div>
                        <div className="col-12 mb-2">
                            <input placeholder="Bin Size" className="form-control text-center" onChange={handleFormChange} value={formData.bin_size} required type="number" name="bin_size" id="bin_size"/>
                            <label htmlFor="bin_size"></label>
                        </div>
                        <button className="btn btn-primary col-12 ">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default BinForm;
