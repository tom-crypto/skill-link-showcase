import React, { useState } from 'react';
import useFetchJobs from '../API/useFetchJobs'
import { Container } from 'react-bootstrap'
import Job from '../components/JobListingPage/Job'
import JobPagination from '../components/JobListingPage/JobPagination';
import SearchForm from '../components/JobListingPage/SearchForm';


export default function JobListingPage(props) {
  const location = props.location.state? props.location.state.zipcode : ''
  const description = props.location.state? props.location.state.jobTitle : 'software engineer'
  const defaultParams = {
    location: location,
    description: description
  }

  const [params, setParams] = useState(defaultParams)
  const [page, setPage] = useState(1)
  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page)
  
  const handleParamChange = (e) => {
    const param = e.target.name
    const value = e.target.value
    setPage(1) // when search a new job, jump to the first page of the result
    setParams(prevParams => {
      return { ...prevParams, [param]: value }
    })
  }

  return (
    <Container className="my-4">
      <h1 className = "mb-4">Tech Jobs</h1>
      <SearchForm params={params} onParamChange={handleParamChange} />
      <JobPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
      {loading && <h1>loading</h1>}
      {error && <h1>Error try refreshing</h1>}
      {jobs.map(job => {
        return <Job key={job.id} job={job} />
      })}
      <JobPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
    </Container>
  )
}
