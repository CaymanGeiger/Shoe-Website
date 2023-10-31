import {useState, useEffect} from 'react';
import "./ShoeDetail.css"


const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();


function ShoeDetail() {
    const [shoe, setShoe] = useState([]);

    async function loadShoe() {
        const response = await fetch('http://localhost:8080/api/shoe/23/');
        const data = await response.json();
        setShoe(data);
        console.log(data.picture_url)
    }
    useEffect(() => {
        loadShoe();
    }, []);


return (

    <div className='product'>
        <h1>Product</h1>
        <div className='col box'>
            <div className='col-10 card'>
                <div className="imgContainer">
                    <div style={{display: "flex", justifyContent: "center"}}>
                    <h5 style={{fontSize: "1.5em", borderBottom: "1px solid black"}}className='tableData'>{shoe.gender}'s</h5>
                    </div>
                    <img className="img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStKTMi4YU50ySf7c-KXYeIqXU1Xk4cNF9ITg&usqp=CAU"/>
                </div>
                <div className='description'>
                    <p> Step into the world of fashion and comfort with our latest collection of sneakers. These versatile shoes are designed to elevate your style while keeping your feet cozy all day long. Crafted with precision, our sneakers feature a perfect blend of modern design and cutting-edge technology. Whether you're hitting the streets, the gym, or just looking to make a fashion statement, our sneakers have got you covered.
                        Our sneakers come in a variety of trendy colors and patterns, allowing you to express your unique personality and match your outfits effortlessly. The carefully selected materials ensure durability and breathability, making them suitable for any season. With cushioned insoles and shock-absorbing soles, each step feels like a breeze, reducing fatigue during long walks or workouts.
                        Experience the perfect fit with our range of sizes, catering to men, women, and kids. From classic low-tops for a timeless look to high-tops for added ankle support, we offer a style for every occasion. Whether you prefer a minimalistic design or bold branding, our collection has options to suit your taste.</p>
                </div>
            </div>
            <div className='card2'>
                <div className='shoeInfo'>
                    <div style={{display: "flex", justifyContent: "center"}}>
                    <h3 style={{fontSize: "1.5em", borderBottom: "1px solid black"}}>Shoe Details</h3>
                    </div>
                <div>
                <hr></hr>
                <h5>Brand</h5>
                <p className='tableData'>{shoe.brand}</p>
                <hr></hr>
                <h5>Category</h5>
                <p className='tableData'>{shoe.category}</p>
                <hr></hr>
                <h5>Price</h5>
                <p className='tableData'>{shoe.price}</p>
                <hr></hr>
                <h5>Size</h5>
                <p className='tableData'>{shoe.size}</p>
                <hr></hr>
                <h5>Color</h5>
                <p className='tableData'>{shoe.color}</p>
                <hr></hr>
                <h5>Sku</h5>
                <p className='tableData'>{shoe.sku}</p>
                </div>
                </div>
            </div>
        </div>

    </div>
);
}
export default ShoeDetail;
