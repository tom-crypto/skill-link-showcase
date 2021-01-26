import React,{useState, useEffect} from 'react'
import AsyncSelect from 'react-select/async';
import {getZipcodeAutoCompleteResults} from '../API/AutoCompleteAPI'
import {searchByJob} from '../API/JobSearchAPI'
import { Link, Redirect} from 'react-router-dom';


export default function ZipcodeSearchBar() {

  // const loadNewOptions = inputValue => getZipcodeAutoCompleteResults(inputValue);
  const [redirect, setRedirect] = useState(false)
  const [selectedZipcode, setSelectedZipcode] = useState(
    JSON.parse(localStorage.getItem("searchContent")).zipcode || String
    )

  const handleType = (e)=>{
    let zipcode = document.getElementById(`zipcode`).value
    setSelectedZipcode(zipcode)
  }
  useEffect(() => {
    let parsedSearchContent = JSON.parse(localStorage.getItem("searchContent"))
    parsedSearchContent.zipcode = selectedZipcode
    localStorage.setItem("searchContent", JSON.stringify(parsedSearchContent));
  }, [selectedZipcode]);
  
  const handleSubmit = async (e) =>{
    // localStorage.removeItem('jobOverview')
    let parsedSearchContent = JSON.parse(localStorage.getItem('searchContent'))
    let searchObject = {
      "job_title":parsedSearchContent.label + 's',
      "zipcode":parsedSearchContent.zipcode
    }
    let response = await searchByJob(searchObject)
    localStorage.setItem("jobOverview", JSON.stringify(response));
    console.log('response from zipcode search page',response)
    setRedirect(true)
  }
  if (redirect) {
    return (<Redirect to='/joboverview' />)
  }
  return (
    <div>
      <input id = 'zipcode' placeholder='zipcode' onChange = {handleType}></input>
      <button onClick = {handleSubmit}>Submit</button>
    </div>
  )
}
