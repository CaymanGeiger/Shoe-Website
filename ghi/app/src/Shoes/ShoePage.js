import "./ShoePage.css"
import {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faShare, faHeart } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom"
import { FilterBrands, FilterCategory, FilterPrice } from "./ShoePageFilter";
import StarRating from "./Reviews/Stars"
import { useAuth } from '../Auth/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import { useToast } from '../ToastContext';
import { useModal } from '../Accounts/SignInModal';



function ShoePage(){
    const [shoes, setShoes] = useState([]);
    const [apiShoes, setApiShoes] = useState([]);
    const [userFavorites, setUserFavorites] = useState([]);
    const [filteredShoes, setFilteredShoes] = useState(shoes);
    const [lastFavoritedShoeId, setLastFavoritedShoeId] = useState(null);
    const { userId } = useAuth();
    const showToast = useToast();
    const { openModal } = useModal();
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
    console.log(apiShoes)


    async function loadApiShoes() {
        const keyword = encodeURIComponent('Nike Dunk');
        const limit = 10;
        const response = await fetch(`http://localhost:3001/products/${keyword}?limit=${limit}`);
        console.log(response)
        if (!response.ok) {
        console.error("Server responded with error:", response.statusText);
        return;
        }
        try {
            const data = await response.json();
            setApiShoes(data);
        } catch (err) {
            console.error("Error parsing server response:", err);
        }
    }

    async function loadShoes() {
        const response = await fetch('http://localhost:8080/api/shoes/');
        const data = await response.json();
        setShoes(data.shoes);
    }

    async function loadFavorites() {
        const response = await fetch(`http://localhost:8080/api/favorites/${userId}/`);
        const data = await response.json();
        setUserFavorites(data.favorites);
    }
    console.log("favorites", userFavorites)
    useEffect(() => {
        loadFavorites();
        loadApiShoes();
        loadShoes();
    }, []);



    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const accountUrl = 'http://localhost:8070/api/accounts/';
    //     const fetchConfig = {
    //         method: "post",
    //         body: JSON.stringify(formData),
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         }

    //     if (formData.password === passwordConfirm){
    //         const response = await fetch(accountUrl, fetchConfig);
    //             if (response.ok) {
    //                 setFormData({
    //                     name: "",
    //                     brand: "",
    //                     categoryr: "",
    //                     price: "",
    //                     size: "",
    //                     color: "",
    //                     sku: "",
    //                     bin: ""
    //                 });
    //                 setPasswordConfirm('')
    //             }
    //     } else {
    //         alert("Passwords Do Not Match")
    //     }
    // }


    //     const handleFormChange = (e) => {
    //     const value = e.target.value;
    //     const inputName = e.target.name;
    //     setFormData({
    //         ...formData,
    //         [inputName]: value
    //     });
    // }


    const handleBrandFilter = (brand) => {
        if (brand === "Brand") {
            setFilteredShoes(shoes);
        } else {
            setFilteredShoes(shoes.filter(shoe => shoe.brand === brand));
        }
    };


    const handleCategoryFilter = (category) => {
        if (category === "Category") {
            setFilteredShoes(shoes);
        } else {
            setFilteredShoes(shoes.filter(shoe => shoe.category === category));
        }
    };


    const handlePriceFilter = (selectedLabel) => {
        if (selectedLabel === "Price Range") {
            setFilteredShoes(shoes);
        } else {
            const range = priceRanges.find(r => r.label === selectedLabel);
            if (range) {
                setFilteredShoes(shoes.filter(shoe => shoe.price >= range.min && shoe.price <= range.max));
            }
        }
    };

    async function handleHeartClick(shoeId) {
        setLastFavoritedShoeId(shoeId);
        const isFavorited = userFavorites.some(favorite => favorite.shoe_id === shoeId);
        if (!(userId)) {
            openModal(true)
            showToast("Please log in first!", "error");
        } else {


        if (!(isFavorited)){
        showToast("Added To Favorites!", "success");
        const response = await fetch (`http://localhost:8080/api/favorites/${shoeId}/${userId}/`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST"
        });
        if (response.ok) {
            await loadFavorites();
            const isAlreadyFavorited = userFavorites.some(favorite => favorite.shoe_id === shoeId);
            if (isAlreadyFavorited) {
                setUserFavorites(prevFavorites => prevFavorites.filter(favorite => favorite.shoe_id !== shoeId));
            } else {
                const newFavorite = {
                    shoe_id: shoeId,
                };
                setUserFavorites(prevFavorites => [...prevFavorites, newFavorite]);
            }

        } else {
            alert("Not Added!");
        }

        } else if (isFavorited){
            showToast("Removed From Favorites!", "error");
            const favoritedItem = userFavorites.find(favorite => favorite.shoe_id === shoeId);
            const favoriteId = favoritedItem.favorite_id;
            console.log(favoritedItem)
            const response = await fetch (`http://localhost:8080/api/favorite/${favoriteId}/`, {
            method: "DELETE"
        });

        if (response.ok){
        setUserFavorites(prevFavorites => prevFavorites.filter(favorite => favorite.shoe_id !== shoeId));
        } else {
            alert("Not Deleted!")
        }
        }
        }
    }
        useEffect(() => {
        if (lastFavoritedShoeId !== null) {
            const timer = setTimeout(() => {
                setLastFavoritedShoeId(null);
            }, 125);
            return () => clearTimeout(timer);
        }}, [lastFavoritedShoeId]);


    const [currentIndex, setCurrentIndex] = useState(0);


    const messages = [
        "MEMBERS: NEW FEATURES ADDED SOON+",
        "YOUR FAVORITE SHOES ALL IN ONE PLACE",
        "NEW ARRIVALS: CHECK OUT OUR COLLECTION"
    ];

    const goNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
    };


    const goPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + messages.length) % messages.length);
    };


    const priceRanges = [
        { label: '$1 - $50', min: 1, max: 50 },
        { label: '$50 - $100', min: 50, max: 100 },
        { label: '$100 - $150', min: 100, max: 150 },
        { label: '$150 - $200', min: 150, max: 200 }
    ];

    return (
        <>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        </head>
            <div className="App h1Container">
                <button className="textBarButton" onClick={goPrevious}>&lt;</button>
                <div className="textBarSpanDiv">
                <span className="textBarSpan">{messages[currentIndex]}</span>
                </div>
                <button className="textBarButton"  onClick={goNext}>&gt;</button>
            </div>
            <div className="products">
            <h4 className="yyy">Wardrobify Shoes And Sneakers({shoes.length})</h4>
            <div  className="shoePageColumns">
            <div className="filterSideWindowDiv">
                <div className="filterSideWindow">
                    <ul className="filterList">
                    <li className="filterListItem">
                        <FilterBrands shoes={shoes} onBrandSelected={handleBrandFilter} />
                    </li>
                    <li className="filterListItem">
                        <FilterCategory shoes={shoes} onCategorySelected={handleCategoryFilter} />
                    </li>
                    <li className="filterListItem">
                        <FilterPrice shoes={shoes} onPriceSelected={handlePriceFilter} />
                    </li>
                    </ul>
                </div>
            </div>
            <div className="box gap-3 div3 ">
                {apiShoes.map((shoe, index) => {
                const isFavorited = userFavorites.some(favorite => favorite.shoe_id === shoe.id);
                console.log(`Shoe ID: ${shoe.id}, Is Favorited: ${isFavorited}`);
            return (
                <div key={shoe.id} className="mainCard">
                <div className="topCard">
                    <div className="hoverItems">
                        <div className="small_card">
                            {isFavorited ?
                            <FontAwesomeIcon onClick={() => handleHeartClick(shoe.id)} className="iconHeartFavorited" icon={faHeart} />
                            : <FontAwesomeIcon onClick={() => handleHeartClick(shoe.id)} className={shoe.id === lastFavoritedShoeId ? "iconHeart small_card show" : "iconHeart"} icon={faHeart} />
                            }
                            <FontAwesomeIcon  className="iconShare" icon={faShare} />
                        </div>
                        <div className="image">
                            <img key={index} className="img" src={shoe.thumbnail}/>
                        </div>
                    </div>
                </div>
                <div key={shoe.id} className="card">
                    <div className="productsText">
                        <div className="nameReviewDiv">
                        <div className="shoeNameContainer">
                            <h2 className="shoeNameH2"><Link className="shoeName" to={`/shoes/${shoe.id}`}>{ shoe.silhoutte }</Link></h2>
                        </div>
                        <div className="shoePageStarsDiv">
                            <StarRating shoeID={shoe.id} starStyle={{ fontSize: '1.5em', width: '20px', height: '20px',color: "grey" }}  ratingValue="average" />
                        </div>
                        </div>
                        </div>
                        <div className="shoeBranDiv">
                            <h3 className="shoeBrand">{shoe.brand}</h3>
                        </div>
                        <div className="shoePriceDiv">
                            <h3 className="shoePrice">${shoe.retailPrice}</h3>
                        </div>
                </div>
                </div>
                );
        })}
            </div>
            </div>
        </div>

        </>
    )
}
export default ShoePage;
