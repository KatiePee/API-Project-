import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createReviewThunk } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import { fetchSpot } from "../../store/spots";

export default function CreateReviewModal({ props: { spot, user } }) {
  const [review, setReview] = useState('');
  const [stars, setStars] = useState(null);
  const [activeStars, setActiveStars] = useState(null)
  const [errors, setErrors] = useState(false);
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal()
  let disable = false
  review.length > 9 || (disable = true);
  stars || (disable = true);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReview = dispatch(createReviewThunk({ review, stars }, spot.id, user));
    newReview.errors && setErrors(newReview.errors)
    return newReview
      .then(() => dispatch(fetchSpot(spot.id)))
      .then(closeModal)
  }

  const handleBlur = () => {
    if (review.length < 10) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  };

  return (
    <div className='modal-card'>
      <h2>How was your stay?</h2>
      {errors.review && <p className='errors form__errors'>{errors.review}</p>}
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Leave your review here...."
        onBlur={handleBlur}
      />
      {showError && <p className='errors form__errors'>Review must be more than 10 characters.</p>}

      <div className="star-container">
        <div className={stars >= 1 || activeStars >= 1 ? 'star-filled' : 'star-empty'}
          onClick={(e) => setStars(1)}
          onMouseEnter={(e) => setActiveStars(1)}
          onMouseLeave={(e) => setActiveStars(stars)}
        >
          <i className="fa-sharp fa-solid fa-star"></i>
        </div>
        <div className={stars >= 2 || activeStars >= 2 ? 'star-filled' : 'star-empty'}
          onClick={(e) => setStars(2)}
          onMouseEnter={(e) => setActiveStars(2)}
          onMouseLeave={(e) => setActiveStars(stars)}
        >
          <i className="fa-sharp fa-solid fa-star"></i>
        </div>
        <div className={stars >= 3 || activeStars >= 3 ? 'star-filled' : 'star-empty'}
          onClick={(e) => setStars(3)}
          onMouseEnter={(e) => setActiveStars(3)}
          onMouseLeave={(e) => setActiveStars(stars)}
        >
          <i className="fa-sharp fa-solid fa-star"></i>
        </div>
        <div className={stars >= 4 || activeStars >= 4 ? 'star-filled' : 'star-empty'}
          onClick={(e) => setStars(4)}
          onMouseEnter={(e) => setActiveStars(4)}
          onMouseLeave={(e) => setActiveStars(stars)}
        >
          <i className="fa-sharp fa-solid fa-star"></i>
        </div>
        <div className={stars >= 5 || activeStars >= 5 ? 'star-filled' : 'star-empty'}
          onClick={(e) => setStars(5)}
          onMouseEnter={(e) => setActiveStars(5)}
          onMouseLeave={(e) => setActiveStars(stars)}
        >
          <i className="fa-sharp fa-solid fa-star"></i>
        </div>
        <span> Stars</span>
      </div>

      <button type="submit" onClick={handleSubmit} disabled={disable}>Submit Your Review</button>


    </div>
  )
}