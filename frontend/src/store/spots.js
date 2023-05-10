import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = 'spots/allSpots';
const GET_SPOT = 'spots/singleSpot';
const ADD_SPOT = 'spots/addSpot';
const ADD_IMG = 'spots/addImage'

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

const addImage = (spotImage) => {
  return {
    type: ADD_IMG,
    payload: spotImage
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

export const createSpot = (spot, spotImages) => async (dispatch) => {
  const res = await csrfFetch('/api/spots', {
    method: 'POST',
    body: JSON.stringify(spot)
  });

  if (res.ok) {
    const newSpot = await res.json();

    dispatch(addSpot(newSpot)).then(() => {
      for (let i = 0; i < spotImages.length; i++) {
        dispatch(addImageThunk(newSpot.id, spotImages[i]))
      }
    })

    return newSpot;
  } else {
    const errors = await res.json();
    return errors;
  }
}

export const addImageThunk = (spotId, image) => async (dispatch) => {
  const res = await csrfFetch(` /api/spots/${spotId}/images`, {
    method: 'POST',
    body: JSON.stringify(image)
  });

  if (res.ok) {
    const newImage = await res.json();
    dispatch(addImage(newImage))
    return newImage;
  } else {
    const errors = await res.json();
    return errors;
  }
}

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
    case ADD_IMG:
      newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: { ...state.singleSpot } };
      newState.singleSpot.SpotImages.push(action.payload)
      return newState
    default:
      return state;
  }
}

export default spotReducer
