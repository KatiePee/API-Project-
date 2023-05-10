export default function SpotForm({ spot, formType }) {
  return (
    <form className='creat-spot'>
      <h1>create spot form!</h1>

      <div className='create-spot__header'>
        <h3>Where's your place located?</h3>
        <p>Guests will only get your exact address once they booked a reservation.</p>

        <label>
          Country<span className='required-star'>*</span>
          <input
            type="text"
            // value={country}
            // onChange={(e) => setCountry(e.target.value)}
            placeholder='Country'
          />
        </label>
        <label>
          Street Address<span className='required-star'>*</span>
          <input
            type="text"
            // value={address}
            // onChange={(e) => setAddress(e.target.value)}
            placeholder='Address'
          />
        </label>
        <label>
          City<span className='required-star'>*</span>
          <input
            type="text"
            // value={city}
            // onChange={(e) => setCity(e.target.value)}
            placeholder='City'
          />
        </label>
        <label>
          State<span className='required-star'>*</span>
          <input
            type="text"
            // value={state}
            // onChange={(e) => setState(e.target.value)}
            placeholder='State'
          />
        </label>
        <label>
          Latitude<span className='required-star'>*</span>
          <input
            type="text"
            // value={lat}
            // onChange={(e) => setLat(e.target.value)}
            placeholder='Latitude'
          />
        </label>
        <label>
          Longitude<span className='required-star'>*</span>
          <input
            type="text"
            // value={lng}
            // onChange={(e) => setLng(e.target.value)}
            placeholder='Longitude'
          />
        </label>
      </div>

      <div className='create-spot__header'>
        <h3>Describe your place to guests</h3>
        <p>Mention the best feature of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
        <textarea
          // value={description}
          // onChange={(e) => setDescription(e.target.value)}
          placeholder="Please write at least 30 characters"
        />
      </div>

      <div className='create-spot__header'>
        <h3>Create a title for your spot</h3>
        <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
        <input
          type="text"
          // value={name}
          // onChange={(e) => setName(e.target.value)}
          placeholder='Name your spot'
        />
      </div>
      <div className='create-spot__header'>
        <h3>Set a base price for your spot</h3>
        <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
        <span>$</span>
        <input
          type="text"
          // value={price}
          // onChange={(e) => setPrice(e.target.value)}
          placeholder='Price per night (USD)'
        />
      </div>
      <div className='create-spot__header'>
        <h3>Liven up your spot with photos</h3>
        <p>Submit a link to at least one photo to publish your spot.</p>
        <input
          type="text"
          // value={?}
          // onChange={(e) => set?(e.target.value)}
          placeholder='Preview Image URL'
        />
        <input
          type="text"
          // value={?}
          // onChange={(e) => set?(e.target.value)}
          placeholder='Image URL'
        />
        <input
          type="text"
          // value={?}
          // onChange={(e) => set?(e.target.value)}
          placeholder='Image URL'
        />
        <input
          type="text"
          // value={?}
          // onChange={(e) => set?(e.target.value)}
          placeholder='Image URL'
        />
        <input
          type="text"
          // value={?}
          // onChange={(e) => set?(e.target.value)}
          placeholder='Image URL'
        />
      </div>

      <button type="submit">{formType}</button>



    </form>


  )
}