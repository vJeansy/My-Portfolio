// creating DOMs
var frontEnd = document.getElementById('front-end');
var backEnd = document.getElementById('back-end');
var technologies = document.getElementById('technologies');
// Fetch data from json file
const obtainSkills = () => {
    axios.get('./My-Portfolio-JSON/skills.json')
    .then(res => {
        skillsCards(res.data);
    })
    .catch(err => {
        console.log('Error loading skills', err);
    });
};

const skillsCards = (skills) => {
    skills.forEach(skill => {
        const container = skill.type === 'front-end'
            ? frontEnd
            : skill.type === 'back-end'
            ? backEnd
            : skill.type === 'technologies'
            ? technologies
            : null;

        if (container) {
            container.innerHTML += `
                <div class="card">
                    <img src="${skill.logo}" style="width: 9rem;" alt="${skill.tittle}">
                    <div class="card-content">
                        <h3>${skill.tittle}</h3>
                    </div>
                </div>`;
        }
    });
};
//call function and arrow the DOM variable.
obtainSkills();