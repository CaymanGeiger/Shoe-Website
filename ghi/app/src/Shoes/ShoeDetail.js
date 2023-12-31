import {useState, useEffect} from 'react';
import "./ShoeDetail.css"
import { useParams } from 'react-router-dom';
import StarRating from "./Reviews/Stars"
import SubmitStarRating from "./Reviews/ReviewForm"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../Auth/AuthContext';
import { useToast } from '../ToastContext';
import { useModal } from '../Accounts/SignInModal';
import { Modal, Box } from '@mui/material';
import QuantitySelection from "./QuantitySelection"

function ShoeDetail() {
    const [shoe, setShoe] = useState({});
    const [activeTab, setActiveTab] = useState('details');
    const [quantity, setQuantity] = useState(0);
    const [selectingQuantity, setSelectingQuantity] = useState(false);
    const [cart, setCart] = useState(0);
    const [showReviewModel, setShowReviewModel] = useState(false);
    const [showCreateReviewModel, setShowCreateReviewModel] = useState(false);
    const { userId } = useAuth();
    const showToast = useToast();
    const { openModal } = useModal();
    console.log(quantity)
    const { id } = useParams();

    const handleTouchMove = (event) => {

    };

    useEffect(() => {
        document.addEventListener('touchmove', handleTouchMove, { passive: true });

        async function loadShoe() {
            const response = await fetch(`http://localhost:8000/api/shoe/${id}/`);
            const data = await response.json();
            setShoe(data);
        }

        loadShoe();
        async function loadCart() {
            if (userId) {
                const response = await fetch(`http://localhost:8000/api/items/${userId}/`);
                const data = await response.json();
                setCart(data.cart_id);
            }
        }

        loadCart();
        return () => {
            document.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);


    async function HandleAddToCartClick() {
        setSelectingQuantity(true)
            if (!(userId)) {
                openModal(true)
                showToast("Please log in first!", "error");
            }
            if (quantity) {
                const response = await fetch (`http://localhost:8000/api/items/${shoe.id}/${cart}/${quantity}/`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST"
                });
                console.log(response)
            if (response.ok) {
                showToast("Added To Cart!", "success");
            } else {
            }
        }
    }


    const randomNumber = Math.floor(Math.random() * 9) + 1;

    const handleQuantitySelectionClose = () => {
        setSelectingQuantity(false)
    }

    const handleQuantityChange = (newQuantity) => {
        setQuantity(newQuantity);
    };

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };


    const handleAllReviewsClick = () => {
        setShowReviewModel(!showReviewModel)
    };

    const handleCreateReviewClick = () => {
        setShowCreateReviewModel(!showCreateReviewModel)
    };



return (
    <div className='detailMainDiv'>
        {selectingQuantity && (
                <Modal
                    open={selectingQuantity}
                    onClose={handleQuantitySelectionClose}
                >
                    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <QuantitySelection
                    onQuantityChange={handleQuantityChange}
                    HandleAddToCartClick={HandleAddToCartClick}
                    closeSelection={handleQuantitySelectionClose} />
                    </Box>
                </Modal>
            )}
    <div className='product'>
        <div className='boxesDiv'>
            <div className='col-md-10 col-sm-12 card'>
                <div className="imgContainer">
                    <div className='image1Div'>
                    <img className="image1 img-fluid" src={shoe.picture_url}/>
                    </div>
                </div>
            </div>
            <div className='card2'>
                <div className='shoeInfo'>
                    <div className='nameDiv'>
                    <h5 className='name'>{shoe.name}</h5>
                    </div>
                <hr className='hr'></hr>
                <div className='tableDataDiv'>
                    <div className='tableDataHeaderDiv'>
                        <h5 className='tableDataHeader'>Brand</h5>
                        <p className='tableData'>{shoe.brand}</p>
                        <hr className='hr'></hr>
                    </div>
                    <div className='tableDataHeaderDiv'>
                        <h5 className='tableDataHeader'>Price</h5>
                        <p className='tableData'>{shoe.price}</p>
                        <hr className='hr'></hr>
                    </div>
                    <div className='tableDataHeaderDiv'>
                        <h5 className='tableDataHeader'>Sizes</h5>
                        <p className='tableData'>6.5 | 7.0 | 7.5</p>
                        <hr className='hr'></hr>
                    </div>
                    <div className='tableDataHeaderDiv'>
                        <h5 className='tableDataHeader'>Color</h5>
                        <p className='tableData'>{shoe.color}</p>
                        <hr className='hr'></hr>
                    </div>
                </div>
                </div>
                <div className='addToCartButtonDiv'>
                    <button onClick={HandleAddToCartClick} className='addToCartButton'>
                        Add To Cart
                    </button>
                </div>
            </div>
        </div>
    </div>
        <div className="tab-section">
            <ul className="tab-list">
                <li className={`tab-item ${activeTab === 'details' ? 'active' : ''}`} onClick={() => handleTabClick('details')}>Details</li>
                <li className={`tab-item ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => handleTabClick('reviews')}>Reviews</li>
            </ul>
            <div className="tab-content">
                <div style={{ display: activeTab === 'details' ? 'block' : 'none' }}>
                    <p>{shoe.description}</p>
                </div>
                <div style={{ display: activeTab === 'reviews' ? 'block' : 'none' }}>
                    <div className='averageNameAndReview'>
                            <h4>{shoe.name}</h4>
                            <StarRating shoeID={shoe.id} isClickable={false} ratingValue={"average"}/>
                    </div>
                    <div className='newReviewDiv'>
                        <SubmitStarRating shoeID={shoe.id}/>
                    </div>
                    <div className='shoeAllReviews'>
                        <div className='averageNameAndReview'>
                            <button onClick={handleAllReviewsClick} className='averageReviewAllButton'>
                                All Reviews
                                {showReviewModel ? (
                                    <span style={{ color: 'black', fontSize: "13px", marginLeft: "5px" }}>&#9650;</span>
                                    ) : (
                                    <span style={{ color: 'black', fontSize: "13px", marginLeft: "5px" }}>&#9660;</span>
                                    )}
                            </button>
                        </div>
                    </div>
                    <div className='reviewsShoeDiv'>
                        {showReviewModel && (
                            shoe.serialized_ratings && shoe.serialized_ratings.ratings && shoe.serialized_ratings.ratings.length > 0 ? (
                                shoe.serialized_ratings.ratings.map((rating, index) => (
                                    <div key={index} className='reviewsShoe'>
                                        <div className='reviewsShoeNameDiv'>
                                            <h6 className='reviewsShoeName'>{rating.account}</h6>
                                        </div>
                                        <StarRating shoeID={shoe.id} forceRatingValue={parseFloat(rating.rating)}  />
                                        <div className='reviewsShoeDescriptionDiv'>
                                            <p className='reviewsShoeDescription'>{rating.rating_description}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No reviews available.</p>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
);
}
export default ShoeDetail;
