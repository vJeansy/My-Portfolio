/* carousel */
var carouselImages = document.getElementById('certificates-carousel');
// calling data from json file
function jsoncertificates(){
    axios({
        method: 'GET',
        url: 'My-Portfolio-JSON/certificates.json'
    }).then(res =>{
        certificatesCarousel(res.data); // Call certificatesCarousel here with the data
    }).catch(err =>{
        console.log('Hubo un error al cargar los proyectos', err)
    });
};
function certificatesCarousel (art) {
    carouselImages.innerHTML = ''; // Clear the carousel before adding new content
    var isFirst = true; // To mark the first image as active
    var img = 1;
    art.forEach(cert => {
        carouselImages.innerHTML += `
                <div class="carousel-item ${isFirst ? 'active' : ''}">
            <img src="${cert.direction}${img}.PNG" alt="${cert.name}" class="d-block" style="width:100%; height: auto;">
        </div>`;
        isFirst = false; // After the first iteration, ensure no other items are marked active
        img++; // Increment id to move to the next image
    });
}
//call function and arrow the DOM variable.
jsoncertificates();