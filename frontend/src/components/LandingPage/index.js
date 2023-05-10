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
  console.log(spotsState)
  useEffect(() => {
    dispatch(fetchAllSpots());
  }, [dispatch])

  if (!spots.length) return null;
  return (
    <div className="landing-page-wrapper">
      {spots.map(spot => (
        <SpotCard spot={spot} key={spot.id} />
      ))}
    </div>
  )
}
export default LandingPage