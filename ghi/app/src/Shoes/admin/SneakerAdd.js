import React, { useState } from "react";
import "./SneakerAdd.css"

function SneakerAdd() {
    const [responseMessage, setResponseMessage] = useState("")
    const [formData, setFormData] = useState({
        keyword: "",
        limit: 0,
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const shoeUrl = "http://localhost:8000/api/scrapesneaks/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(shoeUrl, fetchConfig);
        if (response.ok) {
            setResponseMessage("Add Success")
            setFormData({
                keyword: "",
                limit: 0,
            });
        } else {
            setResponseMessage("Add Failed")
        }
    };

    const handleFormChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;
        setFormData({
            ...formData,
            [inputName]: value,
            limit: parseInt(value)
        });
    };

    return (
        <div>
            <h1>Sneaker Add</h1>
            {responseMessage && (
                <h1 className={responseMessage === "Add Success" ? "addSuccess" : "addFailed"}>
                    {responseMessage}
                </h1>
            )}
            <div className="inputsDiv">
                <div className="col-12 mb-2">
                    <input
                        placeholder="Keyword..."
                        className="text-center inputDiv form-control"
                        onChange={handleFormChange}
                        value={formData.keyword}
                        required
                        type="text"
                        name="keyword"
                        id="keyword"
                    />
                </div>
                <div className="col-12 mb-2">
                    <input
                        placeholder="Limit..."
                        className="text-center inputDiv form-control"
                        onChange={handleFormChange}
                        value={formData.limit}
                        required
                        type="number"
                        name="limit"
                        id="limit"
                    />
                </div>
            </div>
            <button onClick={handleSubmit}>Add</button>
            <ul></ul>
        </div>
    );
}

export default SneakerAdd;
