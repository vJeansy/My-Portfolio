import { projects, education, skills } from '../services/api.js'

export async function skillsData() {
    const data = await skills();
    console.log(data);
}

skillsData();

export async function educationData() {
    const data = await education();
    console.log(data);
}

educationData();

export async function projectsData() {
    const data = await projects();
    console.log(data);
}

projectsData();