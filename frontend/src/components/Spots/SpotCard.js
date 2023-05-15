import { useHistory } from "react-router-dom";
import React from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import './spots.css'



export default function SpotCard({ spot }) {
  const { id, name, previewImage, city, state, avgRating, price } = spot;
  const history = useHistory()
  const handleClick = () => {
    history.push(`/spots/${id}`)
  }

  return (
    <div className='spotsCard' key={id} onClick={handleClick}>
      <Tippy content={<span>{name}</span>}>
        <div className='spotsCard__image'>
          <img src={previewImage} alt={`${name} image`} className="spot-image" />
        </div>
      </Tippy>

      <div className='spotsCard__details'>
        <div className='spotsCard__place'>
          <p>{city}, {state}</p>
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


    </div >
  )
}