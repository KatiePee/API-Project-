import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSpotReviews } from "../../store/reviews";
console.log('hits spot review file')

export default function SpotReviews({ spotId }) {
  const dispatch = useDispatch();
  const reviewsState = useSelector(state => state.reviews.spot);
  const reviews = Object.values(reviewsState);

  useEffect(() => {
    dispatch(fetchSpotReviews(spotId))
  }, [dispatch])

  console.log('spot reviews---------', reviews)
  if (!reviews.length) return null
  let review = reviews[0]
  let date = review.createdAt
  console.log('---- date month thing ---', date.toLocaleString('default', { month: 'long' }))
  const _getMonth = (date) => {
    const event = new Date(date);
    const month = event.toLocaleString('default', { month: 'long' });
    const year = event.toLocaleString('default', { year: 'numeric' });
    return `${month}, ${year}`
  }
  return (
    <div className='spotDetails__reviews reviews'>
      <h1>TES TEST TEST</h1>
      {reviews.map(review => {
        return (
          <div className='reviews__card'>
            <p className='reviews__name'>{review.User.firstName}</p>
            <p className='reviews__date'>{_getMonth(review.createdAt)}</p>
          </div>
        )
      })}
    </div>
  )
}