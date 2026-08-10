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
  if (root.className === "light") {
    imageMode.setAttribute("src", "img/modoclaro.png");
  } else {
    imageMode.setAttribute("src", "img/modoescuro.png");
  }
}

// - - - - - - - - - - - - - - - - - - - - - - - PARTÍCULAS DO FUNDO - - - - - - - - - - - - - - - - - - -
const canvas = document.getElementById("network");
const ctx = canvas.getContext("2d");

let width;
let height;

const particles = [];

// Configurações
const PARTICLE_COUNT = 650;
const MAX_DISTANCE = 100;
const SPEED = 0.6;

// =========================
// REDIMENSIONAR CANVAS
// =========================

function resize() {
  const dpr = window.devicePixelRatio || 1;

  width = window.innerWidth;
  height = window.innerHeight;

  canvas.width = width * dpr;
  canvas.height = height * dpr;

  canvas.style.width = width + "px";
  canvas.style.height = height + "px";

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

window.addEventListener("resize", resize);

// =========================
// PARTÍCULA
// =========================

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;

    this.vx = (Math.random() - 0.5) * SPEED;

    this.vy = (Math.random() - 0.5) * SPEED;

    this.radius = Math.random() * 1.5 + 1;

    this.opacity = Math.random() * 0.5 + 0.3;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // Saiu pela esquerda
    if (this.x < -50) {
      this.x = width + 50;
    }

    // Saiu pela direita
    if (this.x > width + 50) {
      this.x = -50;
    }

    // Saiu por cima
    if (this.y < -50) {
      this.y = height + 50;
    }

    // Saiu por baixo
    if (this.y > height + 50) {
      this.y = -50;
    }
  }

  draw() {
    ctx.beginPath();

    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

    // Cor da Bolinha
    ctx.fillStyle = `rgba(120, 180, 210, ${this.opacity * 0.7})`;

    //Cor da sombra da bola
    ctx.shadowBlur = 0;
    ctx.shadowColor = "#78b4d2";

    ctx.fill();

    ctx.shadowBlur = 0;
  }
}

// =========================
// CRIAR PARTÍCULAS
// =========================

function createParticles() {
  particles.length = 0;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }
}

// =========================
// CONECTAR PARTÍCULAS
// =========================

function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const p1 = particles[i];
      const p2 = particles[j];

      const dx = p1.x - p2.x;

      const dy = p1.y - p2.y;

      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < MAX_DISTANCE) {
        const opacity = (1 - distance / MAX_DISTANCE) * 0.35;

        ctx.beginPath();

        ctx.moveTo(p1.x, p1.y);

        ctx.lineTo(p2.x, p2.y);

        // Cor da Linha da Conexão
        ctx.strokeStyle = `rgba(100, 160, 190, ${opacity * 0.4})`;

        ctx.lineWidth = 0.7;

        ctx.stroke();
      }
    }
  }
}

// =========================
// ANIMAÇÃO
// =========================

function animate() {
  // Limpa a tela
  ctx.clearRect(0, 0, width, height);

  // Cor do Fundo
  ctx.fillStyle = "transparent";

  ctx.fillRect(0, 0, width, height);

  // Atualiza partículas
  for (const particle of particles) {
    particle.update();
  }

  // Desenha conexões
  connectParticles();

  // Desenha pontos
  for (const particle of particles) {
    particle.draw();
  }

  // Próximo frame
  requestAnimationFrame(animate);
}

// INICIAR

resize();

createParticles();

animate();
