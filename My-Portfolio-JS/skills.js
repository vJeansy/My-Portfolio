// creating DOMs
var frontEnd = document.getElementById('front-end');
var backEnd = document.getElementById('back-end');
var technologies = document.getElementById('technologies');
// calling data from json file
const obtainSkills = () => {
    axios({
        method: 'GET',
        url: 'My-Portfolio-JSON/skills.json'
    }).then(res => {
        skillsCards(res.data);
    }).catch(err => {
        console.log('Hubo un error al cargar los skills', err)
    });
};

const skillsCards = (art) => {
    art.forEach(skill => {
        if(skill.type === 'front-end') {
            frontEnd.innerHTML += `
                <div class="card">
                    <img src="${skill.logo}" style="width: 9rem;" alt="${skill.tittle}">
                        <div class="card-content">
                            <h3>${skill.tittle}</h3>
                                </div>
                                    </div>`
        } else if(skill.type === 'back-end') {
            backEnd.innerHTML += `
                <div class="card">
                    <img src="${skill.logo}" style="width: 9rem;" alt="${skill.tittle}">
                        <div class="card-content">
                            <h3>${skill.tittle}</h3>
                                </div>
                                    </div>`
        } else if(skill.type === 'technologies') {
            technologies.innerHTML += `
                <div class="card">
                    <img src="${skill.logo}" style="width: 9rem;" alt="${skill.tittle}">
                        <div class="card-content">
                            <h3>${skill.tittle}</h3>
                                </div>
                                    </div>`
        } else {
            return;
        }
    })
}
//call function and arrow the DOM variable.
obtainSkills();