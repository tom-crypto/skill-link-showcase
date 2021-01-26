import React,{useState, useEffect} from 'react'
import AsyncSelect from 'react-select/async';
import {getJobAutoCompleteResults} from '../API/AutoCompleteAPI'
import { Link} from 'react-router-dom';



export default function JobSearchBar() {

  const loadNewOptions = inputValue => getJobAutoCompleteResults(inputValue);
  const handleSelectJob = (e)=>{
    setSelectedJob(e)
  }
  const [selectedJob, setSelectedJob] = useState(
    JSON.parse(localStorage.getItem("searchContent"))|| Object()
  )
  useEffect(() => {
    let stringifiedSelectedJob = JSON.stringify(selectedJob);
    localStorage.setItem("searchContent", stringifiedSelectedJob);
  }, [selectedJob]);


  return (
    <div>
      <AsyncSelect
        cacheOptions
        defaultOptions
        loadOptions={loadNewOptions}
        onChange = {handleSelectJob}
      />
      <Link to={`/zipcode`}>
        <button>Continue</button>
      </Link>

    </div>
  )
}
