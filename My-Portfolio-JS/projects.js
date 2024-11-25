// creating DOMs
var cardProjects = document.getElementById('card-projects');
// calling data from json file
function jsonProjects(){
    axios({
        method: 'GET',
        url: 'My-Portfolio-JSON/projects.json'
    }).then(res =>{
        jasonCards(res.data); // Call jasoncards here with the data
    }).catch(err =>{
        console.log('Hubo un error al cargar los proyectos', err)
    });
};

// creating cards with json file's informatino
function jasonCards(art){
    var id = 0;
    for(let i = 0; i < art.length; i++) {
            if(art[id] != undefined){
                document.getElementById('card-projects'). innerHTML += `
                    <div class="card">
                    <img src="${art[id].direction}1.PNG" class="card-img-top" alt="${art[id].tittle}"></a>
                        <div class="card-content">
                            <h5 class="fw-bold fs-3">${art[id].tittle}</h5>
                            <p>${art[id].description}</p>
                            <a href="${art[id].pageUrl}" target="_blank" type="button">
                            <i class="bi bi-box-arrow-up-right fs-4 ms-3 text-black"></i> </a>
                            <a href="${art[id].gitUrl}" target="_blank" type="button">
                            <i class="bi bi-github fs-4 ms-3 text-black"></i> </a>
                    </div>
                        </div>`;
                        id++;
            }
        }
    }
//call function and arrow the DOM variable.
jsonProjects(cardProjects);