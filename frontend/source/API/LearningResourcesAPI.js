const BASE_URL = 'http://127.0.0.1:8000/skill_link/learning_resources/'
const findLearningResources = async (searchObject) => {
  let jobObject = {
    'job_title':searchObject.job_title,
    'zipcode':searchObject.zipcode
  }
  let response = await fetch(`${BASE_URL}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(jobObject)
  });
  let data = await response.json();
  return data
};


export {
  findLearningResources
};
