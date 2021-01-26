import React,{useState, useEffect} from 'react'
import { getJobListings } from '../API/JobListingsAPI'
import './css/JobListing.css'

export default function JobListings(props) {
  const [jobListings, setJobListings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getJobListings(props);
      setJobListings(data);
    } 
    fetchData();
  }, [props])

  //removes html tags from strings
  const removeTags = (str) => {
    if ((str===null) || (str==='')) {
      return false;
    }
    else {
      str = str.toString();
      return str.replace( /(<([^>]+)>)/ig, '');
    }
  }
  
  //each child needs a unique key prop


  console.log(props.jobTitle)
  return (
    <div>
      {jobListings.map((item, i) => (
        <div className = 'jobListing' key={item['id']}>
          <h3 className = 'jobTitle' >Job Title: {removeTags(item['title'])}</h3>
          <p className = 'jobDescription' >Description: {removeTags(item['description'])}</p>
          <p className = 'jobCompany' >Company: {removeTags(item['company']['display_name'])}</p>
          <a href={item['redirect_url']} className = 'jobLink' ><p>Listing Page</p></a>
        </div>
      ))}
    </div>
  )
}