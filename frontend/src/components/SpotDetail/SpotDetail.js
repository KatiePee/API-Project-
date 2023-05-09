import { useDispatch, useSelector } from "react-redux";
import { fetchSpot } from "../../store/spots";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";


export default function SpotDetail() {
  const { spotId } = useParams()
  console.log('spot id----------> ', spotId)

  const dispatch = useDispatch();
  const spot = useSelector(state => state.spots.singleSpot)
  console.log('********   spot    *******', spot)

  useEffect(() => {
    console.log('------- inside useeffect ---------')
    dispatch(fetchSpot(spotId));
  }, [dispatch])

  const {
    name,
    Owner,
    city,
    state,
    country,
    SpotImages,
    description,
    price,
    avgStarRating,
    numReviews,
  } = spot

  // SpotImages = [{ url: 'https://bit.ly/fcc-relaxing-cat' }]
  // const previewImg = SpotImages.find(img => img.preview === true) ? SpotImages.find(img => img.preview === true) : SpotImages[0]
  //for testing code above works!
  const previewImg = { url: 'https://bit.ly/fcc-relaxing-cat' }

  // while (SpotImages.length < 4) {
  //   SpotImages.push(SpotImages[0])
  // }

  // console.log('----spot preview image', SpotImages)

  // const spot = Object.values(spotObj)

  return (
    <div className='spotDetails'>
      <div className="spotDetails__header">
        <h1>{name}</h1>
        <h3>{city}, {state}, {country}</h3>
      </div>
      <div className="spotDetails__image-box">
        <div className='spotDetails__image-preview'>
          <img src={previewImg.url} className="spot-image" />
        </div>
        <div className='spotDetails__image-tiles'>
          {SpotImages}
        </div>
      </div>
      <div className='spotDetails__details'>
        <div className='spotDetails__details-description'>
          <p>Hosted by {Owner.firstName} {Owner.lastName}</p>
          <p>{description}</p>
        </div>
        <div className='spotDetails__details-infoBlock'>
          <div className='spotDetails__details-info'>${price}, {avgStarRating ? avgStarRating : 'New!'}, {numReviews}</div>
          <button className='spotDetails__reserve'>reserve!</button>
        </div>
      </div>
      <div className='spotDetails__review-info'>review info</div>
      <div className="spotDetails__reviews">
        <p>name OR REVIEW COMPONENT!!</p>
        <p>date</p>
        <p>review</p>
      </div>
      <h1>Spot Detail!</h1>
      {/* {spot.map(key => (<p>{key}</p>))} */}
    </div>
  )
}