import React,{useState, useEffect} from 'react'

export default function JobOverview({associatedSkills}) {
  return (
    <div>
      {associatedSkills && console.log('here in Joboverview',associatedSkills)}
    </div>
  )
}