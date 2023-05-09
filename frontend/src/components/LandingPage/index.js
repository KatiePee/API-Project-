import { useDispatch, useSelector } from "react-redux";
import { fetchAllSpots } from "../../store/spots";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const LandingPage = () => {
  const spots = useSelector((state => state.spots.allSpots))
  const dispatch = useDispatch();
  const history = useHistory();


  useEffect(() => {
    dispatch(fetchAllSpots());
  }, [dispatch])

  const handleSpotClick = (spotId) => {

  }
  return (
    // <h1>test test</h1>
    <div className="landing-page-wrapper"> test
      {spots.map(spot => (
        <div className='spots' key={spot.id}>
          <div className='spots__image'>
            <img src={spot.previewImage} alt={`${spot.name} image`} />
          </div>
          <div className='spots__city-state'>
            <span className='spots_details bold'>{spot.city}</span>, <span className='spots_details bold'>{spot.state}</span>
          </div>
          <div className='spots__star-rating'>
            <span className='spots_details'><i class="fa-sharp fa-solid fa-star"></i></span>
            <span className='spots_details'>{spot.avgRating ? spot.avgRating : 0}</span>
          </div>
          <div className='spots__price'>
            <span classname='spots_details bold'>${spot.price}</span>
            <span className='spots_details'> night</span>
          </div>
        </div>
      ))}
    </div>
  )
}
export default LandingPage