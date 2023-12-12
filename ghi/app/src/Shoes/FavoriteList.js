import "./ShoePage.css"
import {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare, faHeart } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom"
import StarRating from "./Reviews/Stars"
import { useAuth } from '../Auth/AuthContext';


function FavoriteList(){
    const [userFavorites, setUserFavorites] = useState([]);
    const [lastFavoritedShoeId, setLastFavoritedShoeId] = useState(null);
    const [noFavorites, setNoFavorites] = useState(false);
    console.log(noFavorites)
    const { userId } = useAuth();
    console.log(userFavorites)

    async function loadFavorites() {
        const response = await fetch(`http://localhost:8000/api/favorites/${userId}/`);
        const data = await response.json();
        console.log(data)
        if (data.favorites.length > 0){
        setUserFavorites(data.favorites);
        } else {
            setNoFavorites(true)
        }
    }
    useEffect(() => {
        loadFavorites();
    }, []);


    async function handleHeartClick(shoeId) {
        setLastFavoritedShoeId(shoeId);
        const isFavorited = userFavorites.some(favorite => favorite.shoe_id === shoeId);

        if (!(isFavorited)){
        const response = await fetch (`http://localhost:8000/api/favorites/${shoeId}/${userId}/`, {
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
            const favoritedItem = userFavorites.find(favorite => favorite.shoe_id === shoeId);
            const favoriteId = favoritedItem.favorite_id;
            console.log(favoritedItem)
            const response = await fetch (`http://localhost:8000/api/favorite/${favoriteId}/`, {
            method: "DELETE"
        });

        if (response.ok){
        await loadFavorites();
        setUserFavorites(prevFavorites => prevFavorites.filter(favorite => favorite.shoe_id !== shoeId));
        } else {
            alert("Not Deleted!")
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
            <div className="App1 h1Container">
                <button className="textBarButton" onClick={goPrevious}>&lt;</button>
                <div className="textBarSpanDiv">
                <span className="textBarSpan">{messages[currentIndex]}</span>
                </div>
                <button className="textBarButton"  onClick={goNext}>&gt;</button>
            </div>
            <div className="products">
                {noFavorites ? (
                <div className="noFavortiesDiv">
                    <h2 className="noFavorites">No Favorites Added!</h2>
                        <div className='shopButtonLinkDiv' >
                            <div className='shopButtonLinkDivCenter'>
                                <p className="shopText">Check Out Our Catalog!</p>
                                <Link className='shopButtonLink' to="/shoes">
                                    <button className="shopButtonFavorites">Shop</button>
                                </Link>
                            </div>
                        </div>
                </div>
            ) : (
                <>
                <div className="favoritesTitleDiv">
                    <h2 className="favoritesTitle"> My Favorites</h2>
                </div>
                <div className="box gap-3 div3 ">
                    {userFavorites.map((item) => {
                    const isFavorited = userFavorites.some(favorite => favorite.shoe_id === item.shoe.id);
                    console.log(`Shoe ID: ${item.shoe.id}, Is Favorited: ${isFavorited}`);
                    return (
                        <div key={item.shoe.id} className="mainCard">
                        <div className="topCard">
                            <div className="small_card">
                            {isFavorited ? (
                                <FontAwesomeIcon onClick={() => handleHeartClick(item.shoe.id)} className="iconHeartFavorited" icon={faHeart} />
                            ) : (
                                <FontAwesomeIcon onClick={() => handleHeartClick(item.shoe.id)} className={item.shoe.id === lastFavoritedShoeId ? "iconHeart small_card show" : "iconHeart"} icon={faHeart} />
                            )}
                            <FontAwesomeIcon className="iconShare" icon={faShare} />
                            </div>
                            <div className="image">
                            <img className="img" src={item.shoe.picture_url} alt={`Shoe ${item.shoe.name}`} />
                            </div>
                        </div>
                        <div className="card">
                            <div className="productsText">
                            <div className="nameReviewPageDiv">
                                <div className="shoeNameContainer">
                                <h2 className="shoeNameH2"><Link className="shoeName" to={`/shoes/${item.shoe.id}`}>{item.shoe.name}</Link></h2>
                                </div>
                                <div className="shoePageStarsDiv">
                                <StarRating shoeID={item.shoe.id} starStyle={{ fontSize: '2em', width: '28px', height: '25px', color: "grey" }} ratingValue="average" />
                                </div>
                            </div>
                            </div>
                            <div className="shoeBrandDiv">
                            <h3 className="shoeBrand">{item.shoe.brand}</h3>
                            </div>
                            <div className="shoePriceDiv">
                            <h3 className="shoePrice">${item.shoe.price}</h3>
                            </div>
                        </div>
                        </div>
                    );
                    })}
                </div>
                </>
            )}
            </div>
        </>
    )
}
export default FavoriteList;
