import { csrfFetch } from "./csrf";

const GET_SPOT_REVIEWS = 'reviews/spot';
const GET_USER_REVIEWS = 'reviews/user';

const getSpotReviews = (reviews) => {
  return {
    type: GET_SPOT_REVIEWS,
    payload: reviews
  }
}

const getUserReviews = (reviews) => {
  return {
    type: GET_USER_REVIEWS,
    payload: reviews
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

const initialState = { spot: {}, user: {} };
const reviewReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_SPOT_REVIEWS:
      newState = { ...state, spot: {}, user: {} }
      action.payload.forEach(el => newState.spot[el.id] = el);
      return newState;
    case GET_USER_REVIEWS:
      newState = { ...state, spot: {}, user: {} }
      action.payload.forEach(el => newState.user[el.id] = el);
      return newState;
    default:
      return state;
  }
}

export default reviewReducer