import { useDispatch, useSelector } from "react-redux";
import { fetchSpot } from "../../store/spots";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import SpotReviews from "../Reviews/SpotReviews";

export default function SpotDetail() {
  const { spotId } = useParams()

  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const spot = useSelector(state => state.spots.singleSpot)
  console.log('~~~~~~~ SPOT --spate detail ~~~~~~~~~~~~>', spot)
  // useEffect(() => {
  //   dispatch(fetchSpot(spotId));
  // }, [dispatch])

  useEffect(() => {
    async function fetchData() {
      await dispatch(fetchSpot(spotId));
      setIsLoading(false);
    }
    fetchData();
  }, [dispatch, spotId]);

  if (isLoading) return <div>Loading...</div>;


  if (!Object.values(spot)) return null

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

  if (!SpotImages) return null

  // SpotImages = [{ url: 'https://bit.ly/fcc-relaxing-cat' }]
  // const previewImg = SpotImages.find(img => img.preview === true) ? SpotImages.find(img => img.preview === true) : SpotImages[0]
  // console.log('---------', previewImg)
  //for testing code above works! -- replace SpotImages1 with actual Spotimages
  const previewImg = { url: 'https://bit.ly/fcc-relaxing-cat' }
  const SpotImages1 = [previewImg, previewImg, previewImg, previewImg]

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
          {/* {SpotImages1.map((el, i) => {
            if (i <= 4) {
              return (
                <img src={el.url} />
              )
            }
          })} */}
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
      <SpotReviews spotId={spotId} />
    </div>
  )
}