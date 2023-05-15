import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateSpotThunk } from "../../store/spots";

export default function SpotForm({ spot }) {

  const history = useHistory();

  const [country, setCountry] = useState(spot?.country)
  const [address, setAddress] = useState(spot?.address)
  const [city, setCity] = useState(spot?.city)
  const [state, setState] = useState(spot?.state)
  const [lat, setLat] = useState(spot?.lat)
  const [lng, setLng] = useState(spot?.lng)
  const [description, setDescription] = useState(spot?.description)
  const [name, setName] = useState(spot?.name)
  const [price, setPrice] = useState(spot?.price)
  const [errors, setErrors] = useState({});
  const [hasErrors, setHasErrors] = useState(false)

  const dispatch = useDispatch();


  let newErrors = {}

  let formErrors = {}

  const _handelErrors = () => {

    country || (formErrors.country = 'Country is required.');
    address || (formErrors.address = 'Address is required.');
    city || (formErrors.city = 'City is required.');
    state || (formErrors.state = 'State is required.');
    description.length > 30 || (formErrors.description = 'Description is required and must be at least 30 character.');
    price || (formErrors.price = 'price is required.');
    name || (formErrors.name = 'name is required.');
    setErrors(formErrors)

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    _handelErrors();

    const addSpot = {
      country,
      address,
      city,
      state,
      description,
      name,
      price,
    }

    if (!Object.values(formErrors).length) {
      const newSpot = await dispatch(updateSpotThunk(addSpot, spot.id))
      console.log('-----------------new spot - update form -------------', newSpot)
      if (newSpot.errors) {
        setErrors(newSpot.errors)
      } else {
        history.push(`/spots/${newSpot.id}`)
      }
    }
    console.log(errors)
  }

  return (
    <form className='creat-spot'>
      <h1>Update your Spot!</h1>

      <div className='create-spot__header'>
        <h3>Where's your place located?</h3>
        <p>Guests will only get your exact address once they booked a reservation.</p>

        <label>
          Country
        </label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder='Country'
        />
        <p className='errors form__errors'>{errors.country}</p>

        <label>
          Street Address
        </label>

        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder='Address'
        />
        <p className='errors form__errors'>{errors.address}</p>
        <label>
          City
        </label>

        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder='City'
        /><p className='errors form__errors'>{errors.city}</p>
        <label>
          State
        </label>

        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder='State'
        /><p className='errors form__errors'>{errors.state}</p>
      </div>

      <div className='create-spot__header'>
        <h3>Describe your place to guests</h3>
        <p>Mention the best feature of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Please write at least 30 characters"
        />
        <p className='errors form__errors'>{errors.description}</p>
      </div>

      <div className='create-spot__header'>
        <h3>Create a title for your spot</h3>
        <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Name your spot'
        />
        <p className='errors form__errors'>{errors.name}</p>
      </div>

      <div className='create-spot__header'>
        <h3>Set a base price for your spot</h3>
        <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
        <span>$</span>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder='Price per night (USD)'
        />
        <p className='errors form__errors'>{errors.price}</p>
      </div>

      <button type="submit" onClick={handleSubmit} >Update Your Spot</button>

    </form>


  )
}