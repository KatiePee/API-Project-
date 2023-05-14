import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteReviewThunk, fetchSpotReviews } from "../../store/reviews";
import { useHistory } from "react-router-dom";
import DeleteReviewModal from './DeleteReviewModal'
import OpenModalButton from "../OpenModalButton";
import CreateReviewModal from "../Reviews/CreatReviewModal";


export default function SpotReviews({ props }) {
  const { spotId, user, avgStarRating, numReviews, spot } = props

  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();
  const reviewsState = useSelector(state => state.reviews.spot);

  const reviews = reviewsState ? Object.values(reviewsState).reverse() : [];

  useEffect(() => {
    dispatch(fetchSpotReviews(spotId))
    setIsLoading(false);
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;

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

  const isSpotOwner = user && user.id === spot.Owner.id

  const hasLeftReview = user && reviews.find(review => review.User.id === user.id)

  return (
    <div className='spotDetails__reviews reviews'>

      <div className='spotDetails__reviews reviews-details'>
        <span>
          <i className="fa-sharp fa-solid fa-star"></i>
          <span className={avgStarRating ? '' : 'new-rating'}>
            {avgStarRating ? avgStarRating : 'New!'}
          </span>
        </span>
        <span className={numReviews ? '' : 'hidden'}>.</span>
        <span className={numReviews ? '' : 'hidden'}>{numReviews === 1 ? `${numReviews} review` : `${numReviews} reviews`}</span>
      </div>

      {user && !(hasLeftReview || isSpotOwner) && (
        <OpenModalButton
          buttonText="Post Your Review"
          modalComponent={<CreateReviewModal props={{ spot, user }} />}
        />
      )}
      {user && !(hasLeftReview || isSpotOwner || reviews.length > 0) && (<p>Be the first to post a review!</p>)}

      {(reviews.length > 0 && !isSpotOwner) && reviews.map(review => {
        return (
          <div className='reviews__card' key={review.id}>
            <p className='reviews__name'>{review.User.firstName}</p>
            <p className='reviews__date'>{_getMonth(review.createdAt)}</p>
            <p className='reviews__review'>{review.review}</p>
            {user && review.User.id === user.id && (
              <OpenModalButton
                buttonText="Delete Review"
                modalComponent={<DeleteReviewModal props={{ reviewId: review.id, spotId, user }} />}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}