import { logError } from '../utils/LogError.js'
const path = "./src/services"

export async function skills() {
  try {
    const response = await axios.get(`${path}/skills.json`);
    return response.data
    //console.log(response);
  } catch (error) {
    logError.error('Error trying to get education information', error);
    return null;
  }
}

export async function educations() {
  try {
    const response = await axios.get(`${path}/education.json`);
    return response.data;
    //console.log(response);
  } catch (error) {
    logError.error('Error trying to obatin the information of education', error)
    return null;
  }
}

export async function projects(id) {
  try {
    const response = await axios.get(`${path}/projects.json`);
    return response.data
    //console.log(response);
  } catch (error) {
    logError.error('Error trying to obatin the information of education', error)
    return null;
  }
}

export async function faqs() {
  try {
    const response = await axios.get(`${path}/faqs.json`);
    //console.log(response.data);
    return response.data
  } catch (error) {
    logError.error('Error trying to obatin the information of fqas', error)
    return null;
  }
}