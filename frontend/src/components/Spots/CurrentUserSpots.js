import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CurrentUserSpotCard from "./CurrentUserSpotCard";
import { currentUserSpots } from "../../store/spots";

const CurrentUserSpots = () => {
  const [isLoading, setIsLoading] = useState(true);

  const spotsState = useSelector((state => state.spots.allSpots))
  const spots = spotsState ? Object.values(spotsState) : [];

  const dispatch = useDispatch();
  const history = useHistory();
  console.log(spotsState)

  useEffect(() => {
    async function fetchData() {
      await dispatch(currentUserSpots());
      setIsLoading(false)
    }
    fetchData()
  }, [dispatch])

  if (isLoading) return <div>Loading...</div>;

  if (!spots.length) return null;

  return (
    <div className="landing-page-wrapper">
      {spots.map(spot => (
        <CurrentUserSpotCard spot={spot} key={spot.id} />
      ))}
    </div>
  )
}

export default CurrentUserSpots