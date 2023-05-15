import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link, Redirect } from "react-router-dom";
import CurrentUserSpotCard from "./CurrentUserSpotCard";
import { currentUserSpots } from "../../store/spots";
import './spots.css'

const ManageSpots = ({ user }) => {

  const [isLoading, setIsLoading] = useState(true);

  const spotsState = useSelector((state => state.spots.allSpots))
  const spots = spotsState ? Object.values(spotsState) : [];

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      await dispatch(currentUserSpots());
      setIsLoading(false)
    }
    fetchData()
  }, [dispatch])
  if (!user) return <Redirect to='/' />
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="manage-spots-wrapper">
      <h1>Manage Spots</h1>
      <Link to='/spots/new'>
        <button>Create a new spot!</button>
      </Link>
      <div className="landing-page-wrapper">
        {spots.map(spot => (
          <div>

            <CurrentUserSpotCard spot={spot} key={spot.id} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ManageSpots