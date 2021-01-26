import React from 'react'
import { Card, Button } from 'react-bootstrap'
import default_img from "../assets/graduation_cap.jpg"
import {useState,useEffect} from 'react'
import {findLearningResources} from '../API/LearningResourcesAPI'
import ScaleLoader from 'react-spinners/ScaleLoader'

const LearningResources = (props) => {
  let jobTitle = props.location.state.jobTitle
  let zipcode = props.location.state.zipcode
  let searchObject = {
    "job_title":jobTitle,
    "zipcode":zipcode
  }

  const [contacts,setContacts] = useState('')
  const [loading,setLoading] = useState(true)
  useEffect(() => {
    findLearningResources(searchObject).then(response=>{
      setContacts(response)
      setLoading(false)
    })
  }, [props])
  
  return (
    (contacts && !loading) ? <div class="container">
      {contacts["school_programs"].map(contact => {
      return (
        <Card className="mb-3">
        <Card.Body>
          <div className="d-flex justify-content-between">
            <div>
              <Card.Title>
                {contact.school_name} - <span className="text-muted font-weight-light">{contact.program_name}</span>
              </Card.Title>
              <Card.Subtitle className="text-muted mb-2">
                Address: {contact.address} 
                <br/>
                Phone: {contact.phone}
              </Card.Subtitle>
            </div>
            <img className="d-none d-md-block" height="50" src={default_img} alt="school logo" />
          </div>
          <Card.Text>
            <Button variant="primary" href={contact.school_url} target="_blank"> Visit Site </Button>
          </Card.Text>
        </Card.Body>
      </Card>
      )
    })}
    </div> : 
        <div class="d-flex flex-column" style={{
          // width: "100%",
          // height: "100vh",
          display: "flex",
          flexdirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          margin:"20%"
        }}>
          <div>
            <ScaleLoader id = "loading_icon" color="#4A90E2" height="150" width='40'/>
          </div>
          <br/>
          <div><h1>Ready for school?</h1></div>
        </div>
  )
};

export default LearningResources