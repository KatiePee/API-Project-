import { useDispatch, useSelector } from "react-redux";
import { fetchAllSpots } from "../../store/spots";
import { useEffect, useState } from "react";

import SpotCard from "../Spots/SpotCard";
import './LandingPage.css'

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const spotsState = useSelector((state => state.spots.allSpots))
  const spots = spotsState ? Object.values(spotsState) : [];

  const dispatch = useDispatch();



  useEffect(() => {
    async function fetchData() {
      await dispatch(fetchAllSpots());
      setIsLoading(false)
    }
    fetchData()
  }, [dispatch])

  if (isLoading) return <div>Loading...</div>;

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