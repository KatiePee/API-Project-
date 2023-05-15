import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import DeleteSpotModal from "./DeleteSpotModal";
import OpenModalButton from "../OpenModalButton";

export default function CurrentUserSpotCard({ spot }) {
  const { id, name, previewImage, city, state, avgRating, price } = spot;
  const dispatch = useDispatch()
  const history = useHistory()
  const handleClick = () => {
    history.push(`/spots/${id}`)
  }
  const handleUpdate = () => {
    history.push(`/spots/${id}/edit`)
  }

  return (
    // <div className='spotsCard-wrapper'>

    <div className='spotsCard' key={id} onClick={handleClick}>
      <div className='spotsCard__image'>
        <img src={previewImage} alt={`${name} image`} className="spot-image" />
      </div>

      <div className='spotsCard__details'>
        <div className='spotsCard__place'>
          <span>{city}</span>, <span>{state}</span>
        </div>
        <div className='spotsCard__star-rating'>
          <span ><i className="fa-sharp fa-solid fa-star"></i></span>
          <span className={avgRating ? '' : 'new-rating'}>{avgRating ? avgRating : 'New!'}</span>
        </div>
      </div>

      <div className='spotsCard__price'>
        <span className='spotsCard__price--price'>${price}</span>
        <span className='spotsCard__price--night'> night</span>
      </div>

      {/* <div className='spotsCard__buttons'>
        <button onClick={handleUpdate}>Update Spot</button>

        <OpenModalButton
          buttonText="Delete Spot"
          modalComponent={<DeleteSpotModal spot={spot} />}
        />
      </div> */}
    </div >

    // </div>
  )
}