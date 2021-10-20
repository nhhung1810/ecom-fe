import { useState } from 'react';
import StarRatings from 'react-star-ratings';

export const RatingGroup = props => {
    const [rating, setRating] = useState(4)
    return (
        <div className="info__info-rating">
            <StarRatings
                rating={rating}
                starRatedColor="#ffd543"
                numberOfStars={5}
                name='rating'
                starSpacing="2px"
                starDimension="16px"
            />
            <span className="info__info-rating-line"></span>
            <span className="info__info-rating-text">0 Review</span>
        </div>
    )
}