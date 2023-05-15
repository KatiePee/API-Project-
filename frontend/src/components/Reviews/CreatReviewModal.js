import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createReviewThunk } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import { fetchSpot } from "../../store/spots";

export default function CreateReviewModal({ props: { spot, user } }) {
  const [review, setReview] = useState('');
  const [stars, setStars] = useState(null);
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

      <div>
        <span onClick={(e) => setStars(1)}><i className="fa-sharp fa-solid fa-star"></i></span>
        <span onClick={(e) => setStars(2)}><i className="fa-sharp fa-solid fa-star"></i></span>
        <span onClick={(e) => setStars(3)}><i className="fa-sharp fa-solid fa-star"></i></span>
        <span onClick={(e) => setStars(4)}><i className="fa-sharp fa-solid fa-star"></i></span>
        <span onClick={(e) => setStars(5)}><i className="fa-sharp fa-solid fa-star"></i></span>
        <span> Stars</span>
      </div>

      <button type="submit" onClick={handleSubmit} disabled={disable}>Submit Your Review</button>


    </div>
  )
}