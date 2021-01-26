import React from 'react'
import JobTitles from '../components/JobTitles'
export default function JobTitleListingsPage(props) {
  let jobs = props.location.state.jobs
  let zipCode = props.location.state.zipCode
  return (
    <div>
      <JobTitles jobs={jobs} zipCode = {zipCode}></JobTitles>
    </div>
  )
}