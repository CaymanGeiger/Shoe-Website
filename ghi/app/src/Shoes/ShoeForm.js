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
    const [description, setDescription] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');

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
    const handleDescriptionChange = (event) => {
    const value = event.target.value;
    setDescription(value);
    }
    const handlePictureUrlChange = (event) => {
    const value = event.target.value;
    setPictureUrl(value);
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
        data.description = description
        data.picture_url = pictureUrl
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
            setDescription('');
            setPictureUrl('');
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
    <div>
    <div>

    </div>
    <div className="offset-3 col-6">
    <div className="form-row p-5 mt-4 form formShoe">
        <div className="col-12 mb-3 mt-0 pt-0 formHeaderContainer">
        <h1 className="text-center formHeaderShoeForm">Add a Shoe!</h1>
        </div>
        <form onSubmit={handleSubmit} id="create-shoe-form">
        <div className="row">
        <div className="col-6 mb-2">
            <input onChange={handleNameChange} placeholder="Name"
            required type="text" name="name" id="name"
            className="form-control text-center inputBoxes" value={name} />
            <label htmlFor="name" ></label>
        </div>
        <div className="col-6 mb-2">
            <input onChange={handleBrandChange} placeholder="Brand"
            required type="text" name="brand" id="brand"
            className="form-control text-center inputBoxes" value={brand} />
            <label htmlFor="brand"></label>
        </div>
        <div className="col-12 mb-2">
            <textarea onChange={handleDescriptionChange} placeholder="Description"
            required type="text" name="description" id="description"
            className="form-control text-center inputBoxes" value={description}></textarea>
            <label htmlFor="description"></label>
        </div>
        <div className="col-6 mb-2">
            <input onChange={handleCategoryChange} placeholder="Category"
            required type="text" name="category" id="category"
            className="form-control text-center inputBoxes" value={category} />
            <label htmlFor="category"></label>
        </div>
        <div className="col-6 mb-2">
            <input onChange={handlePriceChange} placeholder="Price"
            required type="number" step="0.01" name="price" id="price"
            className="form-control text-center inputBoxes" value={price} />
            <label htmlFor="price"></label>
        </div>
        <div className="col-6 mb-2">
            <input onChange={handleSizeChange} placeholder="Size"
            required type="number" step="0.01" name="size" id="size"
            className="form-control text-center inputBoxes" value={size} />
            <label htmlFor="size"></label>
        </div>
        <div className="col-6 mb-2">
            <input onChange={handleColorChange} placeholder="Color"
            required type="text" name="color" id="color"
            className="form-control text-center inputBoxes" value={color} />
            <label htmlFor="color"></label>
        </div>
        <div className="col-12 mb-2">
            <input onChange={handleSkuChange} placeholder="Sku"
            required type="number" name="sku" id="sku"
            className="form-control text-center inputBoxes" value={sku} />
            <label htmlFor="sku"></label>
        </div>
        <div className="col-12 mb-2">
            <input onChange={handlePictureUrlChange} placeholder="Picture Url"
            required type="url" name="picture_url" id="picture_url"
            className="form-control text-center inputBoxes" value={pictureUrl} />
            <label htmlFor="picture_url"></label>
        </div>
        <div className="mb-3">
            <select value={bin} onChange={handleBinChange} required name="bin" id="bin" className="form-select inputBoxes">
            <option className="text-center">Choose a store</option>
            {bins.map(bin => {
                return (
                <option className="text-center " key={bin.href} value={bin.href} >
                {bin.closet_name}
                </option>
                );
            })}
            </select>
        </div>
        <div className='createButtonShoeDiv'>
        <button className="btn col-7 mt-3 createButtonShoe">Create</button>
        </div>
        </div>
        </form>
    </div>
    </div>
    </div>
);
}
export default ShoeForm;
