import React from 'react'
import SkillsToJobForm from '../components/SkillsToJobForm'
import { useState, useEffect } from 'react'
import SurveyZipcodeBar from '../components/SurveyZipcodeBar'

export default function JobListingsPage() {
  const [consent,setContent] = useState(false)
  const [showForm,setShowForm] = useState(false)
  const [zipcode,setZipcode] = useState('')



  let props = {
    setShowForm: setShowForm,
    setZipcode: setZipcode
  }
  return (
    <div>
      {(zipcode.length != 5 || !showForm) && <SurveyZipcodeBar {...props} />}
      {zipcode && showForm && <SkillsToJobForm zipCode = {zipcode}/>}
    </div>
  )
}