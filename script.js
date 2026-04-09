const description = document.getElementById("projectDescription");
const containerProject = document.getElementById("project");

function openDescription() {
  containerProject.classList.toggle("active");
  description.classList.toggle("hidden");
}
