const {REACT_APP_CAREER_ONESTOP_BEARER, REACT_APP_CAREER_ONESTOP_ID} = process.env;



export const getJobsListingsFromForm = async (input) => {
  let formatedInput = { "SKAValueList": [] }
  for (let key in input){
    formatedInput["SKAValueList"].push({"ElementId": key, "DataValue": input[key]})
  }
  let stringedInput = JSON.stringify(formatedInput)

  let result = []
  const response = await fetch('https://api.careeronestop.org/v1/skillsmatcher/KoOHjcliipPqZjU', {
    method: 'POST',
    withCredentials: true,
    credentials: 'include',
    headers: {
      'Authorization': `Bearer ${REACT_APP_CAREER_ONESTOP_BEARER}`,
      'Content-Type': 'application/json',
      'userId': REACT_APP_CAREER_ONESTOP_ID
    },
    body: stringedInput
  })

  const data = await response.json();

  result.push(data)
  return result
}