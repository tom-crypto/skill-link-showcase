import React from 'react'
import { Card, Badge, Button } from 'react-bootstrap'
import {useState} from 'react'
import { Redirect } from 'react-router-dom'

export default function JobTitles(props) {
const [redirect,setRedirect] = useState(false)
const [zipcode,setZipcode] = useState('')
const [jobTitle,setJobTitle] = useState('')

let jobs = props.jobs
  const handleClick = (jobTitle,zipcode)=>{
    setZipcode(zipcode)
    setJobTitle(jobTitle)
    setRedirect(true)
  }

  return (
    <div className='main-container'>
      {redirect ? <Redirect
            to={{
            pathname: "/joboverview",
            state: { jobTitle:jobTitle, zipcode:zipcode }
          }}
      /> : <div></div>}
      {jobs.map((job) => (
        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between">
              <div>
                <Card.Title>
                  {job["OccupationTitle"]}
                </Card.Title>
                <Card.Subtitle className="text-muted mb-2">
                  Average annual wage - ${job["AnnualWages"]}
                </Card.Subtitle>
                <Card.Subtitle className="text-muted mb-2">
                  {job["EduCode"] === 7.0 ? "No formal education required" : "Typical education - " + job["TypicalEducation"]}
                </Card.Subtitle>
                <Badge variant="secondary">
                  Job Outlook - {job["Outlook"]}
                </Badge>
                <div>
                  <br/>
                  <Button onClick = {(e)=>{handleClick(job['OccupationTitle'],props.zipCode)}} variant="primary">
                    Full Occupation Details
                  </Button>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
    ))}
    </div>
  )
}
