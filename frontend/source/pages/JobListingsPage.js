import React,{useState, useEffect} from 'react'
import JobListings from '../components/JobListings'

//demo page for the job listing component

export default function JobListingsPage() {
  let jobTitle = "mechanic"
  return (
    <div>
      <JobListings jobTitle={jobTitle}/>
    </div>
  )
}