import React,{useState, useEffect} from 'react'

import JobSearchBar from '../components/JobSearchBar'
import JobOverview from '../components/JobOverview'

import './css/JobPage.css'
export default function JobPage() {
  const [associatedSkills, setAssociatedSkills] = useState({});
  const updateAssociatedSkills = (associatedSkills) => {
    setAssociatedSkills(associatedSkills)
  }
  return (
    <div className = 'JobPage'>
      <JobSearchBar updateAssociatedSkills = {updateAssociatedSkills}/>
      <JobOverview associatedSkills = {associatedSkills}/>
    </div>
  )
}
