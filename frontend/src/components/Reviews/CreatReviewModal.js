import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createReviewThunk } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import { fetchSpot } from "../../store/spots";

export default function CreateReviewModal({ props: { spot, user } }) {
  const [review, setReview] = useState('');
  const [stars, setStars] = useState();
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal()
  const handleSubmit = (e) => {
    //need to handle errors
    e.preventDefault();
    return dispatch(createReviewThunk({ review, stars }, spot.id, user))
      .then(() => dispatch(fetchSpot(spot.id)))
      .then(closeModal)
  }
  return (
    <div className='addReview-card'>
      <h2>How was your stay at {spot.name}</h2>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Tell us about your stay..."
      />
      <div>
        <span onClick={(e) => setStars(1)}><i className="fa-sharp fa-solid fa-star"></i></span>
        <span onClick={(e) => setStars(2)}><i className="fa-sharp fa-solid fa-star"></i></span>
        <span onClick={(e) => setStars(3)}><i className="fa-sharp fa-solid fa-star"></i></span>
        <span onClick={(e) => setStars(4)}><i className="fa-sharp fa-solid fa-star"></i></span>
        <span onClick={(e) => setStars(5)}><i className="fa-sharp fa-solid fa-star"></i></span>
      </div>

      <button type="submit" onClick={handleSubmit} >Create Spot</button>


    </div>
  )
}