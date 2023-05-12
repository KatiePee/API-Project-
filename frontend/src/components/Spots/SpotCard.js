import { useHistory } from "react-router-dom";
import React from 'react';
import Tippy from '@tippyjs/react';



export default function SpotCard({ spot }) {
  const { id, name, previewImage, city, state, avgRating, price } = spot;
  const history = useHistory()
  const handleClick = () => {
    history.push(`/spots/${id}`)
  }

  return (
    <div className='spotsCard' key={id} onClick={handleClick}>
      <div className='spotsCard__image'>
        <Tippy content={<span>{name}</span>}>
          <img src={previewImage} alt={`${name} image`} className="spot-image" />
        </Tippy>
      </div>
      <div className='spotsCard__place'>
        <span>{city}</span>, <span>{state}</span>
      </div>
      <div className='spotsCard__star-rating rating-info'>
        <span ><i className="fa-sharp fa-solid fa-star"></i></span>
        <span className={avgRating ? '' : 'new-rating'}>{avgRating ? avgRating : 'New!'}</span>
      </div>
      <div className='spotsCard__price'>
        <span className='spotsCard__price--price'>${price}</span>
        <span className='spotsCard__price--night'> night</span>
      </div>

    </div >
  )
}