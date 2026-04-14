const containerProject = document.querySelectorAll(".projects__project");
const description = document.querySelectorAll(".projects__description");
const image = document.querySelectorAll(".projects__image-project");
const root = document.documentElement;
const imageMode = document.getElementById("mode");

containerProject.forEach((project, index) => {
  image[index].addEventListener("click", () => {
    project.classList.toggle("closed");
    description[index].classList.toggle("hidden");
  });
});

function turnMode() {
  root.classList.toggle("light");
  if(root.className === "light"){
    imageMode.setAttribute('src', 'img/modoescuro.png')
  } else {
    imageMode.setAttribute('src', 'img/modoclaro.png')

  }
} 
