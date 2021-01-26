import React,{useState, useEffect} from 'react'
import AsyncSelect from 'react-select/async';
import {getSkillAutoCompleteResults} from '../API/AutoCompleteAPI'



export default function SkillSearchBar() {

  const loadNewOptions = inputValue => getSkillAutoCompleteResults(inputValue);
  
  return (
    <div>
      <AsyncSelect
        isMulti
        cacheOptions
        defaultOptions
        loadOptions={loadNewOptions}
      />
    </div>
  )
}
