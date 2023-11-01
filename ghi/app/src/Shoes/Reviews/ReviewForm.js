import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faX } from '@fortawesome/free-solid-svg-icons';
import { faStar as farFaStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasFaStar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../Auth/AuthContext';
import "../ShoePage.css"
import 'react-toastify/dist/ReactToastify.css';
import { useToast } from '../../ToastContext';



function SubmitStarRating({ shoeID, onSuccess }) {
    const [hoveredStar, setHoveredStar] = useState(null);
    const [selectedStar, setSelectedStar] = useState(null);
    const [showModel, setShowModel] = useState(false);
    const { userId } = useAuth();
    const showToast = useToast();


    const [formData, setFormData] = useState({
        rating: '',
        rating_description: '',
    });


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (userId) {
        const ratingUrl = `http://localhost:8080/api/ratings/${shoeID}/${userId}/`;
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
            }
        try {
            const response = await fetch(ratingUrl, fetchConfig);

            if (response.ok) {
                showToast("Thanks For Your Review!", "success");
                setFormData({
                    rating: '',
                    rating_description: '',
                });
                setShowModel(false)
            } else {
                console.error('Rating failed');
            }
        } catch (error) {
            console.error('Error during rating:', error);
        }
        } else {
            alert("You Must Be Signed In")
        }
    }

    const handleFormChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;
        setFormData({
            ...formData,
            rating: selectedStar,
            [inputName]: value
        });
    }



    const handleCreateReviewClick = () => {
        setShowModel(true)
    };

    const handleCloseClick = () => {
        setShowModel(false)
    };

    const handleStarClick = (e, starNumber) => {
        e.preventDefault();
        const starElement = e.currentTarget.getBoundingClientRect();
        const starHalfWidth = starElement.width / 2;
        const clickPosition = e.clientX - starElement.left;

        if (clickPosition < starHalfWidth) {
            setSelectedStar(starNumber - 0.5);
        } else {
            setSelectedStar(starNumber);
        }
    };


    const handleStarMouseMove = (e, starNumber) => {
        const starElement = e.currentTarget.getBoundingClientRect();
        const starHalfWidth = starElement.width / 2;
        const hoverPosition = e.clientX - starElement.left;

        if (hoverPosition < starHalfWidth) {
            setHoveredStar(starNumber - 0.5);
        } else {
            setHoveredStar(starNumber);
        }
    };



    return (
    <div className="products_star">
        <div className='newReviewDivForm'>
            <button className='newReviewForm' onClick={handleCreateReviewClick}>Write a Review</button>
        </div>
                {showModel && <div className="overlay"></div>}
                <div className={showModel ? "ratingModel show" : "ratingModel"}>
                    <div className='topSection'>
                        <div className='modelWindowXAndRate'>
                            <div className='rateStarsDiv'>
                                <h2 className='rateStars'>Rate {selectedStar} stars </h2>
                            </div>
                            <div className='exitButtonDiv'>
                                <button onClick={handleCloseClick} className='exitButton'><FontAwesomeIcon size="1x"icon={faX} /></button>
                            </div>
                        </div>
                    </div>
                    <div>
                    {[1, 2, 3, 4, 5].map((starNumber) => {
                        let iconToUse = farFaStar;
                        const currentRating = hoveredStar
                        if (currentRating >= starNumber) {
                            iconToUse = fasFaStar;
                        } else if (currentRating >= starNumber - 0.5) {
                            iconToUse = faStarHalfAlt;
                        }
                        return (
                            <FontAwesomeIcon
                                key={starNumber}
                                className="starIcon1 fa-fw"
                                icon={iconToUse}
                                onMouseMove={(e) => handleStarMouseMove(e, starNumber)}
                                onMouseLeave={() => setHoveredStar(selectedStar)}
                                onClick={(e) => handleStarClick(e, starNumber)}
                                color="transparent"
                                style={{ color: iconToUse !== farFaStar ? 'gold' : 'grey' }}
                            />
                        );
                    })}
                    </div>
                    <form onSubmit={handleSubmit} id="sign-in-form">
                    <div className='ratingContent'>
                        <div className='ratingDescDiv'>
                            <textarea className='ratingDesc form-control' placeholder="Describe your rating..." onChange={handleFormChange} value={formData.rating_description} required type="text" name="rating_description" id="rating_description"></textarea>
                        </div>
                        <div className='submitRatingDiv'>
                            <button className="submitRating" onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                    </form>
                </div>
        </div>
    );
}

export default React.memo(SubmitStarRating);
