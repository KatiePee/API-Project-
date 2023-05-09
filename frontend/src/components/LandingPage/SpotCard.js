export default function SpotCard({ spot }) {
  const { id, name, previewImage, city, state, avgRating, price } = spot
  return (
    <div className='spots' key={id}>
      <div className='spots__image'>
        <img src={previewImage} alt={`${name} image`} />
      </div>
      <div className='spots__city-state'>
        <span className='spots_details bold'>{city}</span>, <span className='spots_details bold'>{state}</span>
      </div>
      <div className='spots__star-rating'>
        <span className='spots_details'><i className="fa-sharp fa-solid fa-star"></i></span>
        <span className='spots_details'>{avgRating ? avgRating : 0}</span>
      </div>
      <div className='spots__price'>
        <span classname='spots_details bold'>${price}</span>
        <span className='spots_details'> night</span>
      </div>
    </div>
  )
}