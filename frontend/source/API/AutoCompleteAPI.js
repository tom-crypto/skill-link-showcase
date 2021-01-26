const getJobAutoCompleteResults = async (input) => {
  const BASE_URL_JOB = 'http://api.dataatwork.org/v1/jobs/autocomplete?begins_with=' 
  let result = []
  if (!input){ // empty input, will return no autocomplete 
    return result
  }
  const response = await fetch(`${BASE_URL_JOB}${input}`);
  const data = await response.json();
  if (data.error){
    return result
  }
  let dataLen = data.length

  for (let i = 0; i < 10; i++){ // return only first ten responses
    if (i >= dataLen){ // break if there is less than 10 responses
      break;
    }
    result.push({
      "label":data[i]['suggestion'],
      "value":data[i]['uuid']})
  }
  return result;
};

const getSkillAutoCompleteResults = async (input='') => {
const BASE_URL_SKILL = 'http://api.dataatwork.org/v1/skills/autocomplete?begins_with=' 
  let result = []
  if (!input){ // empty input, will return no autocomplete 
    return result
  }
  const response = await fetch(`${BASE_URL_SKILL}${input}`);
  const data = await response.json();
  if (data.error){
    return result
  }
  let dataLen = data.length

  for (let i = 0; i < dataLen ; i++){ // return only first ten responses
    if (i >= dataLen){ // break if there is less than 10 responses
      break;
    }
    result.push({
      "label":data[i]['suggestion'],
      "value":data[i]['uuid']})
  }
  return result;
}

const getZipcodeAutoCompleteResults = async(input) =>{
  // call auto complete API for zips
}

export {
  getJobAutoCompleteResults,
  getSkillAutoCompleteResults,
  getZipcodeAutoCompleteResults
};
