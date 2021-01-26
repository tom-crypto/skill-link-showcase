import React, {useState, useEffect } from "react";
import { Container, Col, Row, Jumbotron, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { getJobsListingsFromForm } from '../API/SkillsToJobFormAPI'
import { DisabledButton } from '../components/DisabledButton.js'
import '../pages/css/homePage.css'

export default function SkillsToJobForm({zipCode}) {
  const [jobData, setJobData] = useState();
  const [redirect, setRedirect] = useState(false);
  const skills = [{
    "ElementName": "Administration and Management",
    "ElementId": "2.C.1.a"},
    {
    "ElementName": "Biology",
    "ElementId": "2.C.4.d"},
    {
    "ElementName": "Body Coordination",
    "ElementId": "1.A.3.c.3"},
    {
    "ElementName": "Building and Construction",
    "ElementId": "2.C.3.d"},
    {
    "ElementName": "Chemistry",
    "ElementId": "2.C.4.c"},
    {
    "ElementName": "Clerical",
    "ElementId": "2.C.1.b"},
    {
    "ElementName": "Complex Problem Solving",
    "ElementId": "2.B.2.i"},
    {
    "ElementName": "Computers and Electronics",
    "ElementId": "2.C.3.a"},
    {
    "ElementName": "Customer and Personal Service",
    "ElementId": "2.C.1.e"},
    {
    "ElementName": "Economics and Accounting",
    "ElementId": "2.C.1.c"},
    {
    "ElementName": "Fine Arts",
    "ElementId": "2.C.7.c"},
    {
    "ElementName": "Foreign Language",
    "ElementId": "2.C.7.b"},
    {
    "ElementName": "Helping People",
    "ElementId": "2.B.1.f"},
    {
    "ElementName": "Instructing",
    "ElementId": "2.B.1.e"},
    {
    "ElementName": "Management of Financial Resources",
    "ElementId": "2.B.5.b"},
    {
    "ElementName": "Mathematics",
    "ElementId": "2.A.1.e"},
    {
    "ElementName": "Mechanical",
    "ElementId": "2.C.3.e"},
    {
    "ElementName": "Medicine and Dentistry",
    "ElementId": "2.C.5.a"},
    {
    "ElementName": "Memorization",
    "ElementId": "1.A.1.d.1"},
    {
    "ElementName": "Monitoring",
    "ElementId": "2.A.2.d"},
    {
    "ElementName": "Negotiation",
    "ElementId": "2.B.1.d"},
    {
    "ElementName": "Operations Analysis",
    "ElementId": "2.B.3.a"},
    {
    "ElementName": "Personnel and Human Resources",
    "ElementId": "2.C.1.f"},
    {
    "ElementName": "Production and Processing",
    "ElementId": "2.C.2.a"},
    {
    "ElementName": "Programming",
    "ElementId": "2.B.3.e"},
    {
    "ElementName": "Psychology",
    "ElementId": "2.C.4.e"},
    {
    "ElementName": "Public Safety and Security",
    "ElementId": "2.C.8.a"},
    {
    "ElementName": "Quality Control Analysis",
    "ElementId": "2.B.3.m"},
    {
    "ElementName": "Repairing",
    "ElementId": "2.B.3.l"},
    {
    "ElementName": "Sales and Marketing",
    "ElementId": "2.C.1.d"},
    {
    "ElementName": "Science",
    "ElementId": "2.A.1.f"},
    {
    "ElementName": "Sociology and Anthropology",
    "ElementId": "2.C.4.f"},
    {
    "ElementName": "Speaking",
    "ElementId": "2.A.1.d"},
    {
    "ElementName": "Systems Analysis",
    "ElementId": "2.B.4.g"},
    {
    "ElementName": "Teaching and Course Design",
    "ElementId": "2.C.6"},
    {
    "ElementName": "Telecommunications",
    "ElementId": "2.C.9.a"},
    {
    "ElementName": "Therapy and Counseling",
    "ElementId": "2.C.5.b"},
    {
    "ElementName": "Time Management",
    "ElementId": "2.B.5.a"},
    {
    "ElementName": "Troubleshooting",
    "ElementId": "2.B.3.k"},
    {
    "ElementName": "Writing",
    "ElementId": "2.A.1.c"}]

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target)
    const formDataObj = Object.fromEntries(formData.entries())
    const fetchData = async () => {
      setJobData(await getJobsListingsFromForm(formDataObj));
    }
    fetchData()
  };

  useEffect(() => {
    if (jobData) {
      setRedirect(true)
    }
  })

  const radioButtonSelectedCount = () => {
    let count = 0
    const list = document.querySelectorAll('input[type=radio]');
    for (let radio of list) {
      if (radio.checked == true) {
        count = count + 1
      }
    }
    if(count > 7) {
      const button = document.getElementById('submit-button');
      button.disabled = false
    }
  }

    return (
      <div>
        <video src="/videos/video-3.mp4" autoPlay loop muted/>
        {redirect ? <Redirect
            to={{
            pathname: "/jobtitlelistings",
            state: { jobs: jobData['0']['SKARankList'].slice(0, 20), zipCode:zipCode },

          }}
        /> : <div></div>}
        <br />
        <Container>
          <Row>
            <Col md={{ span: 7, offset: 3 }}>
              <Jumbotron>
                
                <Form onSubmit={handleSubmit}>
                  <h3>
                  Please fill out the survey below to discover potential careers just for you!
                </h3>
                  {skills.map((skill) => (
                    <Form.Row>
                    <Form.Group as={Col} controlId={skill.ElementName}>
                      <Form.Label>{skill.ElementName}</Form.Label>
                      <Form.Check
                        type="radio"
                        label="Not Confident"
                        name={skill.ElementId}
                        ids={skill.ElementId}
                        value="1"
                        onChange={() => radioButtonSelectedCount()}
                      />
                      <Form.Check
                        type="radio"
                        label="A Little Confident"
                        name={skill.ElementId}
                        ids={skill.ElementId}
                        value="2"
                        onChange={() => radioButtonSelectedCount()}
                      />
                      <Form.Check
                        type="radio"
                        label="Okay With"
                        name={skill.ElementId}
                        ids={skill.ElementId}
                        value="3"
                        onChange={() => radioButtonSelectedCount()}
                      />
                      <Form.Check
                        type="radio"
                        label="Confident"
                        name={skill.ElementId}
                        ids={skill.ElementId}
                        value="4"
                        onChange={() => radioButtonSelectedCount()}
                      />
                      <Form.Check
                        type="radio"
                        label="Very Confident"
                        name={skill.ElementId}
                        ids={skill.ElementId}
                        value="5"
                        onChange={() => radioButtonSelectedCount()}
                      />
                    </Form.Group>
                  </Form.Row>
                  ))}
                  <div className="hero-btns">
                    <DisabledButton variant="primary" type="submit" id='submit-button' disabled>
                    Submit
                    </DisabledButton>
                  </div>
                </Form>
              </Jumbotron>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }