import { useDispatch, useSelector } from "react-redux";
import UpdateSpotForm from "./UpdateSpotForm";
import { useSate, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { fetchSpot } from "../../store/spots";

const UpdateSpot = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector(state => state.spots.singleSpot);
  useEffect(() => {
    dispatch(fetchSpot(spotId));
  }, [dispatch]);

  if (!spot.SpotImages) return < div > Loading...</div >;
  console.log('----------- spot from outter update component ------------>', spot)
  const {
    country,
    address,
    city,
    state,
    lat,
    lng,
    description,
    name,
    price,
  } = spot;

  return (
    <UpdateSpotForm
      spot={spot}
      formType="Update Spot"
    />
    // <h1>creat spot</h1>
  );
};

export default UpdateSpot