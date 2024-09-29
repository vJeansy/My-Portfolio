// creating DOMs
var cardProjects = document.getElementById('card-projects');
var projects;
// calling data from json file
function jsonProjects(container){
    axios({
        method: 'GET',
        url: 'My-Portfolio-JSON/projects.json'
    }).then(res =>{
        projects = res.data;
        jasonCards(res.data, container, res.data.length);
    }).catch(err =>{
        console.log('Hubo un error al cargar los proyectos', err)
    });
};
// Container for product cards
function rows(container, nProjects){
    var nRows = Math.ceil(nProjects / 3);
    for(var i = 1; i <= nRows; i++){
        container.innerHTML += `<div class="card-container" id="rows-${i}"></div>`;
    }
}
// creating cards with json file's informatino
function jasonCards(art, container, nProjects){
    rows(container, nProjects);
    var nRows = Math.ceil(nProjects / 3);
    var id = 0;
    for(let i = 1; i <= nRows; i++){
        for(let j = 1; j <= 3; j++){
            if(art[id] != undefined){
                document.getElementById('rows-' + i). innerHTML += `
                    <div class="card">
                    <a href="" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <img src="${art[id].direction}1.png" class="card-img-top" alt="${art[id].tittle}"></a>
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
}
//call function and arrow the DOM variable.
jsonProjects(cardProjects);