const description = document.getElementById("projectDescription");
const containerProject = document.getElementById("project");

function openDescription() {
  description.classList.toggle("hidden");
  containerProject.classList.toggle("active");
}
