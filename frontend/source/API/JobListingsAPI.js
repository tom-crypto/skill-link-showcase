//API can only handle 25 calls a minute 250 a day

const {REACT_APP_AZUNA_APP_ID, REACT_APP_AZUNA_APP_KEY} = process.env;

export const getJobListings = async (input) => {
  let result = []
  const response = await fetch(`https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${REACT_APP_AZUNA_APP_ID}&app_key=${REACT_APP_AZUNA_APP_KEY}&results_per_page=5&what=${input.jobTitle}&location0=us`)
  const data = await response.json();

  let dataLen = data['results'].length

  for (let i = 0; i < 5; i++){
    if (i >= dataLen){
      break
    }
    result.push(data['results'][i])
  }
  return result
}