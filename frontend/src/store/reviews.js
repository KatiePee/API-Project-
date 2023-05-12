import { csrfFetch } from "./csrf";

const GET_SPOT_REVIEWS = 'reviews/spot';
const GET_USER_REVIEWS = 'reviews/user';
const ADD_REVIEW = 'reviews/addReview';
const DELETE_REVIEW = 'reviews/deleteReview'

console.log('hits review store file')
const getSpotReviews = (reviews) => {
  return {
    type: GET_SPOT_REVIEWS,
    payload: reviews
  }
}

const addReview = (review) => {
  return {
    type: ADD_REVIEW,
    payload: review
  }
}

const deleteReview = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    payload: reviewId
  }
}
export const fetchSpotReviews = (spotId) => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`)

  if (res.ok) {
    const reviews = await res.json();
    dispatch(getSpotReviews(reviews.Reviews))
    return res
  } else {
    const errors = await res.json();
    return errors;
  }
}

export const fetchUserReviews = () => async dispatch => {
  const res = await csrfFetch('/api/reviews/current')

  if (res.ok) {
    const reviews = await res.json();
    dispatch(getSpotReviews(reviews.Reviews))
    return res
  } else {
    const errors = await res.json();
    return errors;
  }
}

export const createReviewThunk = (review, spotId, user) => async (dispatch) => {
  try {
    const res = await csrfFetch(` /api/spots/${spotId}/reviews`, {
      method: 'POST',
      body: JSON.stringify(review)
    })

    const newReview = await res.json()
    dispatch(addReview(newReview))
    return newReview
  } catch (e) {
    const errors = await e.json()
    console.log('inside catch create spot thunk~~~~~~~~~~~~', e, errors)
    return errors
  }
}
export const deleteReviewThunk = (reviewId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: 'DELETE',
    })
    dispatch(deleteReview(reviewId));
    return res
  } catch (e) {
    const errors = await e.json()
    console.log('thunk catch block~~~~~~~~~~~~~~~~ errors ~~~~~> ', errors)
    return errors
  }
}
const initialState = { spot: {}, user: {} };
const reviewReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_SPOT_REVIEWS:
      newState = { ...state, spot: {}, user: {} }
      action.payload.forEach(el => newState.spot[el.id] = el);
      return newState;
    case ADD_REVIEW:
      newState = { ...state, spot: { ...state.spot }, user: { ...state.user, ...action.payload } }
      newState.spot[action.payload.id] = action.payload
    default:
      return state;
  }
}

export default reviewReducer