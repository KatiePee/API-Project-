import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = 'spots/getAllSpots';
const GET_SPOT = 'spots/getSpot'

const getAllSpots = (spots) => ({
  type: GET_ALL_SPOTS,
  payload: spots
})

const getSpot = (spot) => ({
  type: GET_SPOT,
  payload: spot
})

export const fetchAllSpots = () => async dispatch => {
  const res = await csrfFetch('/api/spots');

  if (res.ok) {
    const spots = await res.json()
    dispatch(getAllSpots(spots))
    return res
  } else return null
}

export const fetchSpot = (spotId) => async dispatch => {
  console.log('here?')
  const res = await csrfFetch(`/api/spots/${spotId}`);

  if (res.ok) {
    const spot = await res.json()
    dispatch(getSpot(spot))
    return res
  } else {
    const errors = await res.json();
    return errors;
  }
}


const spotReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_SPOTS:
      newState = { ...state };
      newState.allSpots = action.payload.Spots;
      return newState;
    case GET_SPOT:
      newState = { ...state };
      newState.singleSpot = action.payload
      return newState;
    default:
      return state;
  }
}

export default spotReducer
