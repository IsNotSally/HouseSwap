
import React, { useState } from 'react'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createMyHome } from '../apiService';
import { addHouse } from '../redux/houseSlice';

export default function Myhome() {
  const navigate = useNavigate();
const dispatch = useDispatch()
  //handle calendar selected date
 const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);
  const calendarChange = (item) => {
    setState([item.selection]);
    setFormData({ ...formData, calendar: item.selection });
  }
  
  const [formData, setFormData] = useState({
    hostname: '',
    houseTitle: '',
    location: '',
    typeOfHouse: '',
    bedrooms: '',
    bathrooms: '',
    description: '',
    photos: null,
    calendar: null
  });

//handle input field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

//handle photo submit
  const handleFile = (e) => {
    setFormData({
      ...formData,
      photos: e.target.files[0]
    });
  }

  //send request to server to create home and update the database 
  const {id} = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(id, formData);
    const res = await createMyHome(id, formData)
    if (res.error) {
      alert(`${res.message}`);
    } else {
      alert(`${res.message}`);
      dispatch(addHouse(formData))
      navigate(`/dashboard/${id}`)
    }
  }
 
  return (
    <div className='edit-home'>
      <form className="card" onSubmit={handleSubmit}>
        <div className="card-body">
          <label className="card-title">Host Name:</label>
          <input className="card-input" type="text" name="hostname" value={formData.hostname} onChange={handleChange} />

          <label className="card-title">House Title:</label>
          <input className="card-input" type="text" name="houseTitle" value={formData.houseTitle} onChange={handleChange} />

          <label className="card-title">Location</label>
          <input className="card-input" type="text" name="location" value={formData.location} onChange={handleChange} />

          <label className="card-title">Type of House:</label>
          <select className="card-select" name="typeOfHouse" value={formData.typeOfHouse} onChange={handleChange}>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
          </select>

          <label className="card-title">Number of Bedrooms:</label>
          <input className="card-input" type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} />

          <label className="card-title">Number of Bathrooms:</label>
          <input className="card-input" type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} />

          <label className="card-title">Short Description of the House:</label>
          <textarea className="card-textarea" name="description" value={formData.description} onChange={handleChange} />

          <label className="card-title">Upload Photos:</label>
          <input className="card-input" type="file" name="photos" onChange={handleFile} />

          <label className="card-title">Available exchange dates:</label>
          <div className="card-date-range">
            <DateRange
              editableDateInputs={true}
              onChange={calendarChange}
              moveRangeOnFirstSelection={false}
              ranges={state}
            />
          </div>
        </div>
        <div className="card-footer">
          <button className="card-button" type="submit">Submit</button>
        </div>
      </form>

    </div>
  )
}
