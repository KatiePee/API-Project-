import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = 'spots/allSpots';
const GET_SPOT = 'spots/singleSpot';
const ADD_SPOT = 'spots/addSpot';
const DELETE_SPOT = 'spots/deleteSpot'

const getAllSpots = (spots) => ({
  type: GET_ALL_SPOTS,
  payload: spots
})

const getSpot = (spot) => {
  return {
    type: GET_SPOT,
    payload: spot
  }
}

const addSpot = (spot) => {
  return {
    type: ADD_SPOT,
    payload: spot
  }
}

const deleteSpot = (spotId) => {
  return {
    type: DELETE_SPOT,
    payload: spotId
  }
}


export const fetchAllSpots = () => async dispatch => {
  const res = await csrfFetch('/api/spots');
  if (res.ok) {
    const spots = await res.json()
    dispatch(getAllSpots(spots.Spots))
    return res
  } else return null
}

export const fetchSpot = (spotId) => async dispatch => {
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

export const createSpotThunk = (spot, spotImages, user) => async (dispatch) => {
  try {
    const res = await csrfFetch('/api/spots', {
      method: 'POST',
      body: JSON.stringify(spot)
    });
    const newSpot = await res.json();
    await dispatch(addImageThunk(newSpot, spotImages, user))
    return newSpot;

  } catch (e) {
    const errors = await e.json()
    return errors
  }
}

export const addImageThunk = (spot, spotImages, user) => async (dispatch) => {
  spot.SpotImages = []
  for (let i = 0; i < spotImages.length; i++) {
    const image = spotImages[i]
    const res = await csrfFetch(`/api/spots/${spot.id}/images`, {
      method: 'POST',
      body: JSON.stringify(image)
    });
    if (res.ok) {
      const newImage = await res.json();
      spot.SpotImages.push(newImage)
    }
  }
  spot.Owner = user;
  spot.numReviews = null;
  spot.avgStarRating = null;
  dispatch(addSpot(spot));
  return spot
}

export const updateSpotThunk = (spot, spotId, user) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'PUT',
      body: JSON.stringify(spot)
    });
    const newSpot = await res.json();
    dispatch(addSpot(spot))
    return newSpot;

  } catch (e) {
    const errors = await e.json()
    return errors
  }
}

export const currentUserSpots = () => async (dispatch) => {
  try {
    const res = await csrfFetch('/api/spots/current');
    const spots = await res.json()
    dispatch(getAllSpots(spots.Spots))
    return res
  } catch (e) {
    return null
  }
}

export const deleteSpotThunk = (spotId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'DELETE',
    });
    dispatch(deleteSpot(spotId));
    return res
  } catch (e) {
    const errors = await e.json()
    return errors
  }
};

const initialState = { allSpots: {}, singleSpot: {} }
const spotReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_SPOTS:
      newState = { ...state, allSpots: {}, singleSpot: {} };
      action.payload.forEach(el => newState.allSpots[el.id] = el)
      return newState;
    case GET_SPOT:
      newState = { ...state, allSpots: {}, singleSpot: {} };
      newState.singleSpot = action.payload
      return newState;
    case ADD_SPOT:
      newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: { ...action.payload } };
      newState.allSpots[action.payload.id] = action.payload
      return newState;
    case DELETE_SPOT:
      newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: {} }
      delete newState.allSpots[action.payload];
      return newState
    default:
      return state;
  }
}



export default spotReducer
