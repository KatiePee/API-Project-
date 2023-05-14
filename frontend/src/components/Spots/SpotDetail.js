import { useDispatch, useSelector } from "react-redux";
import { fetchSpot } from "../../store/spots";
import { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import SpotReviews from "../Reviews/SpotReviews";
import CreateReviewModal from "../Reviews/CreatReviewModal";
import OpenModalButton from "../OpenModalButton";
import ComingSoon from "../Utils/ComingSoon";
import { fetchUserReviews } from "../../store/reviews";


export default function SpotDetail({ user }) {

  const { spotId } = useParams()

  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const spot = useSelector(state => state.spots.singleSpot)

  useEffect(() => {
    dispatch(fetchSpot(spotId));
    setIsLoading(false);
  }, [dispatch, spotId]);

  //this bit is not needed
  //can use a set timeout inside useeffectwith anon call to set loading and this bit to make a longer loader
  //-------------------------------------------------------want to make a loading page!!---------------------------------------------
  // if (isLoading) return <div>Loading...</div>;


  // if (!Object.values(spot).length) return null
  if (!spot.name) return < div > Loading...</div >;

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

  if (!Owner) return null
  //------------------------------------------------------------------keep this---------------------------------------------------------
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
          {SpotImages1.map((el, i) => {
            if (i <= 4) {
              return (
                <img src={el.url} />
              )
            }
          })}
        </div>
      </div>

      <div className='spotDetails__details'>
        <div className='spotDetails__details-description'>
          <p>Hosted by {Owner.firstName} {Owner.lastName}</p>
          <p>{description}</p>
        </div>

        <div className='spotDetails__details-booking'>
          <div className='spotDetails__details-booking-info'>
            <div>${price} <span className="night">night</span></div>
            <div className='spotDetails__details-reviews reviews-details'>
              <span>
                <i className="fa-sharp fa-solid fa-star"></i>
                <span className={avgStarRating ? '' : 'new-rating'}>
                  {avgStarRating ? avgStarRating : 'New!'}
                </span>
              </span>
              <span className={numReviews ? '' : 'hidden'}>.</span>
              <span className={numReviews ? '' : 'hidden'}>{numReviews === 1 ? 'review' : 'reviews'}</span>

            </div>
          </div>
          <OpenModalButton
            buttonText="Reserve"
            modalComponent={<ComingSoon />}
          />
        </div>
      </div>

      <SpotReviews props={{ spotId, user, avgStarRating, numReviews, spot }} />
    </div>
  )
}