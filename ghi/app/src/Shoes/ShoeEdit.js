import React, { useEffect, useState } from 'react';
import "./ShoeForm.css"


function ShoeForm() {
    const [bins, setBins] = useState([]);
    const [bin, setBin] = useState('');
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');
    const [sku, setSku] = useState('');

    const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
    }
    const handleBrandChange = (event) => {
    const value = event.target.value;
    setBrand(value);
    }
    const handleCategoryChange = (event) => {
    const value = event.target.value;
    setCategory(value);
    }
    const handlePriceChange = (event) => {
    const value = event.target.value;
    setPrice(value);
    }
    const handleSizeChange = (event) => {
    const value = event.target.value;
    setSize(value);
    }
    const handleColorChange = (event) => {
    const value = event.target.value;
    setColor(value);
    }
    const handleBinChange = (event) => {
    const value = event.target.value;
    setBin(value);
    }
    const handleSkuChange = (event) => {
    const value = event.target.value;
    setSku(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};

        data.name = name;
        data.brand = brand;
        data.category = category;
        data.price = price;
        data.size = size;
        data.color = color;
        data.bin = bin;
        data.sku = sku;
        console.log(data);

        const shoeUrl = `http://localhost:8080/api/shoes/`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json',
            },
        };

        const response = await fetch(shoeUrl, fetchConfig);
        if (response.ok) {
            const newShoe = await response.json();
            console.log(newShoe);
            setName('');
            setBrand('');
            setCategory('');
            setPrice('');
            setSize('');
            setColor('');
            setBin('');
            setSku('');
            alert("dsasdasdsada")
        }
    }

    async function fetchData() {
    const response =  await fetch ('http://localhost:8100/api/bins/');
    const data = await response.json();
    setBins(data.bins);
    }

    useEffect(() => {
    fetchData();
    }, []);
return (
<div className="row">
    <div className="offset-3 col-6">
    <div className="shadow p-4 mt-4">
        <h1>Create a new shoe</h1>
        <form onSubmit={handleSubmit} id="create-shoe-form">
        <div className="form-floating mb-3">
            <input onChange={handleNameChange} placeholder="Name"
            required type="text" name="name" id="name"
            className="form-control" value={name} />
            <label htmlFor="name">Name</label>
        </div>
        <div className="form-floating mb-3">
            <input onChange={handleBrandChange} placeholder="Brand"
            required type="text" name="brand" id="brand"
            className="form-control" value={brand} />
            <label htmlFor="brand">Brand</label>
        </div>
        <div className="form-floating mb-3">
            <input onChange={handleCategoryChange} placeholder="Category"
            required type="text" name="category" id="category"
            className="form-control" value={category} />
            <label htmlFor="category">Category</label>
        </div>
        <div className="form-floating mb-3">
            <input onChange={handlePriceChange} placeholder="Price"
            required type="number" step="0.01" name="price" id="price"
            className="form-control" value={price} />
            <label htmlFor="price">Price</label>
        </div>
        <div className="form-floating mb-3">
            <input onChange={handleSizeChange} placeholder="Size"
            required type="number" step="0.01" name="size" id="size"
            className="form-control" value={size} />
            <label htmlFor="size">Size</label>
        </div>
        <div className="form-floating mb-3">
            <input onChange={handleColorChange} placeholder="Color"
            required type="text" name="color" id="color"
            className="form-control" value={color} />
            <label htmlFor="color">Color</label>
        </div>
        <div className="form-floating mb-3">
            <input onChange={handleSkuChange} placeholder="Sku"
            required type="number" name="sku" id="sku"
            className="form-control" value={sku} />
            <label htmlFor="sku">Sku</label>
        </div>
        <div className="mb-3">
            <select value={bin} onChange={handleBinChange} required name="bin" id="bin" className="form-select">
            <option>Choose a store</option>
            {bins.map(bin => {
                return (
                <option key={bin.href} value={bin.href} >
                {bin.closet_name}
                </option>
                );
            })}
            </select>
        </div>
        <button className="btn btn-primary">Create</button>
        </form>
    </div>
    </div>
</div>
);
}
export default ShoeForm;
