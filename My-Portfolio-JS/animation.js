/* upButton animation */
window.onscroll = function() { // detect the scroll.
    const upButton = document.getElementById("upButton");
    
    // Mostrar el botón si el usuario hace scroll down
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      upButton.classList.add("show");
    }else {
      upButton.classList.remove("show");
    }
  };