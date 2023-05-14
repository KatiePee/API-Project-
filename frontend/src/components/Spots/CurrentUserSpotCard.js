import { useHistory } from "react-router-dom";
import { deleteSpotThunk } from "../../store/spots";
import { useDispatch } from 'react-redux';


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

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteSpotThunk(id));
    history.push('/spots/current')
  }

  return (
    <div className='spotsCard' key={id}>
      <div className='spotsCard__image'>
        <img src={previewImage} alt={`${name} image`} className="spot-image" />
      </div>
      <div className='spotsCard__place'>
        <span>{city}</span>, <span>{state}</span>
      </div>
      <div className='spotsCard__star-rating'>
        <span ><i className="fa-sharp fa-solid fa-star"></i></span>
        <span >{avgRating ? avgRating : 0}</span>
      </div>
      <div className='spotsCard__price'>
        <span className='spotsCard__price--price'>${price}</span>
        <span > night</span>
      </div>
      <div className='spotsCard__buttons'>
        <span><button onClick={handleUpdate}>Update Spot</button></span>
        <span><button onClick={handleDelete}>Delete Spot</button></span>
      </div>
    </div >
  )
}