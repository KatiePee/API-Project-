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

  if (!Owner) return < div > Loading...</div >;
  const previewImg = SpotImages.find(img => img.preview === true) ? SpotImages.find(img => img.preview === true) : SpotImages[0]
  const SpotImages1 = SpotImages.filter(img => img.preview === false)
  SpotImages1 = [previewImg, previewImg, previewImg, previewImg]

  return (
    <div className='spotDetails'>
      <div className="spotDetails__header">
        <h1>{name}</h1>
        <h3>{city}, {state}, {country}</h3>
      </div>

      <div className="spotDetails__image-box">
        <div className='spotsDetails__preview'>
          <img src={previewImg.url} className="preview-image" />
        </div>
        <div className='spotDetails__image-tiles'>
          {SpotImages1.map((el, i) => {
            if (i <= 4) {
              return (
                <img src={el.url} key={i} className="tile-image" />
              )
            }
          })}
        </div>
      </div>

      <div className='spotDetails__details'>
        <div className='spotDetails__details-description'>
          <h3>Hosted by {Owner.firstName} {Owner.lastName}</h3>
          <p>{description}</p>
        </div>

        <div className='spotDetails__details-booking'>
          <div className='spotDetails__details-booking-info'>
            <div>
              <span className='spotsCard__price--price'>${price}</span>
              <span className='spotsCard__price--night'> night</span>
            </div>

            <div className='spotDetails__details-reviews SpotDetail'>
              <span><i className="fa-sharp fa-solid fa-star"></i> </span>
              <span className={avgStarRating ? '' : 'new-rating'}>
                {avgStarRating ? avgStarRating : 'New!'}
              </span>
              <span className={`dot ${numReviews ? '' : 'hidden'}`}>&#183;</span>


              <span className={numReviews ? '' : 'hidden'}>{numReviews === 1 ? `${numReviews} review` : `${numReviews} reviews`}</span>
            </div>
          </div>
          <div className='button-action'>
            <OpenModalButton
              buttonText="Reserve"
              modalComponent={<ComingSoon />}

            />
          </div>
        </div>
      </div>

      <SpotReviews props={{ spotId, user, avgStarRating, numReviews, spot }} />
    </div >
  )
}