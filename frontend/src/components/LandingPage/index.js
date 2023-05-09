import { useDispatch, useSelector } from "react-redux";
import { fetchAllSpots } from "../../store/spots";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import SpotCard from "./SpotCard";

const LandingPage = () => {
  const spotsState = useSelector((state => state.spots.allSpots))
  const spots = Object.values(spotsState)
  const dispatch = useDispatch();
  const history = useHistory();
  // console.log('------spotsState- landing page----', spotsState)
  console.log('------spots- landing page----', spots)
  useEffect(() => {
    dispatch(fetchAllSpots());
  }, [dispatch])

  const handleSpotClick = (spotId) => {
    console.log('handle spot landing page=======================', spotId)
    history.push(`/spots/${spotId}`)
  }

  if (!spots.length) return null;
  return (
    // <h1>test test</h1>
    <div className="landing-page-wrapper">
      {spots.map(spot => (
        <SpotCard spot={spot} />
      ))}
    </div>
  )
}
export default LandingPage