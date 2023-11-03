import "./ShoePage.css"
import {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faShare, faHeart } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom"
import StarRating from "./Reviews/Stars"
import { useAuth } from '../Auth/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import { useToast } from '../ToastContext';
import { useModal } from '../Accounts/SignInModal';



function ShoePage(){
    const [shoes, setShoes] = useState([]);
    const [userFavorites, setUserFavorites] = useState([]);
    const [lastFavoritedShoeId, setLastFavoritedShoeId] = useState(null);
    const [brandSearched, setBrandSearched] = useState(false);
    const [priceSearched, setPriceSearched] = useState(false);
    const [nameSearched, setNameSearched] = useState(false);
    const [nameSearch, setNameSearch] = useState("");
    const [brandSearch, setBrandSearch] = useState("");
    const [priceSearch, setPriceSearch] = useState("");
    const { userId } = useAuth();
    const showToast = useToast();
    const { openModal } = useModal();


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
    useEffect(() => {
        loadFavorites();
        loadShoes();
    }, []);



    function HandleBrandSearch(e) {
        setBrandSearch(e.target.value)
    }

    function HandlePriceSearch(e) {
        setPriceSearch(e.target.value)
    }

    function HandleNameSearch(e) {
        setNameSearch(e.target.value)
    }

    function HandleNameSearchClick() {
        setNameSearched(true)
    }

    function HandleBrandSearchClick() {
        setBrandSearched(true)
    }

    function HandlePriceSearchClick() {
        setPriceSearched(true)
    }

    useEffect(() => {
    async function filterBrands() {
        if (brandSearched !== "") {
            const response = await fetch('http://localhost:8080/api/shoes/');
            const data = await response.json();
            const filteredBrands = data.shoes.filter(shoe =>
                shoe.brand.toLowerCase().includes(brandSearch.toLowerCase())
            );
            setShoes(filteredBrands);
        }
    }
        filterBrands();
        setPriceSearch("")
        setNameSearch("")
        setBrandSearched(false)
    }, [brandSearched]);


    useEffect(() => {
    async function filterPrice() {
        if (priceSearch !== ""){
            const response = await fetch('http://localhost:8080/api/shoes/');
            const data = await response.json();
            const filteredBrands = data.shoes.filter(shoe =>
                String(shoe.price).includes(priceSearch)
            );
            setShoes(filteredBrands);
        }
    }
        filterPrice();
        setBrandSearch("")
        setNameSearch("")
        setPriceSearched(false)
    }, [priceSearched]);


    useEffect(() => {
    async function filterName() {
        if (nameSearch !== ""){
            const response = await fetch('http://localhost:8080/api/shoes/');
            const data = await response.json();
            const filteredBrands = data.shoes.filter(shoe =>
                shoe.name.toLowerCase().includes(nameSearch.toLowerCase())
            );
            setShoes(filteredBrands);
        }
    }
        filterName();
        setBrandSearch("")
        setPriceSearch("")
        setNameSearched(false)
    }, [nameSearched]);


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


    return (
        <>
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
                        <div className="col-12 mt-0 d-flex align-items-center">
                            <input placeholder="Search by name.." className="form-control" onChange={HandleNameSearch} value={nameSearch} required type="text" name="nameSearch" id="nameSearch"/>
                            <div className="btn23Div">
                                <button onClick={HandleNameSearchClick}className="btn btn-light ml-2 mb-2 btn23">Search</button>
                            </div>
                        </div>
                        <div className="col-12 mt-0 d-flex align-items-center">
                            <input placeholder="Search by brand.." className="form-control" onChange={HandleBrandSearch} value={brandSearch} required type="text" name="brandSearch" id="brandSearch"/>
                            <div className="btn23Div">
                                <button onClick={HandleBrandSearchClick}className="btn btn-light ml-2 mb-2 btn23">Search</button>
                            </div>
                        </div>
                        <div className="col-12 mt-0 d-flex align-items-center">
                            <input placeholder="Search by price.." className="form-control" onChange={HandlePriceSearch} value={priceSearch} required type="number" name="priceSearch" id="priceSearch"/>
                            <div className="btn23Div">
                                <button onClick={HandlePriceSearchClick}className="btn btn-light ml-2 mb-2 btn23">Search</button>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
            <div className="box gap-3 div3 ">
                {shoes.map((shoe, index) => {
                const isFavorited = userFavorites.some(favorite => favorite.shoe_id === shoe.id);
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
                            <img key={index} className="img" src={shoe.picture_url}/>
                        </div>
                    </div>
                </div>
                <div key={shoe.id} className="card">
                    <div className="productsText">
                        <div className="nameReviewDiv">
                        <div className="shoeNameContainer">
                            <h2 className="shoeNameH2"><Link className="shoeName" to={`/shoes/${shoe.id}`}>{ shoe.name }</Link></h2>
                        </div>
                        <div className="shoePageStarsDiv">
                            <StarRating shoeID={shoe.id} starStyle={{ fontSize: '2em', width: '28px', height: '25px',color: "grey"}}  ratingValue="average" />
                        </div>
                        </div>
                        </div>
                        <div className="shoeBranDiv">
                            <h3 className="shoeBrand">{shoe.brand}</h3>
                        </div>
                        <div className="shoePriceDiv">
                            <h3 className="shoePrice">${shoe.price}</h3>
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
