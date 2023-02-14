
import React, { useEffect, useState } from 'react'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createMyHome } from '../apiService';
import { addHouse } from '../redux/houseSlice';
import { setUserHouse } from '../redux/userSlice';
import { format } from 'date-fns'
import Navbar from '../components/Navbar';

export default function Myhome() {
  const userId = localStorage.getItem('userId');
  const [imageFile, setImageFile] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [form, setForm] = useState({
    host_name: '',
    houseTitle: '',
    location: '',
    type: '',
    bedrooms: '',
    bathrooms: '',
    description: '',
    image: '',
    endDate: '',
    startDate: ''
  });

  //handle input field changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  //handle image upload
  const handleFile = (e) => {
    setImageFile(e.target.files[0]);
  }

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
    setForm({
      ...form,
      endDate: format(new Date(item.selection.endDate), 'dd MMMM yyyy'),
      startDate: format(new Date(item.selection.startDate), 'dd MMMM yyyy')
    });
  }

 //send request to server to create home and update the database 
  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendToCloudinary();
  }
  
  //handle image upload, instead of save image to database, 
  //we upload it to cloudinary and it returns a image url
  const sendToCloudinary = async function () {
    const data = new FormData();
    data.append('file', imageFile)
    data.append('upload_preset', "Houseswap")
    data.append('cloud_name', "dptfvyhda")
    const resCloud = await fetch("https://api.cloudinary.com/v1_1/dptfvyhda/image/upload", {
      method: "POST",
      body: data
    })
    const parsed = await resCloud.json()
    setForm({
      ...form,
      image: parsed.url
    })
  }

 

  // update the database
  const sendToDb = async () => {
    const res = await createMyHome(userId, form)
    if (res.error) {
      alert(`${res.message}`);
    } else {
      alert(`${res.message}`);
      dispatch(addHouse(res.newHouse))
      dispatch(setUserHouse(res.newHouse._id))
      navigate(`/dashboard`)
    }
  }

  useEffect(() => {
    form.image && sendToDb();
  }, [form.image])

  return (
    <div className='edit-home'>
      <Navbar />
      <form className="edit-form" onSubmit={handleSubmit}>
        <div className="form-body">
          <hr />
          <div className='form-items'>
            <label className="form-title">Host Name:</label>
            <input className="form-input" type="text" name="host_name" value={form.host_name} onChange={handleChange} placeholder="Sally" />
          </div>
          <hr />
          <div className='form-items'>
            <label className="form-title">House Title:</label>
            <input className="form-input" type="text" name="houseTitle" value={form.houseTitle} onChange={handleChange} placeholder="Give your house a name"/>
          </div>
          <hr />
          <div className='form-items'>
            <label className="form-title">Location</label>
            <input className="form-input" type="text" name="location" value={form.location} onChange={handleChange} placeholder="City, Country"/>
          </div>
          <hr />
          <div className='form-items'>
            <label className="form-title">Type of House:</label>
            <select className="form-select" name="type" value={form.type} onChange={handleChange} >
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
            </select>
          </div>
          <hr />
          <div className='form-items'>
            <label className="form-title">Number of Bedrooms:</label>
            <input className="form-input" type="number" name="bedrooms" min='1' value={form.bedrooms} onChange={handleChange} />
          </div>
          <hr />
          <div className='form-items'>
            <label className="form-title">Number of Bathrooms:</label>
            <input className="form-input" type="number" name="bathrooms" min='1' value={form.bathrooms} onChange={handleChange} />
          </div>
          <hr />
          <div className='form-items'>
            <label className="form-title">Short Description of the House:</label>
            <textarea className="form-textarea" name="description" value={form.description} onChange={handleChange} placeholder="Describe your house"/>

          </div>
          <hr />
          <div className='form-items'>
            <label className="form-title">Upload Photos:</label>
            <input className="form-input" type="file" name="image" accept="image/*" onChange={handleFile} />
          </div>
          <hr />
          <div className='form-items'>
            <label className="form-title">Available exchange dates:</label>
            <div className="form-date-range">
              <DateRange
                editableDateInputs={true}
                onChange={calendarChange}
                moveRangeOnFirstSelection={false}
                ranges={state}
              />
            </div>
          </div>



        </div>
        <div className="form-footer">
          <button className="form-button" type="submit">Submit</button>
        </div>
      </form>

    </div>
  )
}
