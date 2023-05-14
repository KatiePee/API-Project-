import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createSpotThunk } from "../../store/spots";

export default function CreateSpot({ user }) {

  const history = useHistory();

  const [country, setCountry] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [image0, setImage0] = useState('')
  const [image1, setImage1] = useState('')
  const [image2, setImage2] = useState('')
  const [image3, setImage3] = useState('')
  const [image4, setImage4] = useState('')
  const [errors, setErrors] = useState({});


  const dispatch = useDispatch();

  let newErrors = {}


  let formErrors = {}

  const _handelErrors = (imageUrls) => {

    country || (formErrors.country = 'Country is required.');
    address || (formErrors.address = 'Address is required.');
    city || (formErrors.city = 'City is required.');
    state || (formErrors.state = 'State is required.');
    description.length > 30 || (formErrors.description = 'Description is required and must be at least 30 character.');
    price || (formErrors.price = 'price is required.');
    name || (formErrors.name = 'name is required.');
    image0 || (formErrors.image0 = 'Preview Image is required.');

    const validEndings = ['png', 'jpg', 'jpeg'];
    imageUrls.forEach((img, i) => {
      if (img) {
        let arr = img.split('.')
        if (!validEndings.includes(arr[arr.length - 1])) {
          formErrors[`image${i}`] = 'Image url must end in .png, .jpg, or .jpeg.'
        }
      }
    })
    setErrors(formErrors)
    console.log('____________FORM ERRORS______________', formErrors)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageUrls = [image0, image1, image2, image3, image4]
    _handelErrors(imageUrls)

    const addSpot = {
      country,
      address,
      city,
      state,
      description,
      name,
      price,
    }

    const imagesArray = []
    console.log('_______inside if onj ________, ', Object.values(formErrors).length)
    if (!Object.values(formErrors).length) {
      imageUrls.forEach((img, i) => {
        let obj = {}
        if (i === 0) {
          obj.url = img
          obj.preview = true
          imagesArray.push(obj)
        }

        else if (img) {
          obj.url = img
          obj.preview = false
          imagesArray.push(obj)
        }
      })

      const newSpot = await dispatch(createSpotThunk(addSpot, imagesArray, user))
      formErrors = { ...formErrors, resErrors: newSpot.errors }
      console.log('______________-CREAT SPOT FORM - iamge array____________', imagesArray)
      if (newSpot.errors) {
        console.log('^^^^^^^^^^^^^^^^^^^^^^^ inside err if ^^^^^^^^^^', newErrors)
        setErrors(formErrors)
      } else {
        console.log('^^^^^^^^^^^^^^ HITS THE ELSE ^^^^^^^^^^^^^^')
        history.push(`/spots/${newSpot.id}`)
      }
    } else setErrors(formErrors)

    console.log('^^^^^^^^^^^^^^^^^^^^^^^errors^^^^^^^^^^^^^^^^^^^^^', errors)
    //ok i need to change up how im doing this conditional because things are only hitting all that stuff if there



  }

  return (
    <form className='creat-spot'>
      <h1>Create a New Spot!</h1>

      <div className='create-spot__header'>
        <h3>Where's your place located?</h3>
        <p>Guests will only get your exact address once they booked a reservation.</p>

        <label>
          Country<span className='required-star'>*</span>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder='Country'
          />
          <p className='errors spot-form__errors'>{errors.country}</p>
        </label>
        <label>
          Street Address<span className='required-star'>*</span>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder='Address'
          />
          <p className='errors spot-form__errors'>{errors.address}</p>
        </label>
        <label>
          City<span className='required-star'>*</span>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder='City'
          /><p className='errors spot-form__errors'>{errors.city}</p>
        </label>
        <label>
          State<span className='required-star'>*</span>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder='State'
          /><p className='errors spot-form__errors'>{errors.state}</p>
        </label>
      </div>

      <div className='create-spot__header'>
        <h3>Describe your place to guests</h3>
        <p>Mention the best feature of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Please write at least 30 characters"
        />
        <p className='errors spot-form__errors'>{errors.description}</p>
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
        <p className='errors spot-form__errors'>{errors.name}</p>
      </div>

      <div className='create-spot__header'>
        <h3>Set a base price for your spot</h3>
        <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
        <span>$</span>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder='Price per night (USD)'
        />
        <p className='errors spot-form__errors'>{errors.price}</p>
      </div>

      <div className='create-spot__header'>
        <h3>Liven up your spot with photos</h3>
        <p>Submit a link to at least one photo to publish your spot.</p>
        <input
          type="text"
          value={image0}
          onChange={(e) => setImage0(e.target.value)}
          placeholder='Preview Image URL'
        />
        <p className='errors spot-form__errors'>{errors.image0}</p>
        <input
          type="text"
          value={image1}
          onChange={(e) => setImage1(e.target.value)}
          placeholder='Image URL'
        />
        <p className='errors spot-form__errors'>{errors.image1}</p>
        <input
          type="text"
          value={image2}
          onChange={(e) => setImage2(e.target.value)}
          placeholder='Image URL'
        /> <p className='errors spot-form__errors'>{errors.image2}</p>
        <input
          type="text"
          value={image3}
          onChange={(e) => setImage3(e.target.value)}
          placeholder='Image URL'
        /> <p className='errors spot-form__errors'>{errors.image3}</p>
        <input
          type="text"
          value={image4}
          onChange={(e) => setImage4(e.target.value)}
          placeholder='Image URL'
        /> <p className='errors spot-form__errors'>{errors.image4}</p>
      </div>

      <button type="submit" onClick={handleSubmit}>Create Spot</button>

    </form>


  )
}