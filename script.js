const containerProject = document.querySelectorAll(".projects__project");
const description = document.querySelectorAll(".projects__description");
const image = document.querySelectorAll(".projects__image-project");

containerProject.forEach((project, index) => {
  image[index].addEventListener("click", () => {
    project.classList.toggle("closed");
    description[index].classList.toggle("hidden");
  });
});
