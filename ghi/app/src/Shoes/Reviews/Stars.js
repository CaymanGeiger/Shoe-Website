import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as farFaStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasFaStar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import "../ShoePage.css"


function StarRating({  starStyle = {}, shoeID, ratingValue = null, forceRatingValue = null }) {
    const [shoeRating, setShoeRating] = useState(ratingValue || null);
    const [shoeRatingAverage, setShoeRatingAverage] = useState(null);

    async function loadRating() {
        try {
            const response = await fetch(`http://localhost:8000/api/shoe/${shoeID}/`);

            if (!response.ok) {
                throw new Error('Response was not ok');
            }

            const data = await response.json();

            if (data.serialized_ratings) {
                const averageRating = data.serialized_ratings.average_rating;
                const roundedRating = Math.round(averageRating * 2) / 2;
                if (averageRating !== undefined) {
                    setShoeRating(roundedRating);
                }
                if (ratingValue === "average"){
                    setShoeRating(roundedRating)
                    setShoeRatingAverage(roundedRating)
                }
            }
        } catch (error) {
            console.error('Cannot get the rating:', error);
        }
    }
    useEffect(() => {
        if (shoeID && ratingValue !== null) {
            loadRating();

        } else {
            setShoeRating(null);
        }
    }, [shoeID, ratingValue]);


    return (
    <div className="products_star">
        {[1, 2, 3, 4, 5].map((starNumber) => {
            let iconToUse = farFaStar;
            const currentRating = forceRatingValue || shoeRating;
            if (currentRating >= starNumber) {
                iconToUse = fasFaStar;
            } else if (currentRating >= starNumber - 0.5) {
                iconToUse = faStarHalfAlt;
            }
            return (
                <FontAwesomeIcon
                    key={starNumber}
                    className="starIcon fa-fw"
                    icon={iconToUse}
                    color="transparent"
                    style={{
                        color: iconToUse !== farFaStar ? 'gold' : 'grey',
                        ...starStyle
                    }}
                />
            );
        })}
            {ratingValue === "average" && (
                <h6></h6>
            )}
        </div>
    );
}

export default React.memo(StarRating);
