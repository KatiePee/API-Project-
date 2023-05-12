import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteReviewThunk, fetchSpotReviews } from "../../store/reviews";
import { useHistory } from "react-router-dom";
import DeleteReviewModal from './DeleteReviewModal'
import OpenModalButton from "../OpenModalButton";


export default function SpotReviews({ props }) {
  const { spotId, user } = props

  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(true);
  const history = useHistory();

  const dispatch = useDispatch();
  const reviewsState = useSelector(state => state.reviews.spot);
  const reviews = reviewsState ? Object.values(reviewsState) : [];
  useEffect(() => {
    dispatch(fetchSpotReviews(spotId))
    setIsLoading(false);
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;

  if (!reviews.length) return null;

  const _getMonth = (date) => {
    const event = new Date(date);
    const month = event.toLocaleString('default', { month: 'long' });
    const year = event.toLocaleString('default', { year: 'numeric' });
    return `${month} ${year}`
  }

  const handleDelete = (e, reviewId) => {

    e.preventDefault();
    dispatch(deleteReviewThunk(reviewId));
    history.push(`/spots/${spotId}`)
  }

  return (
    // <h1>TES TEST TEST</h1>
    <div className='spotDetails__reviews reviews'>
      {reviews.map(review => {
        // if (review.User.id === user.id) {
        //   // setIsAuth(true)
        // }

        return (
          <div className='reviews__card' key={review.id}>
            <p className='reviews__name'>{review.User.firstName}</p>
            <p className='reviews__date'>{_getMonth(review.createdAt)}</p>
            <p className='reviews__review'>{review.review}</p>
            <OpenModalButton
              buttonText="Delete Review"
              // modalComponent={<DeleteReviewModal reviewId={review.id} />}
              modalComponent={<DeleteReviewModal props={{ reviewId: review.id, spotId, user }} />}
            />
          </div>

        )
      })}
    </div>
  )
}