//Header effect
window.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    header.classList.remove('opacity-0', '-translate-y-10');
    header.classList.add('opacity-100', 'translate-y-0');
    header.classList.add('bg-animate');
});

//Typewriter effect
const words = ["Hello, I am Jeansy Pena"];
let i = 0;
let j = 0;
let currentWord = "";
//let isDeleting = false;
let pageStated = false;

function type() {
  currentWord = words[i];
  if (pageStated) {
    document.getElementById("typewriter").textContent = currentWord.substring(0, j-1);
    j--;
    if (j == 0) {
      //isDeleting = false;
      i++;
      if (i == words.length) {
        i = 0;
      }
    }
  } else {
    document.getElementById("typewriter").textContent = currentWord.substring(0, j+1);
    j++;
    /*if (j == currentWord.length) {
      isDeleting = true;
    }*/
  }
  setTimeout(type, 200);
  return;
}

type();
