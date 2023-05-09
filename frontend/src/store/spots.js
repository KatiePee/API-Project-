import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = 'spots/allSpots';
const GET_SPOT = 'spots/singleSpot'

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
  console.log('hits fetch****************************')
  if (res.ok) {
    const spots = await res.json()
    dispatch(getAllSpots(spots.Spots))
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
/*
spots: {
  // Notice there are two slices of state within spots. This is to handle your two different routes for getting a spot.
  // Refer to your API Docs to get more information.
  allSpots: {
    [spotId]: {
      spotData,
      },
    // These optional ordered lists are for you to be able to store an order in which you want your data displayed.
    // you can do this on the frontend instead of in your slice is state which is why it is optional.
    optionalOrderedList: [],
    },
  // Notice singleSpot has more data that the allSpots slice. Review your API Docs for more information.
  singleSpot: {
    spotData,
      SpotImages: [imagesData],
        Owner: {
      ownerData,
      },
  },
},
*/

const initialState = { allSpots: {}, singleSpot: {} }
const spotReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_SPOTS:
      newState = { ...state, allSpots: {}, singleSpot: {} };
      action.payload.forEach(el => newState.allSpots[el.id] = el)
      // newState.allSpots = action.payload
      return newState;
    case GET_SPOT:
      newState = { ...state, allSpots: {}, singleSpot: {} };

      newState.singleSpot = action.payload
      return newState;
    default:
      return state;
  }
}

export default spotReducer
