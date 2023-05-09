import { useDispatch, useSelector } from "react-redux";
import { fetchSpot } from "../../store/spots";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";


export default function SpotDetail() {
  const { spotId } = useParams()
  const dispatch = useDispatch();
  const spotObj = useSelector(state => state.spots.singleSpot)

  useEffect(() => {
    dispatch(fetchSpot(spotId));
  }, [dispatch])
  // const spot = Object.values(spotObj)
  // console.log(spot)
  return (
    <div>
      <h1>Spot Detail!</h1>
      {/* {spot.map(key => (<p>{key}</p>))} */}
    </div>
  )
}