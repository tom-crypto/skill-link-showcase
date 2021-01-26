import React from 'react'
import axios from 'axios'
import { Button } from '../components/Button.js'
import '../pages/css/homePage.css'

export default function SurveyZipcodeBar({setZipcode,setShowForm}) {
  const reverseToZipcode = (latitude,longitude)=>{
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        latlng: `${latitude},${longitude}`,
        key: REACT_APP_GOOGLE_API_KEYS
      }
    })
    .then(function (response) {
      let address_components = response.data.results[0].address_components
      let zipcode = address_components[address_components.length - 1].short_name
      let stateCountryInfo = response.data.results.pop()
      let country = stateCountryInfo.address_components.pop().long_name
      let state = stateCountryInfo.address_components.pop().short_name
      setZipcode(zipcode)
      document.getElementById(`zipcode`).value = `${zipcode} (${state}, ${country})`
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      // always executed
    });  
  }
  const getLocation = () => {
    setShowForm(false)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getCoordinates, handleLocationError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  const getCoordinates = (position) => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    reverseToZipcode(latitude,longitude)
  }
  const handleLocationError = (error) => {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.")
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.")
        break;
      case error.TIMEOUT:
        alert("The request to get user's location has timed out.")
        break;
      case error.UNKOWN_ERROR:
        alert("An unknown error occured.")
        break;
      default:
        alert("An unknown error occurred.")
    }
  }

  const enterZipcode = (e)=>{
    setShowForm(false)
    setZipcode(e.target.value)
  }
  return (
    <div className="hero-container">
      <video src="/videos/video-3.mp4" autoPlay loop muted/>
      <h1>SKILL - LINK</h1>
      <h4>To make your serach more accurate, please enter your zipcode</h4>

      <input className="input" id = 'zipcode' placeholder='zipcode' onChange = {enterZipcode} required></input>

      <div className="hero-btns">
        <Button className="btns" buttonStyle="btn--outline" buttonSize="btn-large" onClick ={(e) =>getLocation()}>GET LOCATION</Button>
      </div>
      <div className="hero-btns">
        <Button className="btns" buttonStyle="btn--outline" buttonSize="btn-large" onClick ={(e)=>{setShowForm(true)}}>CONFIRM</Button>
      </div>
    </div>
  )
}
